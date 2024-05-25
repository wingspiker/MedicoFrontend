import React, { useState } from "react";
import CaseOne from "../GroupCompenents/CaseOne";
import { useForm } from "react-hook-form";
import CaseTwo from "../GroupCompenents/CaseTwo";
import CaseThree from "../GroupCompenents/CaseThree";
import { addGroup } from "../../Services/group";
import { decodeToken } from "../../Services/auth";
import { addBuyers, filterBuyrs } from "../../Services/buyer";
import { useNavigate } from "react-router-dom";

function AddGroup() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = React.useState(1);

  const [sTaluka, setsTaluka] = useState([]);

  const [buyers, setBuyers] = useState([]);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const [currentGroupId, setCurrentGroupId] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const groupName = watch("groupName");
  const groupDescription = watch("groupDescription");

  const occupation = watch("occupation");

  const onSubmit = (data) => {
    data.sTaluka = sTaluka;
    console.log(data);
    if (currentStep < 3) {
      if (currentStep === 1) {
        // setCurrentStep(currentStep + 1);
        AddGroup(data);
      }

      if (currentStep === 2) {
        // setCurrentStep(currentStep + 1);
        FilterGroup(data);
      }
    } else {
      // console.log("done All three steps and this is data", data);
      console.log(data);
      console.log(currentGroupId);
      AddBuyers(data);
    }
  };

  const AddGroup = (rawData) => {
    setLoading(true);
    console.log(rawData);
    const user = decodeToken();
    console.log(user);

    const keys = Object.keys(user);
    const email = user[keys.find((k) => k.endsWith("emailaddress"))];
    const { groupName, groupDescription, sTaluka } = rawData;

    let formattedApiInput = {
      email: email,
      name: groupName,
      description: groupDescription,
      buyerIds: [],
      talukaIds: sTaluka,
      productIds: [],
    };

    console.log("HELLLOOO");
    console.log(formattedApiInput);

    addGroup(formattedApiInput)
      .then((resp) => {
        console.log(resp);
        setCurrentGroupId(resp.id);
        setLoading(false);
        // showToast("Group Created Successfully", false);
        setCurrentStep(currentStep + 1);
      })
      .catch((err) => {
        console.log(err);
        // showToast(err.response.data.title, true);
        setLoading(false);
      });
  };

  const FilterGroup = (rawData) => {
    setLoading(true);
    const { occupation, degree } = rawData;

    let formattedApiInput = {
      id: currentGroupId,
      occupations: occupation ?? [],
      degrees: degree ?? [],
    };

    filterBuyrs(formattedApiInput)
      .then((resp) => {
        console.log(resp);
        setBuyers(resp);
        setLoading(false);
        setCurrentStep(currentStep + 1);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const AddBuyers = () => {
    // setLoading(true)
    // setLoading(true)
    const postData = {
      groupId: currentGroupId,
      buyerIds: rowSelectionModel ?? [],
    };
    addBuyers(postData)
      .then((res) => {
        console.log(res);
        // showToast("Buyers added successfully", false);
        setLoading(false);
        navigate("/company/Group");
      })
      .catch((err) => {
        console.log(err);
        // showToast(err.response.data.title, true);
        setLoading(false);
      });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
            <div className="flex justify-center items-top min-h-screen  bg-cyan-900">
              <form onSubmit={handleSubmit(onSubmit)}>
                <h1 className="text-4xl text-white mt-2">Select Location</h1>
                <div className="p-2 flex items-center justify-center mt-3 my-3">
                  <CaseOne
                    register={register}
                    errors={errors}
                    setsTaluka={setsTaluka}
                  />
                </div>
                <button
                  disabled={sTaluka.length === 0}
                  type="submit"
                  className={`cursor-pointer bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 disabled:cursor-auto text-white font-bold ml-3 rounded w-20 text-center py-2`} // Added py-2 class to increase the height
                >
                  Next
                </button>
              </form>
            </div>

        );
      case 2:
        return (
            <div className="flex justify-start items-top min-h-screen  bg-cyan-900 ps-44">
              <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                <h1 className="text-4xl text-white mt-2">Occupation</h1>
                <div className="p-2 flex items-start flex-col my-3">
                  <CaseTwo
                    register={register}
                    errors={errors}
                    occupation={occupation}
                  />
                  <div className="mt-4">
                    <button
                      type="submit"
                      className={`cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold ml-3 rounded w-20 text-center py-2`} // Added py-2 class to increase the height
                    >
                      Next
                      {/* {loading ? <Loader /> : "Next"} */}
                    </button>
                  </div>
                </div>
              </form>
            </div>

        );
      case 3:
        return (        
            <div className="p-10 ms-8  bg-cyan-900">
              <form onSubmit={handleSubmit(onSubmit)}>
                <CaseThree
                  setValue={setValue}
                  setRowSelectionModel={setRowSelectionModel}
                  rowSelectionModel={rowSelectionModel}
                  buyers={buyers}
                />
                <div className="flex mt-4 flex-row-reverse">
                  <button
                    type="submit"
                    className={`cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold ml-3 rounded w-20 text-center py-2`} // Added py-2 class to increase the height
                  >
                    Submit {/* {loading ? <Loader /> : "Submit"} */}
                  </button>
                </div>
              </form>
            </div>
          
        );
      default:
        return null;
    }
  };

  return (
      <div className=" w-full">{renderStep()}</div>

  );
}

export default AddGroup;
