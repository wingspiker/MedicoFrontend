import React from "react";
// import { useForm, Controller } from "react-hook-form";
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
    <fieldset className="p-4 border rounded-md max-w-2xl">
      <legend className=" text-2xl text-white">Product Information</legend>

      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            {...register("productName", {
              required: "This field is required",
              pattern: {
                value: /^[A-Za-z]+[A-Za-z0-9]*$/,
                message:
                  "Product name must start with a letter and can contain letters and numbers.",
              },
            })}
            error={!!errors.productName}
            helperText={errors.productName && errors.productName.message}
          />
        </div>

        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="product-type-label">Product Type</InputLabel>
            <Select
              labelId="product-type-label"
              label="Product Type"
              {...register("productType")}
            >
              <MenuItem value="">Select a product type</MenuItem>
              <MenuItem value="Tablet">Tablet</MenuItem>
              <MenuItem value="Capsule">Capsule</MenuItem>
              {/* Add more product types as needed */}
            </Select>
          </FormControl>
        </div>

        <div className="w-full md:w-1/3 px-2 mb-4 md:mb-0">
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="division-label">Division</InputLabel>
            <Select
              labelId="division-label"
              label="Division"
              {...register("division")}
            >
              <MenuItem value="">Select a division</MenuItem>
              <MenuItem value="Division 1">Division 1</MenuItem>
              <MenuItem value="Division 2">Division 2</MenuItem>
              {/* Add more divisions as needed */}
            </Select>
          </FormControl>
        </div>

        <div className="w-full md:w-1/5 px-2 mb-4 md:mb-0">
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="prescription-label">Prescription</InputLabel>
            <Select
              labelId="prescription-label"
              label="Prescription"
              {...register("prescription")}
            >
              <MenuItem value="Rx">Rx</MenuItem>
              <MenuItem value="nRx">nRx</MenuItem>
              <MenuItem value="G">G</MenuItem>
            </Select>
          </FormControl>
        </div>

        {prescription === "nRx" && (
          <div className="w-4 md:w-1/5 p-2 mb-4 md:mb-0">
            <div className="form-group">
              <input
                type="file"
                className="mt-1 block w-full file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-white file:text-indigo-500 hover:file:bg-indigo-50"
                {...register("letterPadDocument")}
              />
            </div>
          </div>
        )}

        <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
          <TextField
            label="Size X"
            type="number"
            variant="outlined"
            fullWidth
            {...register("sizeX", { required: "This field is required" })}
            error={!!errors.sizeX}
            helperText={errors.sizeX && errors.sizeX.message}
          />
        </div>

        <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
          <TextField
            label="Size Y"
            type="number"
            variant="outlined"
            fullWidth
            {...register("sizeY", { required: "This field is required" })}
            error={!!errors.sizeY}
            helperText={errors.sizeY && errors.sizeY.message}
          />
        </div>

        <div className="w-full px-2 mb-4">
          <TextField
            label="Contains"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            {...register("contains")}
          />
        </div>
      </div>
    </fieldset>
  );
}

export default ProductInformation;
