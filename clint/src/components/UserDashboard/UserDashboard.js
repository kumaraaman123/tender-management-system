import React from 'react'
import { useState ,useEffect} from 'react';
import "./UserDashboard.css"
import axios from 'axios';

const UserDashboard = () => {
  const [tenders, setTenders] = useState([]);
  const [quotation, setQuotation] = useState({ tenderId: '', cost: 0 });


  useEffect(() => {
    axios.get('http://localhost:4000/tenders')
      .then(response => setTenders(response.data))
      .catch(error => console.log(error));
  }, []);

  const submitQuotation = () => {
    axios.post(`http://localhost:4000/tenders/${quotation.tenderId}/bids`, { cost: quotation.cost })
      .then(response => alert('Quotation submitted!'))
      .catch(error => console.log(error));
  };

  return (
  <div className='dashboard-container'>
    <h2>Available Tenders</h2>
    {tenders.map(tender => (
      <div key={tender._id}>
        <h3>{tender.name}</h3>
        <p>{tender.description}</p>
        <p>End: {tender.endTime}</p>
      </div>
    ))}
    <h2>Submit Quotation</h2>
    <select onChange={(e) => setQuotation({ ...quotation, tenderId: e.target.value })}>
      <option value="">Select Tender</option>
      {tenders.map(tender => (
        <option key={tender._id} value={tender._id}>{tender.name}</option>
      ))}
    </select>
    <input type="number" placeholder="Cost" onChange={(e) => setQuotation({ ...quotation, cost: e.target.value })} />
    <button onClick={submitQuotation}>Submit Quotation</button>
  </div>
  );
  
}

export default UserDashboard
