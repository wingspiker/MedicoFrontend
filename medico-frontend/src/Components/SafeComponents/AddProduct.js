import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ProductInformation from "../ProductComponents/CaseOne/ProductInfo";
import ManufacturerInformation from "../ProductComponents/CaseOne/ManufacturerInfo";
import PricingInformation from "../ProductComponents/CaseOne/PricingInfo";
import SelectExistingGroup from "../ProductComponents/CaseTwo/SelectGroup";
import Occupation from "../ProductComponents/CaseFour/Occupation";
import SelectLocation from "../ProductComponents/CaseThree/SelectLocation";

function AddProduct() {
  const [currentStep, setCurrentStep] = React.useState(1);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    data.talukaIds = sTaluka;
    // setsTaluka([]);
    console.log("Form Data:", data);

    if (currentStep < 6) {
      console.log(data.existingGroupNo);
      if (currentStep === 2 && data.existingGroupNo) {
        setCurrentStep(5); // Move to step 5 if no group is selected
      } else {
        setCurrentStep(currentStep + 1); // Move to the next step
      }
      // setCurrentStep(currentStep + 1);
    } else {
      console.log("Final Submission", data);
    }
  };

  const productName = watch("productName");
  const productType = watch("productType");
  const division = watch("division");
  const sizeX = watch("sizeX");
  const sizeY = watch("sizeY");
  const contains = watch("contains");

  const manufacturerName = watch("manufacturerName");
  const manufacturerLicenseNumber = watch("manufacturerLicenseNumber");
  const allowExchange = watch("allowExchange");
  const returnDays = watch("returnDays");

  const existingGroupNo = watch("existingGroupNo");

  const occupation = watch("occupation");
  const degree = watch("degree");
  //watch PRiceInfo Selling price is remaining

  const [sTaluka, setsTaluka] = useState([]);
  console.log(sTaluka);

  const groupName = watch("groupName");
  const groupDescription = watch("groupDescription");

  const prescription = watch("prescription");
  const allowReturn = watch("allowReturn");
  const pricingMethod = watch("pricingMethod");
  const retailPrice = watch("retailPrice");
  const margin = watch("marginOnRetail");
  const mrp = watch("mrp");
  const discount = watch("discountOnMRP");

  // console.log(existingGroupNo);
  const validateRetailPrice = (value) => {
    return (
      Number(value) <= Number(mrp) ||
      "Retail price must be less than or equal to MRP"
    );
  };

  const calculateSellingPrice = () => {
    if (pricingMethod === "discountOnMRP" && mrp && discount) {
      return (mrp - (mrp * discount) / 100).toFixed(2);
    } else if (pricingMethod === "marginOnRetail" && retailPrice && margin) {
      // console.log(retailPrice, margin);
      return (retailPrice * (1 + margin * 0.01)).toFixed(2);
    }
    return 0;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="flex justify-center items-center min-h-screen bg-cyan-900">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className=" text-4xl text-white">Product</h1>
              <ProductInformation
                register={register}
                watch={watch}
                errors={errors}
                prescription={prescription}
              />
              <ManufacturerInformation
                register={register}
                errors={errors}
                allowReturn={allowReturn}
              />
              <PricingInformation
                register={register}
                watch={watch}
                errors={errors}
                calculateSellingPrice={calculateSellingPrice}
                validateRetailPrice={validateRetailPrice}
                pricingMethod={pricingMethod}
              />

              <div className=" p-2 flex justify-end">
                <button
                  type="submit"
                  className={` cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="flex justify-start items-top min-h-screen  bg-cyan-900 ps-44">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-4xl text-white mt-2">
                Select Existhhing Group
              </h1>
              <div className="p-2 flex items-center my-3">
                <SelectExistingGroup register={register} errors={errors} />
                <button
                  type="submit"
                  className={`cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold ml-3 rounded w-20 text-center py-2`} // Added py-2 class to increase the height
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        );
      case 3:
        return (
          <div className="flex justify-start items-top min-h-screen  bg-cyan-900 ps-44">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-4xl text-white mt-2">Select Location</h1>
              <div className="p-2 flex items-center mt-3 my-3">
                <SelectLocation
                  register={register}
                  errors={errors}
                  setsTaluka={setsTaluka}
                  // talukaArray={SelectedTalukaArray}
                />
              </div>
              <button
                type="submit"
                className={`cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold ml-3 rounded w-20 text-center py-2`} // Added py-2 class to increase the height
              >
                Next
              </button>
            </form>
          </div>
        );
      case 4:
        return (
          <div className="flex justify-start items-top min-h-screen  bg-cyan-900 ps-44">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <h1 className="text-4xl text-white mt-2">Occupation</h1>
              <div className="p-2 flex items-center my-3">
                <Occupation
                  register={register}
                  errors={errors}
                  occupation={occupation}
                />
                <button
                  type="submit"
                  className={`cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold ml-3 rounded w-20 text-center py-2`} // Added py-2 class to increase the height
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        );
      case 5:
        return (
          <div className="flex justify-start items-top min-h-screen  bg-cyan-900 ps-44">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1 className="text-4xl text-white mt-2">
                Select Existhhing Group
              </h1>
            </form>
          </div>
        );
      case 6:
        return (
          <div>
            <h2>Step 6: Final Review</h2>
            <button type="submit">Submit</button>
          </div>
        );
      default:
        return null;
    }
  };

  return <div className=" w-full">{renderStep()}</div>;
}

export default AddProduct;
