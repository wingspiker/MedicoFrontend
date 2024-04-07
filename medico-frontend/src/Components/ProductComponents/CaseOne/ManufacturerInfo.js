import React from "react";
import {
  CustomInput,
  CustomSelect,
  CustomTextArea,
} from "../../OfferComponents/Input";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";

function ManufacturerInformation({ register, errors, allowReturn }) {
  return (
    <fieldset className="p-4 border rounded-md flex flex-col md:flex-row md:justify-between mt-4 max-w-5xl">
      <legend className="text-2xl text-white mb-4 md:mb-0 md:mr-4">
        Manufacturer Information
      </legend>

      <div className="form-group flex md:w-1/4 flex-col">
        <CustomInput
          label="Manufacturer Name"
          placeholder="Enter manufacturer name"
          inputProps={register("manufacturerName", {
            required: "Manufacturer name is required",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message:
                "Manufacturer name can only contain alphabets and spaces",
            },
          })}
          error={errors.manufacturerName}
        />
      </div>

      <div className="form-group flex  flex-col">
        <CustomInput
          label="Manufacturer License Number"
          placeholder="Enter license number"
          inputProps={register("manufacturerLicenseNumber", {
            required: "Manufacturer license number is required",
            pattern: {
              value: /^[0-9]+$/,
              message:
                "Manufacturer license number can only contain numeric values",
            },
          })}
          error={errors.manufacturerLicenseNumber}
        />
      </div>

      <div className="form-group flex flex-col">
        <label>Allow Exchange</label>
        <div className="flex">
          <input type="radio" value="true" {...register("allowExchange")} />{" "}
          <span className="mr-4">True</span>
          <input
            type="radio"
            value="false"
            {...register("allowExchange")}
          />{" "}
          <span>False</span>
        </div>
      </div>

      <div className="form-group flex flex-col">
        <label>Allow Return</label>
        <div className="flex">
          <input type="radio" value="true" {...register("allowReturn")} />{" "}
          <span className="mr-4">True</span>
          <input type="radio" value="false" {...register("allowReturn")} />{" "}
          <span>False</span>
        </div>
      </div>

      {allowReturn === "true" && (
        <div className="form-group flex flex-col">
          <CustomInput
            label="Return Days"
            placeholder="Enter return days"
            inputProps={register("returnDays", {
              required: "Return days is required",
            })}
            error={errors.returnDays}
          />
        </div>
      )}
    </fieldset>
  );
}

export default ManufacturerInformation;
