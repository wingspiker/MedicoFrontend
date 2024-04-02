// import React, { useState } from "react";

// export default function AddProduct() {
//   const [formData, setFormData] = useState({
//     productName: "",
//     sizeX: "",
//     sizeY: "",
//     contains: "",
//     productType: "capsule", // Default selected option
//     division: "item1", // Default selected option
//     prescription: "Rx", // Default selected option
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form data:", formData);
//     // Add your form submission logic here
//   };

//   return (
//     <div className="min-h-screen bg-cyan-900 py-8 px-4 flex justify-center items-start">
//       <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-6 relative">
//         {/* Responsive positioning for the Save button */}
//         <div className="flex justify-between">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">Product</h1>
//           <button
//             type="submit"
//             className="px-6 py-2 rounded-md bg-green-400 text-gray-800 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
//             onClick={handleSubmit}
//           >
//             Save
//           </button>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <div className="md:flex md:justify-between md:gap-4">
//             <div className="md:flex-1 md:pr-2 mb-4 md:mb-0">
//               <label className="block text-gray-700">Product Name</label>
//               <input
//                 type="text"
//                 name="productName"
//                 value={formData.productName}
//                 onChange={handleChange}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//               />
//             </div>
//             <div className="md:flex-1 md:px-2 mb-4 md:mb-0">
//               <label className="block text-gray-700">Product Type</label>
//               <select
//                 name="productType"
//                 value={formData.productType}
//                 onChange={handleChange}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//               >
//                 <option value="">Select...</option>
//                 <option value="capsule">Capsule</option>
//                 <option value="tablet">Tablet</option>
//               </select>
//             </div>
//             <div className="md:flex-1 md:pl-2">
//               <label className="block text-gray-700">Division</label>
//               <select
//                 name="division"
//                 value={formData.division}
//                 onChange={handleChange}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//               >
//                 <option value="">Select...</option>
//                 <option value="item1">Item 1</option>
//                 <option value="item2">Item 2</option>
//               </select>
//             </div>
//           </div>

//           <div className="md:flex md:justify-between md:gap-4 md:mt-4">
//             <div className="md:flex-1 md:pr-2 mb-4 md:mb-0">
//               <label className="block text-gray-700">Prescription</label>
//               <select
//                 name="prescription"
//                 value={formData.prescription}
//                 onChange={handleChange}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//               >
//                 <option value="">Select...</option>
//                 <option value="Rx">Rx</option>
//                 <option value="nRx">nRx</option>
//                 <option value="G">G</option>
//               </select>
//             </div>
//             <div className="md:flex-1 md:px-2 mb-4 md:mb-0">
//               <label className="block text-gray-700">Size X</label>
//               <input
//                 type="text"
//                 name="sizeX"
//                 value={formData.sizeX}
//                 onChange={handleChange}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//               />
//             </div>
//             <div className="md:flex-1 md:px-2 mb-4 md:mb-0">
//               <label className="block text-gray-700">Size Y</label>
//               <input
//                 type="text"
//                 name="sizeY"
//                 value={formData.sizeY}
//                 onChange={handleChange}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//               />
//             </div>
//             <div className="md:flex-1 md:pl-2">
//               <label className="block text-gray-700">Contains</label>
//               <input
//                 type="text"
//                 name="contains"
//                 value={formData.contains}
//                 onChange={handleChange}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//               />
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

import React, { useState } from "react";

function AddProduct() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    productName: "",
    productType: "",
    division: "",
    prescription: "",
    sizeX: "",
    sizeY: "",
    contains: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // For demonstration purposes, let's move to the next step
    if (currentStep < 6) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <div className="min-h-screen bg-cyan-900 py-8 px-4 flex justify-center items-start">
              <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-6 relative">
                {/* Responsive positioning for the Save button */}
                <div className="flex justify-between">
                  <h1 className="text-2xl font-bold text-gray-800 mb-6">
                    Product
                  </h1>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-md bg-green-400 text-gray-800 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                    onClick={handleSubmit}
                  >
                    Save
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="md:flex md:justify-between md:gap-4">
                    <div className="md:flex-1 md:pr-2 mb-4 md:mb-0">
                      <label className="block text-gray-700">
                        Product Name
                      </label>
                      <input
                        type="text"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      />
                    </div>
                    <div className="md:flex-1 md:px-2 mb-4 md:mb-0">
                      <label className="block text-gray-700">
                        Product Type
                      </label>
                      <select
                        name="productType"
                        value={formData.productType}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      >
                        <option value="">Select...</option>
                        <option value="capsule">Capsule</option>
                        <option value="tablet">Tablet</option>
                      </select>
                    </div>
                    <div className="md:flex-1 md:pl-2">
                      <label className="block text-gray-700">Division</label>
                      <select
                        name="division"
                        value={formData.division}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      >
                        <option value="">Select...</option>
                        <option value="item1">Item 1</option>
                        <option value="item2">Item 2</option>
                      </select>
                    </div>
                  </div>

                  <div className="md:flex md:justify-between md:gap-4 md:mt-4">
                    <div className="md:flex-1 md:pr-2 mb-4 md:mb-0">
                      <label className="block text-gray-700">
                        Prescription
                      </label>
                      <select
                        name="prescription"
                        value={formData.prescription}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      >
                        <option value="">Select...</option>
                        <option value="Rx">Rx</option>
                        <option value="nRx">nRx</option>
                        <option value="G">G</option>
                      </select>
                    </div>
                    <div className="md:flex-1 md:px-2 mb-4 md:mb-0">
                      <label className="block text-gray-700">Size X</label>
                      <input
                        type="text"
                        name="sizeX"
                        value={formData.sizeX}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      />
                    </div>
                    <div className="md:flex-1 md:px-2 mb-4 md:mb-0">
                      <label className="block text-gray-700">Size Y</label>
                      <input
                        type="text"
                        name="sizeY"
                        value={formData.sizeY}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      />
                    </div>
                    <div className="md:flex-1 md:pl-2">
                      <label className="block text-gray-700">Contains</label>
                      <input
                        type="text"
                        name="contains"
                        value={formData.contains}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      />
                    </div>
                  </div>
                  <button onClick={handleSubmit}>Next</button>
                </form>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Step 2: Next Step</h2>
            {/* Render fields for step 2 */}
            <button onClick={handleSubmit}>Next</button>
          </div>
        );
      case 3:
        // Render step 3 with appropriate fields
        return (
          <div>
            <h2>Step 3: Next Step</h2>
            {/* Render fields for step 3 */}
            <button onClick={handleSubmit}>Next</button>
          </div>
        );
      case 4:
        // Render step 4 with appropriate fields
        return (
          <div>
            <h2>Step 4: Next Step</h2>
            {/* Render fields for step 4 */}
            <button onClick={handleSubmit}>Next</button>
          </div>
        );
      case 5:
        // Render step 5 with appropriate fields
        return (
          <div>
            <h2>Step 5: Next Step</h2>
            {/* Render fields for step 5 */}
            <button onClick={handleSubmit}>Next</button>
          </div>
        );
      case 6:
        // Render step 6 with appropriate fields
        return (
          <div>
            <h2>Step 6: Final Step</h2>
            {/* Render fields for step 6 */}
            <button onClick={handleSubmit}>Submit</button>
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}

export default AddProduct;
