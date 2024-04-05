import React from "react";
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";

function PricingInformation({
  register,
  watch,
  errors,
  calculateSellingPrice,
  validateRetailPrice,
  pricingMethod,
}) {
  return (
    <fieldset>
      <legend>Pricing Information</legend>
      <div className="form-group">
        <TextField
          label="MRP"
          type="number"
          variant="outlined"
          fullWidth
          {...register("mrp", {
            required: "MRP is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "MRP can only contain numeric values",
            },
          })}
          error={!!errors.mrp}
          helperText={errors.mrp && errors.mrp.message}
        />
      </div>
      <div className="form-group">
        <TextField
          label="Retail Price"
          type="number"
          variant="outlined"
          fullWidth
          {...register("retailPrice", {
            required: "Retail price is required",
            pattern: {
              value: /^[0-9]+$/,
              message: "Retail price can only contain numeric values",
            },
            validate: { validateRetailPrice },
          })}
          error={!!errors.retailPrice}
          helperText={errors.retailPrice && errors.retailPrice.message}
        />
      </div>
      <div className="form-group">
        <FormControl component="fieldset">
          <FormLabel component="legend">Pricing Method Preference</FormLabel>
          <RadioGroup row {...register("pricingMethod")}>
            <FormControlLabel
              value="discountOnMRP"
              control={<Radio />}
              label="Discount on MRP"
            />
            <FormControlLabel
              value="marginOnRetail"
              control={<Radio />}
              label="Margin on Retail Price"
            />
          </RadioGroup>
        </FormControl>
      </div>
      {console.log(pricingMethod)}
      {pricingMethod === "discountOnMRP" && (
        <div className="form-group">
          <TextField
            label="Discount on MRP (%)"
            type="number"
            variant="outlined"
            fullWidth
            {...register("discountOnMRP", {
              required: "Discount on MRP is required",
            })}
            error={!!errors.discountOnMRP}
            helperText={errors.discountOnMRP && errors.discountOnMRP.message}
          />
        </div>
      )}
      {pricingMethod === "marginOnRetail" && (
        <div className="form-group">
          <h2>asdads</h2>
          <TextField
            label="Margin (%)"
            type="number"
            variant="outlined"
            fullWidth
            {...register("marginOnRetail", {
              required: "Margin is required",
            })}
            error={!!errors.marginOnRetail}
            helperText={errors.marginOnRetail && errors.marginOnRetail.message}
          />
        </div>
      )}
      <div className="form-group">
        <TextField
          label="Selling Price"
          type="text"
          value={calculateSellingPrice()}
          variant="outlined"
          fullWidth
          InputProps={{
            readOnly: true,
          }}
        />
      </div>
    </fieldset>
  );
}

export default PricingInformation;
