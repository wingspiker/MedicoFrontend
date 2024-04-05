import React from "react";

function ProductInformation({ register, watch, errors, prescription }) {
  // const prescription = watch("prescription");
  return (
    // <fieldset>
    //   <legend>Product Information</legend>
    //   <div className="form-group">
    //     <label>Product Name:</label>
    //     <input
    //       {...register("productName", {
    //         required: "This field is required",
    //         pattern: {
    //           value: /^[A-Za-z]+[A-Za-z0-9]*$/,
    //           message:
    //             "Product name must start with a letter and can contain letters and numbers.",
    //         },
    //       })}
    //     />
    //     {errors.productName && <span>{errors.productName.message}</span>}
    //   </div>
    //   <div className="form-group">
    //     <label>Size X:</label>
    //     <input
    //       type="number"
    //       {...register("sizeX", {
    //         required: "This field is required",
    //       })}
    //     />
    //     {errors.sizeX && <span>{errors.sizeX.message}</span>}
    //   </div>
    //   <div className="form-group">
    //     <label>Size Y:</label>
    //     <input
    //       type="number"
    //       {...register("sizeY", {
    //         required: "This field is required",
    //       })}
    //     />
    //     {errors.sizeY && <span>{errors.sizeY.message}</span>}
    //   </div>
    //   <div className="form-group">
    //     <label>Product Type:</label>
    //     <select {...register("productType")}>
    //       <option value="Tablet">Tablet</option>
    //       <option value="Capsule">Capsule</option>
    //     </select>
    //   </div>
    //   <div className="form-group">
    //     <label>Item:</label>
    //     <select {...register("item")}>
    //       <option value="Item 1">Item 1</option>
    //       <option value="Item 2">Item 2</option>
    //     </select>
    //   </div>
    //   <div className="form-group">
    //     <label>Prescription:</label>
    //     <select {...register("prescription")}>
    //       <option value="Rx">Rx</option>
    //       <option value="nRx">nRx</option>
    //       <option value="G">G</option>
    //     </select>
    //   </div>
    //   {prescription === "nRx" && (
    //     <div className="form-group">
    //       <label>Upload Letter Pad Document:</label>
    //       <input type="file" {...register("letterPadDocument")} />
    //     </div>
    //   )}
    // </fieldset>

    <fieldset className="p-6 border border-gray-300 rounded-md">
      <legend className="text-lg font-semibold text-gray-700">
        Product Information
      </legend>

      <div className="flex flex-wrap -mx-3 mb-6">
        {/* Product Name */}
        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label className="block text-sm font-medium text-gray-700">
            Product Name:
          </label>
          <input
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register("productName", {
              required: "This field is required",
              pattern: {
                value: /^[A-Za-z]+[A-Za-z0-9]*$/,
                message:
                  "Product name must start with a letter and can contain letters and numbers.",
              },
            })}
          />
          {errors.productName && (
            <span className="text-red-500 text-xs">
              {errors.productName.message}
            </span>
          )}
        </div>

        {/* ... Other input fields styled similarly ... */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Product Type:
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register("productType")}
          >
            <option value="">Select a product type</option>
            <option value="Tablet">Tablet</option>
            <option value="Capsule">Capsule</option>
            {/* Add more product types as needed */}
          </select>
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Division:
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register("division")}
          >
            <option value="">Select a division</option>
            <option value="Division 1">Division 1</option>
            <option value="Division 2">Division 2</option>
            {/* Add more divisions as needed */}
          </select>
        </div>

        {/* Prescription */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Prescription:
          </label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register("prescription")}
          >
            <option value="Rx">Rx</option>
            <option value="nRx">nRx</option>
            <option value="G">G</option>
          </select>
        </div>

        {/* Conditional File Upload */}
        {prescription === "nRx" && (
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700">
              Upload Letter Pad Document:
            </label>
            <input
              type="file"
              className="mt-1 block w-full file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-white file:text-indigo-500 hover:file:bg-indigo-50"
              {...register("letterPadDocument")}
            />
          </div>
        )}

        {/* Size X */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Size X:
          </label>
          <input
            type="number"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register("sizeX", {
              required: "This field is required",
            })}
          />
          {errors.sizeX && (
            <span className="text-red-500 text-xs">{errors.sizeX.message}</span>
          )}
        </div>

        {/* Size Y */}
        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Size Y:
          </label>
          <input
            type="number"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register("sizeY", {
              required: "This field is required",
            })}
          />
          {errors.sizeY && (
            <span className="text-red-500 text-xs">{errors.sizeY.message}</span>
          )}
        </div>

        <div className="form-group">
          <label className="block text-sm font-medium text-gray-700">
            Contains:
          </label>
          <textarea
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            {...register("contains")}
          />
          {errors.contains && (
            <span className="text-red-500 text-xs">
              {errors.contains.message}
            </span>
          )}
        </div>
      </div>
    </fieldset>

    // <>
    //   <fieldset className="w-full">
    //     <legend className="text-center">Product Information</legend>

    //     {/* First row with Product Name, Product Type, and Division aligned center */}
    //     <div className="flex flex-row justify-center space-x-4 mb-4">
    //       <div className="form-group">
    //         <label>Product Name:</label>
    //         <input
    //           className="form-input"
    //           {...register("productName", {
    //             required: "This field is required",
    //             pattern: {
    //               value: /^[A-Za-z]+[A-Za-z0-9]*$/,
    //               message:
    //                 "Product name must start with a letter and can contain letters and numbers.",
    //             },
    //           })}
    //         />
    //         {errors.productName && <span>{errors.productName.message}</span>}
    //       </div>

    //       <div className="form-group">
    //         <label>Product Type:</label>
    //         <input
    //           className="form-input"
    //           {...register("productType", {
    //             required: "This field is required",
    //           })}
    //         />
    //         {errors.productType && <span>{errors.productType.message}</span>}
    //       </div>

    //       <div className="form-group">
    //         <label>Division:</label>
    //         <input
    //           className="form-input"
    //           {...register("division", { required: "This field is required" })}
    //         />
    //         {errors.division && <span>{errors.division.message}</span>}
    //       </div>
    //     </div>

    //     {/* Second row with Prescription, UPLOAD LETTER PAD DOCUMENT FILE, Size X, Size Y, and Container aligned center */}
    //     <div className="flex flex-row justify-center space-x-4">
    //       <div className="form-group">
    //         <label>Prescription:</label>
    //         <input className="form-input" {...register("prescription")} />
    //       </div>

    //       <div className="form-group">
    //         <label>UPLOAD LETTER PAD DOCUMENT FILE:</label>
    //         <input
    //           type="file"
    //           className="form-input"
    //           {...register("letterPadFile")}
    //         />
    //       </div>

    //       <div className="form-group">
    //         <label>Size X:</label>
    //         <input
    //           type="number"
    //           className="form-input"
    //           {...register("sizeX", { required: "This field is required" })}
    //         />
    //         {errors.sizeX && <span>{errors.sizeX.message}</span>}
    //       </div>

    //       <div className="form-group">
    //         <label>Size Y:</label>
    //         <input
    //           type="number"
    //           className="form-input"
    //           {...register("sizeY", { required: "This field is required" })}
    //         />
    //         {errors.sizeY && <span>{errors.sizeY.message}</span>}
    //       </div>

    //       <div className="form-group">
    //         <label>Container:</label>
    //         <input className="form-input" {...register("container")} />
    //       </div>
    //     </div>
    //   </fieldset>
    // </>
  );
}

export default ProductInformation;
