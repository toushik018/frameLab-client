import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const Feedback = () => {
  const { id } = useParams();
  const [feedbackText, setFeedbackText] = useState('');

  const handleFeedback = (e) => {
    e.preventDefault();
    fetch(`http://localhost:5000/classes/${id}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ feedback: feedbackText }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.message) {
          setFeedbackText(''); // Clear the feedback text field
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Feedback submitted successfully',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error('Error submitting feedback:', error);
      });
  };

  const handleFeedbackTextChange = (event) => {
    setFeedbackText(event.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Feedback</h1>
      <form onSubmit={handleFeedback}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Your Feedback:</label>
          <textarea
            value={feedbackText}
            onChange={handleFeedbackTextChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            placeholder="Enter your feedback..."
            rows={4}
            cols={50}
          ></textarea>
        </div>
        <div className="text-right">
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default Feedback;
