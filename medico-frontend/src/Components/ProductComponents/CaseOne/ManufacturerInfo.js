import React from "react";

function ManufacturerInformation({ register, errors, allowReturn }) {
  return (
    <fieldset>
      <legend>Manufacturer Information</legend>
      <div className="form-group">
        <label>Manufacturer Name:</label>
        <input
          {...register("manufacturerName", {
            required: "Manufacturer name is required",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message:
                "Manufacturer name can only contain alphabets and spaces",
            },
          })}
        />
        {errors.manufacturerName && (
          <span>{errors.manufacturerName.message}</span>
        )}
      </div>
      <div className="form-group">
        <label>Manufacturer License Number:</label>
        <input
          type="number"
          {...register("manufacturerLicenseNumber", {
            required: "Manufacturer license number is required",
            pattern: {
              value: /^[0-9]+$/,
              message:
                "Manufacturer license number can only contain numeric values",
            },
          })}
        />
        {errors.manufacturerLicenseNumber && (
          <span>{errors.manufacturerLicenseNumber.message}</span>
        )}
      </div>
      <div className="form-group">
        <label>Allow Exchange:</label>
        <label>
          <input type="radio" value="true" {...register("allowExchange")} />{" "}
          True
        </label>
        <label>
          <input type="radio" value="false" {...register("allowExchange")} />{" "}
          False
        </label>
      </div>
      <div className="form-group">
        <label>Allow Return:</label>
        <label>
          <input type="radio" value="true" {...register("allowReturn")} /> True
        </label>
        <label>
          <input type="radio" value="false" {...register("allowReturn")} />{" "}
          False
        </label>
      </div>
      {allowReturn === "true" && (
        <div className="form-group">
          <label>Return Days:</label>
          <input
            type="number"
            {...register("returnDays", {
              required: "Return days is required",
            })}
          />
          {errors.returnDays && <span>{errors.returnDays.message}</span>}
        </div>
      )}
    </fieldset>
  );
}

export default ManufacturerInformation;
