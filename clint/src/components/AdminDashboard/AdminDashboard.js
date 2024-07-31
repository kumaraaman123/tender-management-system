import React, { useState,useEffect } from 'react';
import './AdminDashboard.css';
import axios from 'axios';

const AdminDashboard = () => {
  const [tenders, setTenders] = useState([]);
  const [newTender, setNewTender] = useState({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
    bufferTime: 0,
  });

  useEffect(() => {
    axios.get('http://localhost:4000/tenders')
      .then(response => setTenders(response.data))
      .catch(error => console.log(error));
  }, []);

  const createTender = () => {
    axios.post('http://localhost:4000/tenders', newTender)
      .then(response => setTenders([...tenders, response.data]))
      .catch(error => console.log(error));
  };

  return (
    <div className="dashboard-container">
      <h2>Create New Tender</h2>
      <input type="text" placeholder="Tender Name" onChange={(e) => setNewTender({ ...newTender, name: e.target.value })} />
      <textarea placeholder="Tender Description" onChange={(e) => setNewTender({ ...newTender, description: e.target.value })}></textarea>
      <input type="datetime-local" onChange={(e) => setNewTender({ ...newTender, startTime: e.target.value })} />
      <input type="datetime-local" onChange={(e) => setNewTender({ ...newTender, endTime: e.target.value })} />
      <input type="number" placeholder="Buffer Time (mins)" onChange={(e) => setNewTender({ ...newTender, bufferTime: e.target.value })} />
      <button onClick={createTender}>Create Tender</button>
      <h2>Previous Tenders</h2>
      {tenders.map(tender => (
        <div className="tender-card" key={tender._id}>
          <h3>{tender.name}</h3>
          <p>{tender.description}</p>
          <p>Start: {tender.startTime}</p>
          <p>End: {tender.endTime}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;
