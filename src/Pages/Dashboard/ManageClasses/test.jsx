import React, { useState } from 'react';
import useClasses from '../../../Hooks/useClasses';
import Swal from 'sweetalert2';

const ManageClasses = () => {
  const [allClasses, loading, refetch] = useClasses();
  const [showModal, setShowModal] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedClassId, setSelectedClassId] = useState(null);

  const handlePermission = (id, status) => {
    // Code for handling permission goes here
  };

  const handleFeedback = () => {
    if (selectedClassId) {
      fetch(`https://frame-lab-server.vercel.app/classes/${selectedClassId}/feedback`, {
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
            refetch();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Feedback submitted successfully',
              showConfirmButton: false,
              timer: 1500,
            });
            closeModal();
          }
        });
    }
  };

  const openModal = (classId) => {
    setSelectedClassId(classId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFeedbackText('');
    setSelectedClassId(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Classes</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          {/* Table content */}
          <tbody>
            {allClasses.map((classItem) => (
              <tr key={classItem._id}>
                {/* Table row content */}
                <td className="px-6 py-4 border-b border-gray-300">
                  {/* Cell content */}
                  <button
                    onClick={() => openModal(classItem._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Send Feedback
                  </button>
                  {/* Modal */}
                  {showModal && selectedClassId === classItem._id && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
                      <div className="relative w-auto max-w-sm mx-auto my-6">
                        <div className="bg-white rounded-lg shadow-lg">
                          <div className="p-4">
                            <h2 className="text-lg font-bold mb-2">Send Feedback</h2>
                            <textarea
                              className="w-full p-2 border border-gray-300 rounded-md resize-none"
                              rows="4"
                              placeholder="Enter your feedback..."
                              value={feedbackText}
                              onChange={(e) => setFeedbackText(e.target.value)}
                            ></textarea>
                          </div>
                          <div className="flex items-center justify-end p-4 bg-gray-100">
                            <button
                              className="text-gray-500 hover:text-gray-700 mr-2"
                              onClick={closeModal}
                            >
                              Cancel
                            </button>
                            <button
                              className="bg-blue-500 text-white px-4 py-2 rounded-md"
                              onClick={handleFeedback}
                            >
                              Send
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;
