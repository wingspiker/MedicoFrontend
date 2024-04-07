import React from "react";
import {
  CustomInput,
  CustomSelect,
  CustomTextArea,
} from "../../OfferComponents/Input";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";

function ProductInformation({ register, watch, errors, prescription }) {
  return (
    <fieldset className="p-4 border rounded-md mt-5 max-w-5xl">
      <legend className="text-2xl text-white">Product Information</legend>

      <div className="flex flex-wrap -mx-2 items-center gap-y-6">
        <div className="w-full md:w-1/4 px-2 md:mb-0">
          <CustomInput
            label="Product Name"
            placeholder="Enter product name"
            inputProps={register("productName", {
              required: "Product Name is required",
              pattern: {
                value: /^[A-Za-z]+[A-Za-z0-9]*$/,
                message:
                  "Product name must start with a letter and can contain letters and numbers.",
              },
            })}
            error={errors.productName}
          />
        </div>

        <div className="w-full md:w-1/4 px-2 md:mb-0">
          <CustomInput
            label="Brand Name"
            placeholder="Enter Brand name"
            inputProps={register("brandName", {
              required: "Brand Name is required",
              pattern: {
                value: /^[A-Za-z]+[A-Za-z0-9]*$/,
                message:
                  "Brand name must start with a letter and can contain letters and numbers.",
              },
            })}
            error={errors.brandName}
          />
        </div>

        <div className="w-full md:w-1/4 px-2 md:mb-0">
          <CustomInput
            label={"Product Image"}
            placeholder={"Upload"}
            inputProps={{
              ...register("productImage", {
                required: "Product Image is required",
              }),
              type: "file",
              accept: "image/*",
              className:" bg-red-500"
            }}
            error={errors?.productImage}
          />
        </div>

        <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
          <CustomSelect
            label="Product Type"
            options={[
              { value: "", label: "Select a product type" },
              { value: 0, label: "Capsule" },
              { value: 1, label: "Tablet" },
              // Add more product types as needed
            ]}
            inputProps={register("productType", {
              required: "Product Type is required",
            })}
            error={errors.productType}
          />
        </div>

        <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
          <CustomSelect
            label="Division"
            options={[
              { value: "", label: "Select a division" },
              { value: "Division 1", label: "Division 1" },
              { value: "Division 2", label: "Division 2" },
              // Add more divisions as needed
            ]}
            inputProps={register("division", {
              required: "Division is required",
            })}
            error={errors.division}
          />
        </div>

        <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
          <CustomSelect
            label="Prescription"
            options={[
              { value: 0, label: "Rx" },
              { value: 1, label: "nRx" },
              { value: 2, label: "G" },
            ]}
            inputProps={register("prescription", {
              required: "Prescription is required",
            })}
            error={errors.prescription}
          />
        </div>

        {prescription === "nRx" && (
          <div className="w-full md:w-1/4 p-2 mb-4 md:mb-0">
            <div className="form-group">
              <input
                type="file"
                className="mt-1 block w-full file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-white file:text-indigo-500 hover:file:bg-indigo-50"
                {...register("letterPadDocument", {
                  required: "Please Upload the file",
                })}
              />
            </div>
          </div>
        )}

        <div className="w-full md:w-1/4 px-2 mb-4  md:mb-0">
          <CustomInput
            label="Size X"
            placeholder="Enter size X"
            inputProps={register("sizeX", {
              required: "Size X is required",
            })}
            error={errors.sizeX}
          />
        </div>

        <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
          <CustomInput
            label="Size Y"
            placeholder="Enter size Y"
            inputProps={register("sizeY", {
              required: "Size Y is required",
            })}
            error={errors.sizeY}
          />
        </div>

        {/* Assuming you want to use CustomTextArea instead of TextField for the 'Contains' field */}
        <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
          <CustomTextArea
            label="Contains"
            placeholder="Details of the content"
            inputProps={register("contains", {
              required: "Contains is required",
            })}
            error={errors.contains}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default ProductInformation;
