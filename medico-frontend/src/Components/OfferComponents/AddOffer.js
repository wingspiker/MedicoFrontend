import React from "react";
import { useForm, Controller } from "react-hook-form";
import CustomInput from "./Input";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import ReactDatePicker from "react-datepicker";

function AddOffer() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log("Final Submission", data);
    }
  };

  const offerName = watch("offerName");
  const offerCode = watch("offerCode");
  const offerPhoto = watch("offerPhoto");
  const offerDescription = watch("offerDescription");
  const offerType = watch("offerType");
  const expiryDate = watch("expiryDate");
  const allowedUser = watch("allowedUser");

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex justify-start mt-6 ml-[56px] px-10">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <h1 className="text-2xl font-semibold mb-4">Basic Details</h1>
              <div className="grid grid-cols-4">
                <CustomInput
                  label={"Offer Name"}
                  placeholder={"Enter offer name"}
                  inputProps={register("offerName", {
                    required: "Offer name is required",
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message:
                        "Offer name can only contain alphabets and spaces",
                    },
                  })}
                  error={errors?.offerName}
                />
                <CustomInput
                  label={"Offer Photo"}
                  placeholder={"Upload"}
                  inputProps={{
                    ...register("offerPhoto", {
                      required: "Offer photo is required",
                    }),
                    type: "file",
                    accept: "image/*",
                    className: "py-2 text-xs",
                  }}
                  error={errors?.offerPhoto}
                />
                <CustomInput
                  label={"Offer Code"}
                  placeholder={"Enter offer code"}
                  inputProps={register("offerCode", {
                    required: "Offer code is required",
                  })}
                  error={errors?.offerCode}
                />
                <CustomInput
                  label={"Offer Description"}
                  placeholder={"Enter offer description"}
                  inputProps={register("offerDescription", {
                    required: "Offer description is required",
                  })}
                  error={errors?.offerDescription}
                />
              </div>

              <div className="mt-5 grid grid-cols-4">
                <div className="flex flex-col">
                  <label className="text-black text-lg">Offer Type</label>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Radio checked={offerType === "Price Centric"} />
                      }
                      {...register("offerType", {
                        required: "Offer type is required",
                      })}
                      label="Price Centric"
                      value={"Price Centric"}
                    />
                    <FormControlLabel
                      control={
                        <Radio checked={offerType === "Product Centric"} />
                      }
                      {...register("offerType", {
                        required: "Offer type is required",
                      })}
                      label="Product Centric"
                      value={"Product Centric"}
                    />
                    <FormControlLabel
                      control={<Radio checked={offerType === "Box Base"} />}
                      {...register("offerType", {
                        required: "Offer type is required",
                      })}
                      label="Box Base"
                      value={"Box Base"}
                    />
                  </FormGroup>

                  {errors?.offerType && (
                    <span className="text-[red] mt-1">
                      {errors?.offerType?.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-black text-lg">Expiry Date</label>
                  <Controller
                    name="expiryDate"
                    control={control}
                    rules={{ required: "Expiry date is required" }}
                    render={({ field }) => (
                      <ReactDatePicker
                        className="h-10 bg-gray-400 py-2 px-2 text-sm rounded-md outline-none border border-solid border-gray-900 text-black placeholder-gray-900 pl-2"
                        {...field}
                        dateFormat="d MMM yyyy"
                        minDate={new Date()}
                        selected={field.value ? new Date(field.value) : null}
                        showTimeSelect={false}
                        todayButton="Today"
                        dropdownMode="select"
                        isClearable
                        placeholderText="Select expiry date"
                        shouldCloseOnSelect
                        onChange={(date) => field.onChange(date)}
                      />
                    )}
                  />
                  {errors?.expiryDate && (
                    <span className="text-[red] mt-1">
                      {errors?.expiryDate?.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col mt-5">
                  <label className="text-black text-lg">Allowed User</label>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            allowedUser && allowedUser.includes("Doctor")
                          }
                        />
                      }
                      {...register("allowedUser", {
                        required: "At least one user should be allowed",
                      })}
                      value={"Doctor"}
                      label="Doctor"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            allowedUser && allowedUser.includes("Engineer")
                          }
                        />
                      }
                      {...register("allowedUser")}
                      value={"Engineer"}
                      label="Engineer"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            allowedUser && allowedUser.includes("Farmer")
                          }
                        />
                      }
                      {...register("allowedUser")}
                      value={"Farmer"}
                      label="Farmer"
                    />
                  </FormGroup>

                  {errors?.allowedUser && (
                    <span className="text-[red] mt-1">
                      {errors?.allowedUser?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="w-full flex justify-center mt-24">
                <button
                  className={` cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
                  type="submit"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        );
      case 2:
        return (
          <div>
            <h2>Step 2: [Demo Purpose Only]</h2>
            <button onClick={() => setCurrentStep(currentStep + 1)}>
              Next
            </button>
          </div>
        );
      case 3:
        return (
          <div>
            <h2>Step 3: [Demo Purpose Only]</h2>
            <button onClick={() => setCurrentStep(currentStep + 1)}>
              Next
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-cyan-900 text-white h-screen">
      <div className="pt-10 flex justify-center w-full">
        <Stepper activeStep={currentStep - 1} alternativeLabel>
          <Step key={1}>
            <StepLabel />
          </Step>
          <Step key={2}>
            <StepLabel />
          </Step>
          <Step key={3}>
            <StepLabel />
          </Step>
        </Stepper>
      </div>
      {renderStep()}
    </div>
  );
}

export default AddOffer;
