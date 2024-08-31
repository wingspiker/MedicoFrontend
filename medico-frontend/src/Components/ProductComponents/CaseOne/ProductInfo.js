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
import { prescriptionEnum, productTypeEnum } from "../../../Models/enums.model";
import { handleImageUpload } from "../../../Services/upload";

function ProductInformation({
  register,
  watch,
  errors,
  prescription,
  divisions,
  setValue,
}) {
  const handleProductImageFileChange = (e) => {
    handleImageUpload(e)
      .then((res) => {
        setValue("productImage", res.data);
      })
      .catch((err) => console.log("Error: ", err));
  };

  const handlePrescriptionDocFileChange = (e) => {
    handleImageUpload(e)
      .then((res) => {
        console.log(res);
        setValue("letterPadDocument", res.data);
      })
      .catch((err) => console.log("Error: ", err));
  };

  return (
    <div className="p-4 border rounded-2xl mt-5 max-w-5xl bg-cyan-50">
      <div className="text-2xl text-cyan-700  mb-4 font-medium">
        Product Information
      </div>

      <div className="flex flex-wrap -mx-2 items-center gap-y-6">
        <div className="w-full md:w-1/4 px-2 md:mb-0">
          <CustomInput
            label="Product Name"
            placeholder="Enter product name"
            inputProps={register("productName", {
              required: "Product Name is required",
              pattern: {
                value: /^[A-Za-z0-9\s]+$/,
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
                  "Brand name must start with letter and can contain letters and numbers and not specialc characters.",
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
              required: "Product Image is required",
              onChange: handleProductImageFileChange,
              type: "file",
              accept: "image/*",
              className:
                "file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-white file:text-indigo-500 hover:file:bg-indigo-50",
            }}
            error={errors?.productImage}
          />
        </div>

        <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
          <CustomSelect
            label="Product Type"
            // options={[
            //   { value: "", label: "Select a product type" },
            //   { value: 0, label: "Capsule" },
            //   { value: 1, label: "Tablet" },
            //   // Add more product types as needed
            // ]}
            options={[
              { value: "", label: "Select a product type" },
              ...Object.keys(productTypeEnum).map((k, i) => {
                return { value: i, label: productTypeEnum[k] };
              }),
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
              // { value: "", label: "Select a division" },
              // { value: "Division 1", label: "Division 1" },
              // { value: "Division 2", label: "Division 2" },
              // Add more divisions as needed
              { value: "", label: "Select a Division" },
              ...divisions.map((k) => {
                return { value: k.name, label: k.name };
              }),
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
            // options={[
            //   { value: 0, label: "Rx" },
            //   { value: 1, label: "nRx" },
            //   { value: 2, label: "G" },
            // ]}
            options={[
              { value: "", label: "Select a prescription type" },
              ...Object.keys(prescriptionEnum).map((k, i) => {
                return { value: i, label: prescriptionEnum[k] };
              }),
            ]}
            inputProps={register("prescription", {
              required: "Prescription is required",
            })}
            error={errors.prescription}
          />
        </div>

        {prescription === "1" && (
          <div className="w-full md:w-1/4 p-2 mb-4 md:mb-0">
            <CustomInput
              label={"Prescription Document"}
              placeholder={"Upload"}
              inputProps={{
                required: "letter Pad document is required",
                type: "file",
                accept: "image/*",
                onChange: handlePrescriptionDocFileChange,
                className:
                  "file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-white file:text-indigo-500 hover:file:bg-indigo-50",
              }}
              error={errors?.letterPadDocument}
            />
          </div>
        )}

        <div className="w-full md:w-1/4 px-2 mb-4  md:mb-0">
          <CustomInput
            label="Size X"
            placeholder="Enter size X"
            inputProps={register("sizeX", {
              required: "Size X is required",
              pattern: {
                value: /^[0-9]+$/, // Regular expression to allow only digits
                message: "Only Integer values are allowed", // Error message for invalid input
              },
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
              pattern: {
                value: /^[0-9]+$/, // Regular expression to allow only digits
                message: "Only Integer values are allowed", // Error message for invalid input
              },
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
    </div>
  );
}

export default ProductInformation;
