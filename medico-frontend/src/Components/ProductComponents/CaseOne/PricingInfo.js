import React from "react";
import {
  CustomInput,
  CustomSelect,
  CustomTextArea,
} from "../../OfferComponents/Input";
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  FormControlLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { pricingPreferenceEnum } from "../../../Models/enums.model";

function PricingInformation({
  register,
  watch,
  errors,
  calculateSellingPrice,
  validateRetailPrice,
  pricingMethod,
}) {
  return (
    <div className="p-4 border rounded-xl mt-4 flex flex-col md:flex-col md:justify-between max-w-5xl bg-cyan-50">
      <div className="text-2xl text-cyan-700 mb-4 font-medium md:mb-0 md:mr-4">
        Pricing Information
      </div>
      <div className="flex  flex-wrap justify-between py-5">
        <div className="form-group flex flex-col md:w-1/4">
          <CustomInput
            label="MRP"
            placeholder="Enter MRP"
            inputProps={register("mrp", {
              required: "MRP is required",
              pattern: {
                value: /^[0-9]+(?:\.[0-9]+)?$/,
                message: "MRP can only contain numeric values",
              },
            })}
            error={errors.mrp}
          />
        </div>

        <div className="form-group flex flex-col md:w-1/4">
          <CustomInput
            label="Retail Price"
            placeholder="Enter Retail Price"
            inputProps={register("retailPrice", {
              required: "Retail price is required",
              pattern: {
                value: /^[0-9]+(?:\.[0-9]+)?$/,
                message: "Retail price can only contain numeric values",
              },
              validate: { validateRetailPrice },
            })}
            error={errors.retailPrice}
          />
        </div>

        <div className="form-group flex flex-col md:w-1/4">
          <CustomSelect
            label="Pricing Preference"
            inputProps={register("pricingMethod", {
              required: "Pricing Preference is required",
            })}
            // options={[
            //   { value: "discountOnMRP", label: "Discount on MRP" },
            //   { value: "marginOnRetail", label: "Margin on Retail Price" },
            // ]}
            options={[
              { value: "", label: "Select a pricing prescripton" },
              ...Object.keys(pricingPreferenceEnum).map((k, i) => {
                return { value: i, label: pricingPreferenceEnum[k] };
              }),
            ]}
            error={errors.pricingMethod}
          />
        </div>

        <div className="form-group flex flex-col md:w-1/4">
          {pricingMethod === "0" && (
            <CustomInput
              label="Discount on MRP (%)"
              placeholder="Enter Discount on MRP"
              inputProps={register("discountOnMRP", {
                required: "Discount on MRP is required",
                pattern: {
                  value: /^[0-9]+(?:\.[0-9]+)?$/,
                  message: "Discount on MRP can only contain numeric values",
                },
              })}
              error={errors.discountOnMRP}
            />
          )}

          {pricingMethod === "1" && (
            <CustomInput
              label="Margin on Retail Price (%)"
              placeholder="Enter Margin on Retail Price"
              inputProps={register("marginOnRetail", {
                required: "Margin on Retail Price is required",
                pattern: {
                  value: /^[0-9]+(?:\.[0-9]+)?$/,
                  message:
                    "Margin on Retail Price can only contain numeric values",
                },
              })}
              error={errors.marginOnRetail}
            />
          )}

          <CustomInput
            label="Selling Price"
            placeholder="Calculated Selling Price"
            inputProps={{
              value: calculateSellingPrice(),
              readOnly: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default PricingInformation;
