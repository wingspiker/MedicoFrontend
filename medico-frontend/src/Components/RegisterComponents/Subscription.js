import React, { useState } from 'react';
import Modal from 'react-modal';

// Import Tailwind CSS
import 'tailwindcss/tailwind.css';

// Nord color palette
const colors = {
  cyan900: '#005f87',
  nord0: '#2E3440',
  nord6: '#D8DEE9',
  nord4: '#81A1C1',
};

export default function Subscription() {
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    { id: 1, name: 'Basic Plan', price: '$10/month' },
    { id: 2, name: 'Standard Plan', price: '$20/month' },
    { id: 3, name: 'Premium Plan', price: '$30/month' }
  ];

  const handleSave = () => {
    if (selectedPlan) {
      console.log("Selected plan:", selectedPlan);
      setShowModal(false);
    }
  };

  return (
    <>
      <button
        className="bg-cyan-900 text-white px-4 py-2 rounded-md shadow-md hover:bg-cyan-700 transition-colors duration-300"
        onClick={() => setShowModal(true)}
      >
        View Plans
      </button>
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="modal"
        overlayClassName="modal-overlay"
        contentLabel="Select a Plan"
      >
        <div className="modal-content">
          <span
            className="close absolute top-2 right-2 cursor-pointer text-gray-500 hover:text-gray-300"
            onClick={() => setShowModal(false)}
          >
            &times;
          </span>
          <h2 className="text-xl font-bold mb-4">Select a Plan</h2>
          <div className="plans-container">
            {plans.map(plan => (
              <div className="plan-card" key={plan.id}>
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="text-gray-600">{plan.price}</p>
                <button
                  className="mt-4 bg-cyan-900 text-white px-4 py-2 rounded-md shadow-md hover:bg-cyan-700 transition-colors duration-300"
                  onClick={() => setSelectedPlan(plan)}
                >
                  Select
                </button>
              </div>
            ))}
          </div>
          <button
            className="mt-6 bg-cyan-900 text-white px-4 py-2 rounded-md shadow-md hover:bg-cyan-700 transition-colors duration-300"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </Modal>
    </>
  );
}
