import React from 'react'
import { useState, useEffect } from 'react';
import './BidList.css'
import axios from 'axios';

const BidsList = () => {


    const [bids, setBids] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/bids')
            .then(response => setBids(response.data))
            .catch(error => console.log(error));
    }, [bids]);
    return (
        <div className='bids-container'>
            <h2>Bids</h2>
            <table>
                <thead>
                    <tr>
                        <th>Company Name</th>
                        <th>Bid Time</th>
                        <th>Bid Cost</th>
                        <th>Flag</th>
                    </tr>
                </thead>
                <tbody>
                    {bids.map(bid => (
                        <tr key={bid._id}>
                            <td>{bid.companyName}</td>
                            <td>{new Date(bid.bidTime).toLocaleString()}</td>
                            <td>{bid.cost}</td>
                            <td>{new Date(bid.tenderEndTime) - new Date(bid.bidTime) <= 5 * 60 * 1000 ? 'Yes' : 'No'}</td>
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}

export default BidsList
