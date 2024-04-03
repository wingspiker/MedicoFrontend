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
    manufacturerName: "",
    manufacturerLicenseNumber: "",
    allowExchange: null,
    allowReturn: null,
    returnDays: "",

    mrp: "",
    retailPrice: "",
    pricingMethod: "",
    discountOnMRP: "",
    margin: "",
    sellingPrice: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    if (name === "allowExchange") {
      console.log(Boolean(value));
      setFormData({ ...formData, [name]: Boolean(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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

  const calculateSellingPrice = (mrp, discount) => {
    const discountedAmount = (parseFloat(mrp) * parseFloat(discount)) / 100;
    return (parseFloat(mrp) - discountedAmount).toFixed(2);
  };

  const calculateSellingPriceWithMargin = (retailPrice, margin) => {
    const marginAmount = (parseFloat(retailPrice) * parseFloat(margin)) / 100;
    return (parseFloat(retailPrice) + marginAmount).toFixed(2);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="min-h-screen bg-cyan-900 py-8 px-4 flex justify-center items-start">
            <div className="max-w-5xl w-full bg-white rounded-lg shadow-md p-6 relative">
              {/* Responsive positioning for the Save button */}
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">
                  Product
                </h1>
              </div>
              {/* Product Section */}
              <div className="mb-6">
                <form onSubmit={handleSubmit}>
                  <div className=" border mb-4 p-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">
                      Product Information
                    </h2>
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
                  </div>
                  {/* Manufacturer Section */}
                  <div className="border mb-4 p-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Manufacturer
                    </h2>
                    <div className="md:flex md:justify-between md:gap-4 mt-6">
                      <div className="md:flex-1 md:pr-2 mb-4 md:mb-0">
                        <label className="block text-gray-700">
                          Manufacturer Name
                        </label>
                        <input
                          type="text"
                          name="manufacturerName"
                          value={formData.manufacturerName}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                      <div className="md:flex-1 md:pl-2 mb-4 md:mb-0">
                        <label className="block text-gray-700">
                          Manufacturer License Number
                        </label>
                        <input
                          type="text"
                          name="manufacturerLicenseNumber"
                          value={formData.manufacturerLicenseNumber}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                    </div>
                    <div className="md:flex md:justify-between md:gap-4">
                      <div className="md:flex-1 md:pl-2 mb-4 md:mb-0">
                        <label className="block text-gray-700">
                          Allow Exchange
                        </label>
                        <div>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="allowExchange"
                              value={true}
                              checked={formData.allowExchange}
                              onChange={handleChange}
                              className="form-radio h-5 w-5 text-green-500"
                            />
                            <span className="ml-2">True</span>
                          </label>
                          <label className="inline-flex items-center ml-6">
                            <input
                              type="radio"
                              name="allowExchange"
                              value={false}
                              checked={!formData.allowExchange}
                              onChange={handleChange}
                              className="form-radio h-5 w-5 text-red-500"
                            />
                            <span className="ml-2">False</span>
                          </label>
                        </div>
                      </div>
                      <div className="md:flex-1 md:pl-2 mb-4 md:mb-0">
                        <label className="block text-gray-700">
                          Allow Return
                        </label>
                        <div>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="allowReturn"
                              value={true}
                              checked={formData.allowReturn}
                              onChange={handleChange}
                              className="form-radio h-5 w-5 text-green-500"
                            />
                            <span className="ml-2">True</span>
                          </label>
                          <label className="inline-flex items-center ml-6">
                            <input
                              type="radio"
                              name="allowReturn"
                              value={false}
                              checked={!formData.allowReturn}
                              onChange={handleChange}
                              className="form-radio h-5 w-5 text-red-500"
                            />
                            <span className="ml-2">False</span>
                          </label>
                        </div>
                        {formData.allowReturn && (
                          <div className="mt-4">
                            <label className="block text-gray-700">
                              Return Days
                            </label>
                            <input
                              type="text"
                              name="returnDays"
                              value={formData.returnDays}
                              onChange={handleChange}
                              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border mb-4 p-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                      Pricing Information
                    </h2>
                    <div className="md:flex md:justify-between md:gap-4 mt-6">
                      <div className="md:flex-1 md:pr-2 mb-4 md:mb-0">
                        <label className="block text-gray-700">MRP</label>
                        <input
                          type="text"
                          name="mrp"
                          value={formData.mrp}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                      <div className="md:flex-1 md:px-2 mb-4 md:mb-0">
                        <label className="block text-gray-700">
                          Retail Price
                        </label>
                        <input
                          type="text"
                          name="retailPrice"
                          value={formData.retailPrice}
                          onChange={handleChange}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                      <div className="md:flex-1 md:pl-2 mb-4 md:mb-0">
                        <label className="block text-gray-700">
                          Pricing Method Preference
                        </label>
                        <div>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="pricingMethod"
                              value="discountOnMRP"
                              checked={
                                formData.pricingMethod === "discountOnMRP"
                              }
                              onChange={handleChange}
                              className="form-radio h-5 w-5 text-green-500"
                            />
                            <span className="ml-2">Discount on MRP</span>
                          </label>
                          <label className="inline-flex items-center ml-6">
                            <input
                              type="radio"
                              name="pricingMethod"
                              value="marginOnRetailPrice"
                              checked={
                                formData.pricingMethod === "marginOnRetailPrice"
                              }
                              onChange={handleChange}
                              className="form-radio h-5 w-5 text-red-500"
                            />
                            <span className="ml-2">Margin on Retail Price</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* Additional fields based on pricing method */}
                    {formData.pricingMethod === "discountOnMRP" && (
                      <div className="md:flex md:justify-between md:gap-4 mt-6">
                        <div className="md:flex-1 md:pr-2 mb-4 md:mb-0">
                          <label className="block text-gray-700">
                            Discount on MRP (%)
                          </label>
                          <input
                            type="text"
                            name="discountOnMRP"
                            value={formData.discountOnMRP}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                          />
                        </div>
                      </div>
                    )}
                    {formData.pricingMethod === "marginOnRetailPrice" && (
                      <div className="md:flex md:justify-between md:gap-4 mt-6">
                        <div className="md:flex-1 md:pr-2 mb-4 md:mb-0">
                          <label className="block text-gray-700">
                            Margin (%)
                          </label>
                          <input
                            type="text"
                            name="margin"
                            value={formData.margin}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                          />
                        </div>
                      </div>
                    )}
                    {/* Selling Price Field */}
                    <div className="md:flex md:justify-between md:gap-4 mt-6">
                      <div className="md:flex-1 md:pr-2 mb-4 md:mb-0">
                        <label className="block text-gray-700">
                          Selling Price
                        </label>
                        {/* Logic to calculate selling price based on selected method */}
                        <input
                          type="text"
                          name="sellingPrice"
                          value={
                            formData.pricingMethod === "discountOnMRP"
                              ? calculateSellingPrice(
                                  formData.mrp,
                                  formData.discountOnMRP
                                )
                              : formData.pricingMethod === "marginOnRetailPrice"
                              ? calculateSellingPriceWithMargin(
                                  formData.retailPrice,
                                  formData.margin
                                )
                              : ""
                          }
                          readOnly
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2 rounded-md bg-green-400 text-gray-800 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
                    onClick={handleSubmit}
                  >
                    Next
                  </button>
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
