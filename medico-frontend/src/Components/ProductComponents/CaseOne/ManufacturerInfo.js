import React from "react";
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
    <fieldset>
      <legend>Manufacturer Information</legend>
      <div className="form-group">
        <TextField
          label="Manufacturer Name"
          variant="outlined"
          fullWidth
          {...register("manufacturerName", {
            required: "Manufacturer name is required",
            pattern: {
              value: /^[A-Za-z\s]+$/,
              message:
                "Manufacturer name can only contain alphabets and spaces",
            },
          })}
          error={!!errors.manufacturerName}
          helperText={
            errors.manufacturerName && errors.manufacturerName.message
          }
        />
      </div>
      <div className="form-group">
        <TextField
          label="Manufacturer License Number"
          type="number"
          variant="outlined"
          fullWidth
          {...register("manufacturerLicenseNumber", {
            required: "Manufacturer license number is required",
            pattern: {
              value: /^[0-9]+$/,
              message:
                "Manufacturer license number can only contain numeric values",
            },
          })}
          error={!!errors.manufacturerLicenseNumber}
          helperText={
            errors.manufacturerLicenseNumber &&
            errors.manufacturerLicenseNumber.message
          }
        />
      </div>
      <div className="form-group">
        <FormControl component="fieldset">
          <FormLabel component="legend">Allow Exchange</FormLabel>
          <RadioGroup row {...register("allowExchange")}>
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
        </FormControl>
      </div>
      <div className="form-group">
        <FormControl component="fieldset">
          <FormLabel component="legend">Allow Return</FormLabel>
          <RadioGroup row {...register("allowReturn")}>
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
        </FormControl>
      </div>
      {allowReturn === "true" && (
        <div className="form-group">
          <TextField
            label="Return Days"
            type="number"
            variant="outlined"
            fullWidth
            {...register("returnDays", {
              required: "Return days is required",
            })}
            error={!!errors.returnDays}
            helperText={errors.returnDays && errors.returnDays.message}
          />
        </div>
      )}
    </fieldset>
  );
}

export default ManufacturerInformation;
