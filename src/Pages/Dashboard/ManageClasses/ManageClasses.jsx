import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/classes');
        setClasses(response.data);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  const handleApprove = (classId) => {
    // Handle approve logic and update the class status
  };

  const handleDeny = (classId) => {
    // Handle deny logic and update the class status
  };

  const handleSendFeedback = (classId) => {
    // Handle sending feedback logic and open modal
  };

  return (
    <div>
      <h1>Manage Classes</h1>
      {classes.map((classItem) => (
        <div key={classItem._id}>
          <img src={classItem.classImage} alt={classItem.className} />
          <h2>{classItem.className}</h2>
          <p>Instructor: {classItem.instructorName}</p>
          <p>Email: {classItem.instructorEmail}</p>
          <p>Available Seats: {classItem.availableSeats}</p>
          <p>Price: {classItem.price}</p>
          <p>Status: {classItem.status}</p>
          <button onClick={() => handleApprove(classItem._id)}>Approve</button>
          <button onClick={() => handleDeny(classItem._id)}>Deny</button>
          <button onClick={() => handleSendFeedback(classItem._id)}>Send Feedback</button>
        </div>
      ))}
    </div>
  );
};

export default ManageClasses;
