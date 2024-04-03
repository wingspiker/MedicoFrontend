import React from "react";

function ProductInformation({ register, errors }) {
  return (
    <fieldset>
      <legend>Product Information</legend>
      <div className="form-group">
        <label>Product Name:</label>
        <input
          {...register("productName", {
            required: "This field is required",
            pattern: {
              value: /^[A-Za-z]+[A-Za-z0-9]*$/,
              message:
                "Product name must start with a letter and can contain letters and numbers.",
            },
          })}
        />
        {errors.productName && <span>{errors.productName.message}</span>}
      </div>
      <div className="form-group">
        <label>Size X:</label>
        <input
          type="number"
          {...register("sizeX", {
            required: "This field is required",
          })}
        />
        {errors.sizeX && <span>{errors.sizeX.message}</span>}
      </div>
      <div className="form-group">
        <label>Size Y:</label>
        <input
          type="number"
          {...register("sizeY", {
            required: "This field is required",
          })}
        />
        {errors.sizeY && <span>{errors.sizeY.message}</span>}
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
