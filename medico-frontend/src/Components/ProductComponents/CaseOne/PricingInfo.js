import React from "react";

function PricingInformation({
  register,
  watch,
  errors,
  calculateSellingPrice,
  validateRetailPrice,
  pricingMethod,
}) {
  // const pricingMethod = watch("pricingMethod");

  return (
    // <fieldset>
    //   <legend>Pricing Information</legend>
    //   <div className="form-group">
    //     <label>MRP:</label>
    //     <input
    //       type="number"
    //       {...register("mrp", {
    //         required: "MRP is required",
    //         pattern: {
    //           value: /^[0-9]+$/,
    //           message: "MRP can only contain numeric values",
    //         },
    //       })}
    //     />
    //     {errors.mrp && <span>{errors.mrp.message}</span>}
    //   </div>
    //   <div className="form-group">
    //     <label>Retail Price:</label>
    //     <input
    //       type="number"
    //       {...register("retailPrice", {
    //         required: "Retail price is required",
    //         pattern: {
    //           value: /^[0-9]+$/,
    //           message: "Retail price can only contain numeric values",
    //         },
    //         validate: validateRetailPrice,
    //       })}
    //     />
    //     {errors.retailPrice && <span>{errors.retailPrice.message}</span>}
    //   </div>
    //   <div className="form-group">
    //     <label>Pricing Method Preference:</label>
    //     <label>
    //       <input
    //         type="radio"
    //         value="discountOnMRP"
    //         {...register("pricingMethod")}
    //       />{" "}
    //       Discount on MRP
    //     </label>
    //     <label>
    //       <input
    //         type="radio"
    //         value="marginOnRetail"
    //         {...register("pricingMethod")}
    //       />{" "}
    //       Margin on Retail Price
    //     </label>
    //   </div>
    //   {pricingMethod === "discountOnMRP" && (
    //     <div className="form-group">
    //       <label>Discount on MRP (%):</label>
    //       <input
    //         type="number"
    //         {...register("discountOnMRP", {
    //           required: "Discount on MRP is required",
    //         })}
    //       />
    //       {errors.discountOnMRP && <span>{errors.discountOnMRP.message}</span>}
    //     </div>
    //   )}
    //   {pricingMethod === "marginOnRetail" && (
    //     <div className="form-group">
    //       <label>Margin (%):</label>
    //       <input
    //         type="number"
    //         {...register("margin", {
    //           required: "Margin is required",
    //         })}
    //       />
    //       {errors.margin && <span>{errors.margin.message}</span>}
    //     </div>
    //   )}
    //   <div className="form-group">
    //     <label>Selling Price:</label>
    //     <input type="text" value={calculateSellingPrice()} readOnly />
    //   </div>
    // </fieldset>
    <fieldset>
      <legend>Pricing Information</legend>
      <div className="form-group">
        <label>MRP:</label>
        <input
          type="number"
          {...register("mrp", {
            required: "MRP is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "MRP can only contain numeric values",
            },
          })}
        />
        {errors.mrp && <span>{errors.mrp.message}</span>}
      </div>
      <div className="form-group">
        <label>Retail Price:</label>
        <input
          type="number"
          {...register("retailPrice", {
            required: "Retail price is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Retail price can only contain numeric values",
            },
            validate: { validateRetailPrice },
          })}
        />
        {errors.retailPrice && <span>{errors.retailPrice.message}</span>}
      </div>
      <div className="form-group">
        <label>Pricing Method Preference:</label>
        <label>
          <input
            type="radio"
            value="discountOnMRP"
            {...register("pricingMethod")}
          />
          Discount on MRP
        </label>
        <label>
          <input
            type="radio"
            value="marginOnRetail"
            {...register("pricingMethod")}
          />{" "}
          Margin on Retail Price
        </label>
      </div>
      {pricingMethod === "discountOnMRP" && (
        <div className="form-group">
          <label>Discount on MRP (%):</label>
          <input
            type="number"
            {...register("discountOnMRP", {
              required: "Discount on MRP is required",
            })}
          />
          {errors.discountOnMRP && <span>{errors.discountOnMRP.message}</span>}
        </div>
      )}
      {pricingMethod === "marginOnRetail" && (
        <div className="form-group">
          <label>Margin (%):</label>
          <input
            type="number"
            {...register("margin", {
              required: "Margin is required",
            })}
          />
          {errors.margin && <span>{errors.margin.message}</span>}
        </div>
      )}
      <div className="form-group">
        <label>Selling Price:</label>
        <input type="text" value={calculateSellingPrice()} readOnly />
      </div>
    </fieldset>
  );
}

export default PricingInformation;
