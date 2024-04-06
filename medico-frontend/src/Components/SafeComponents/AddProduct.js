// import React, { useState } from "react";

// function AddProduct() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData] = useState({
//     productName: "",
//     productType: "",
//     division: "",
//     prescription: "",
//     sizeX: "",
//     sizeY: "",
//     contains: "",
//     manufacturerName: "",
//     manufacturerLicenseNumber: "",
//     allowExchange: null,
//     allowReturn: null,
//     returnDays: "",

//     mrp: "",
//     retailPrice: "",
//     pricingMethod: "",
//     discountOnMRP: "",
//     margin: "",
//     sellingPrice: "",
//   });
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "allowExchange" || name === "allowReturn") {
//       const newValue = value === "true"; // Convert string value to boolean
//       setFormData({
//         ...formData,
//         allowExchange:
//           name === "allowExchange" ? newValue : formData.allowExchange,
//         allowReturn: name === "allowReturn" ? newValue : formData.allowReturn,
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     console.log("Form submitted:", formData);

//     if (currentStep < 6) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const calculateSellingPrice = (mrp, discount) => {
//     const discountedAmount = (parseFloat(mrp) * parseFloat(discount)) / 100;
//     return (parseFloat(mrp) - discountedAmount).toFixed(2);
//   };

//   const calculateSellingPriceWithMargin = (retailPrice, margin) => {
//     const marginAmount = (parseFloat(retailPrice) * parseFloat(margin)) / 100;
//     return (parseFloat(retailPrice) + marginAmount).toFixed(2);
//   };

//   const renderStep = () => {
//     switch (currentStep) {
//       case 1:
//         return (
//           <div className="min-h-screen bg-cyan-900 py-8 px-4 flex justify-center items-start">
//             <div className="max-w-5xl w-full bg-white rounded-lg shadow-md p-6 relative">
//               {/* Responsive positioning for the Save button */}
//               <div className="flex justify-between">
//                 <h1 className="text-2xl font-bold text-gray-800 mb-6">
//                   Product
//                 </h1>
//               </div>
//               {/* Product Section */}
//               <div className="mb-6">
//                 <form onSubmit={handleSubmit}>
//                   <div className=" border mb-4 p-4">
//                     <h2 className="text-xl font-bold text-gray-800 mb-4">
//                       Product Information
//                     </h2>
//                     <div className="md:flex md:justify-between md:gap-4">
//                       <div className="md:flex-1 md:pr-2 mb-4 md:mb-0">
//                         <label className="block text-gray-700">
//                           Product Name
//                         </label>
//                         <input
//                           type="text"
//                           name="productName"
//                           value={formData.productName}
//                           onChange={handleChange}
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                         />
//                       </div>
//                       <div className="md:flex-1 md:px-2 mb-4 md:mb-0">
//                         <label className="block text-gray-700">
//                           Product Type
//                         </label>
//                         <select
//                           name="productType"
//                           value={formData.productType}
//                           onChange={handleChange}
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                         >
//                           <option value="">Select...</option>
//                           <option value="capsule">Capsule</option>
//                           <option value="tablet">Tablet</option>
//                         </select>
//                       </div>
//                       <div className="md:flex-1 md:pl-2">
//                         <label className="block text-gray-700">Division</label>
//                         <select
//                           name="division"
//                           value={formData.division}
//                           onChange={handleChange}
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                         >
//                           <option value="">Select...</option>
//                           <option value="item1">Item 1</option>
//                           <option value="item2">Item 2</option>
//                         </select>
//                       </div>
//                     </div>

//                     <div className="md:flex md:justify-between md:gap-4 md:mt-4">
//                       <div className="md:flex-1 md:pr-2 mb-4 md:mb-0">
//                         <label className="block text-gray-700">
//                           Prescription
//                         </label>
//                         <select
//                           name="prescription"
//                           value={formData.prescription}
//                           onChange={handleChange}
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                         >
//                           <option value="">Select...</option>
//                           <option value="Rx">Rx</option>
//                           <option value="nRx">nRx</option>
//                           <option value="G">G</option>
//                         </select>
//                       </div>
//                       <div className="md:flex-1 md:px-2 mb-4 md:mb-0">
//                         <label className="block text-gray-700">Size X</label>
//                         <input
//                           type="text"
//                           name="sizeX"
//                           value={formData.sizeX}
//                           onChange={handleChange}
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                         />
//                       </div>
//                       <div className="md:flex-1 md:px-2 mb-4 md:mb-0">
//                         <label className="block text-gray-700">Size Y</label>
//                         <input
//                           type="text"
//                           name="sizeY"
//                           value={formData.sizeY}
//                           onChange={handleChange}
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                         />
//                       </div>
//                       <div className="md:flex-1 md:pl-2">
//                         <label className="block text-gray-700">Contains</label>
//                         <input
//                           type="text"
//                           name="contains"
//                           value={formData.contains}
//                           onChange={handleChange}
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                   {/* Manufacturer Section */}
//                   <div className="border mb-4 p-4">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-4">
//                       Manufacturer
//                     </h2>
//                     <div className="md:flex md:justify-between md:gap-4 mt-6">
//                       <div className="md:flex-1 md:pr-2 mb-4 md:mb-0">
//                         <label className="block text-gray-700">
//                           Manufacturer Name
//                         </label>
//                         <input
//                           type="text"
//                           name="manufacturerName"
//                           value={formData.manufacturerName}
//                           onChange={handleChange}
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                         />
//                       </div>
//                       <div className="md:flex-1 md:pl-2 mb-4 md:mb-0">
//                         <label className="block text-gray-700">
//                           Manufacturer License Number
//                         </label>
//                         <input
//                           type="text"
//                           name="manufacturerLicenseNumber"
//                           value={formData.manufacturerLicenseNumber}
//                           onChange={handleChange}
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                         />
//                       </div>
//                     </div>
//                     <div className="md:flex md:justify-between md:gap-4">
//                       <div className="md:flex-1 md:pl-2 mb-4 md:mb-0">
//                         <label className="block text-gray-700">
//                           Allow Exchange
//                         </label>
//                         <div>
//                           <label className="inline-flex items-center">
//                             <input
//                               type="radio"
//                               name="allowExchange"
//                               value={true}
//                               checked={formData.allowExchange}
//                               onChange={handleChange}
//                               className="form-radio h-5 w-5 text-green-500"
//                             />
//                             <span className="ml-2">True</span>
//                           </label>
//                           <label className="inline-flex items-center ml-6">
//                             <input
//                               type="radio"
//                               name="allowExchange"
//                               value={false}
//                               checked={!formData.allowExchange}
//                               onChange={handleChange}
//                               className="form-radio h-5 w-5 text-red-500"
//                             />
//                             <span className="ml-2">False</span>
//                           </label>
//                         </div>
//                       </div>
//                       <div className="md:flex-1 md:pl-2 mb-4 md:mb-0">
//                         <label className="block text-gray-700">
//                           Allow Return
//                         </label>
//                         <div>
//                           <label className="inline-flex items-center">
//                             <input
//                               type="radio"
//                               name="allowReturn"
//                               value={true}
//                               checked={formData.allowReturn}
//                               onChange={handleChange}
//                               className="form-radio h-5 w-5 text-green-500"
//                             />
//                             <span className="ml-2">True</span>
//                           </label>
//                           <label className="inline-flex items-center ml-6">
//                             <input
//                               type="radio"
//                               name="allowReturn"
//                               value={false}
//                               checked={!formData.allowReturn}
//                               onChange={handleChange}
//                               className="form-radio h-5 w-5 text-red-500"
//                             />
//                             <span className="ml-2">False</span>
//                           </label>
//                         </div>
//                         {formData.allowReturn && (
//                           <div className="mt-4">
//                             <label className="block text-gray-700">
//                               Return Days
//                             </label>
//                             <input
//                               type="text"
//                               name="returnDays"
//                               value={formData.returnDays}
//                               onChange={handleChange}
//                               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                             />
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="border mb-4 p-4">
//                     <h2 className="text-2xl font-bold text-gray-800 mb-4">
//                       Pricing Information
//                     </h2>
//                     <div className="grid grid-cols-2 gap-4">
//                       {/* MRP Input */}
//                       <div>
//                         <label className="block text-gray-700">MRP</label>
//                         <input
//                           type="text"
//                           name="mrp"
//                           value={formData.mrp}
//                           onChange={handleChange}
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                           style={{ padding: "6px" }}
//                         />
//                       </div>
//                       {/* Retail Price Input */}
//                       <div>
//                         <label className="block text-gray-700">
//                           Retail Price
//                         </label>
//                         <input
//                           type="text"
//                           name="retailPrice"
//                           value={formData.retailPrice}
//                           onChange={handleChange}
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                           style={{ padding: "6px" }}
//                         />
//                       </div>
//                       {/* Discount on MRP Input */}
//                       <div>
//                         <label className="block text-gray-700">
//                           Discount on MRP (%)
//                         </label>
//                         <input
//                           type="text"
//                           name="discountOnMRP"
//                           value={formData.discountOnMRP}
//                           onChange={handleChange}
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
//                           style={{ padding: "6px" }}
//                         />
//                       </div>
//                       {/* Selling Price Input */}
//                       <div>
//                         <label className="block text-gray-700">
//                           Selling Price
//                         </label>
//                         <input
//                           type="text"
//                           name="sellingPrice"
//                           value={calculateSellingPrice(
//                             formData.mrp,
//                             formData.discountOnMRP
//                           )}
//                           readOnly
//                           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-200"
//                           style={{ padding: "6px" }}
//                         />
//                       </div>
//                       {/* Pricing Method Preference Radio Buttons */}
//                       <div className="col-span-2 flex items-center">
//                         <label className="block text-gray-700 mr-4">
//                           Pricing Method Preference
//                         </label>
//                         <div className="flex items-center">
//                           <input
//                             type="radio"
//                             name="pricingMethod"
//                             value="discountOnMRP"
//                             checked={formData.pricingMethod === "discountOnMRP"}
//                             onChange={handleChange}
//                             className="form-radio h-4 w-4 text-blue-600"
//                           />
//                           <span className="ml-2">Discount on MRP</span>
//                         </div>
//                         <div className="flex items-center ml-6">
//                           <input
//                             type="radio"
//                             name="pricingMethod"
//                             value="marginOnRetailPrice"
//                             checked={
//                               formData.pricingMethod === "marginOnRetailPrice"
//                             }
//                             onChange={handleChange}
//                             className="form-radio h-4 w-4 text-blue-600"
//                           />
//                           <span className="ml-2">Margin on retail price</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <button
//                     type="submit"
//                     className="px-6 py-2 rounded-md bg-green-400 text-gray-800 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
//                     onClick={handleSubmit}
//                   >
//                     Next
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         );
//       case 2:
//         return (
//           <div>
//             <h2>Step 2: Next Step</h2>
//             {/* Render fields for step 2 */}
//             <button onClick={handleSubmit}>Next</button>
//           </div>
//         );
//       case 3:
//         // Render step 3 with appropriate fields
//         return (
//           <div>
//             <h2>Step 3: Next Step</h2>
//             {/* Render fields for step 3 */}
//             <button onClick={handleSubmit}>Next</button>
//           </div>
//         );
//       case 4:
//         // Render step 4 with appropriate fields
//         return (
//           <div>
//             <h2>Step 4: Next Step</h2>
//             {/* Render fields for step 4 */}
//             <button onClick={handleSubmit}>Next</button>
//           </div>
//         );
//       case 5:
//         // Render step 5 with appropriate fields
//         return (
//           <div>
//             <h2>Step 5: Next Step</h2>
//             {/* Render fields for step 5 */}
//             <button onClick={handleSubmit}>Next</button>
//           </div>
//         );
//       case 6:
//         // Render step 6 with appropriate fields
//         return (
//           <div>
//             <h2>Step 6: Final Step</h2>
//             {/* Render fields for step 6 */}
//             <button onClick={handleSubmit}>Submit</button>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };

//   return <div>{renderStep()}</div>;
// }

// export default AddProduct;

import React from "react";
import { useForm } from "react-hook-form";
import ProductInformation from "../ProductComponents/CaseOne/ProductInfo";
import ManufacturerInformation from "../ProductComponents/CaseOne/ManufacturerInfo";
import PricingInformation from "../ProductComponents/CaseOne/PricingInfo";
import SelectExistingGroup from "../ProductComponents/CaseTwo/SelectGroup";
import Occupation from "../ProductComponents/CaseFour/Occupation";
import SelectLocation from "../ProductComponents/CaseThree/SelectLocation";

function AddProduct() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    if (currentStep < 6) {
      if (currentStep === 2 && data.existingGroupNo) {
        setCurrentStep(5); // Move to step 5 if no group is selected
      } else {
        setCurrentStep(currentStep + 1); // Move to the next step
      }
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Final Submission", data);
    }
  };

  const productName = watch("productName");
  const productType = watch("productType");
  const division = watch("division");
  const sizeX = watch("sizeX");
  const sizeY = watch("sizeY");
  const contains = watch("contains");

  const manufacturerName = watch("manufacturerName");
  const manufacturerLicenseNumber = watch("manufacturerLicenseNumber");
  const allowExchange = watch("allowExchange");
  const returnDays = watch("returnDays");

  const existingGroupNo = watch("existingGroupNo");

  const occupation = watch("occupation");
  const degree = watch("degree");
  //watch PRiceInfo Selling price is remaining

  const prescription = watch("prescription");
  const allowReturn = watch("allowReturn");
  const pricingMethod = watch("pricingMethod");
  const retailPrice = watch("retailPrice");
  const margin = watch("marginOnRetail");
  const mrp = watch("mrp");
  const discount = watch("discountOnMRP");

  console.log(existingGroupNo);
  const validateRetailPrice = (value) => {
    return (
      Number(value) <= Number(mrp) ||
      "Retail price must be less than or equal to MRP"
    );
  };

  const calculateSellingPrice = () => {
    if (pricingMethod === "discountOnMRP" && mrp && discount) {
      return (mrp - (mrp * discount) / 100).toFixed(2);
    } else if (pricingMethod === "marginOnRetail" && retailPrice && margin) {
      // console.log(retailPrice, margin);
      return (retailPrice * (1 + margin * 0.01)).toFixed(2);
    }
    return 0;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex justify-center items-center min-h-screen bg-cyan-900">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className=" text-4xl text-white">Product</h1>
              <ProductInformation
                register={register}
                watch={watch}
                errors={errors}
                prescription={prescription}
              />
              <ManufacturerInformation
                register={register}
                errors={errors}
                allowReturn={allowReturn}
              />
              <PricingInformation
                register={register}
                watch={watch}
                errors={errors}
                calculateSellingPrice={calculateSellingPrice}
                validateRetailPrice={validateRetailPrice}
                pricingMethod={pricingMethod}
              />

              <div className=" p-2 flex justify-end">
                <button
                  type="submit"
                  className={` cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="flex justify-start items-top min-h-screen  bg-cyan-900 ps-44">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-4xl text-white mt-2">
                Select Existhhing Group
              </h1>
              <div className="p-2 flex items-center my-3">
                <SelectExistingGroup register={register} errors={errors} />
                <button
                  type="submit"
                  className={`cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold ml-3 rounded w-20 text-center py-2`} // Added py-2 class to increase the height
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        );
      case 3:
        return (
          <div className="flex justify-start items-top min-h-screen  bg-cyan-900 ps-44">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-4xl text-white mt-2">Select Location</h1>
              <div className="p-2 flex items-center mt-3 my-3">
                <SelectLocation register={register} errors={errors} />
              </div>
              <button
                type="submit"
                className={`cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold ml-3 rounded w-20 text-center py-2`} // Added py-2 class to increase the height
              >
                Next
              </button>
            </form>
          </div>
        );
      case 4:
        return (
          <div className="flex justify-start items-top min-h-screen  bg-cyan-900 ps-44">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <h1 className="text-4xl text-white mt-2">Occupation</h1>
              <div className="p-2 flex items-center my-3">
                <Occupation
                  register={register}
                  errors={errors}
                  occupation={occupation}
                />
                <button
                  type="submit"
                  className={`cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold ml-3 rounded w-20 text-center py-2`} // Added py-2 class to increase the height
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        );
      case 5:
        return (
          <div className="flex justify-start items-top min-h-screen  bg-cyan-900 ps-44">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-4xl text-white mt-2">
                Select Existhhing Group
              </h1>
            </form>
          </div>
        );
      case 6:
        return (
          <div>
            <h2>Step 6: Final Review</h2>
            <button type="submit">Submit</button>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className=" w-full">{renderStep()}</div>;
}

export default AddProduct;
