import React, { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { Sidebar } from "./Sidebar";
import { signOut, decodeToken } from "../../Services/auth";
import {
  CustomInput,
  CustomSelect,
  CustomTextArea,
} from "../OfferComponents/Input";
import { useForm } from "react-hook-form";
import Loader from "../../Loader";
import { getDistricts, getStates, getTalukas } from "../../Services/location";
import { registerSalesman } from "../../Services/user";

const AddSalesmanModal = ({
  isOpen,
  onClose,
  setSalesman,
  changeEffect,
  showSucc,
  showErr,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange", // This option makes the form validate on change
  });

  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const email = watch("email");
  const mobileNumber = watch("mobileNumber");
  const state = watch("state");
  const district = watch("district");
  const taluka = watch("taluka");

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [talukaId, setTalukaId] = useState(-1);

  const [loading, setLoading] = useState(false);

  const onsubmit = (data) => {
    data.areaAssignedTalukaId = talukaId;
    const add = {
      state: states.find((s) => s.id == state).name,
      district: districts.find((d) => d.id == district).name,
      taluka: talukas.find((t) => t.id == taluka).name,
    };
    data.address = add;

    const {
      firstName,
      lastName,
      address,
      mobileNumber,
      email,
      areaAssignedTalukaId,
    } = data;

    const salesmanData = {
      firstName,
      lastName,
      mobileNumber,
      email,
      address,
      areaAssignedTalukaId,
    };
    console.log(salesmanData);

    addSalesman(data);
  };

  const addSalesman = (salesman) => {
    setLoading(true);
    registerSalesman(salesman)
      .then((res) => {
        console.log(res);
        showSucc("Salesman Added Successfully");
        reset();
        setLoading(false);
        onClose();
      })
      .catch((err) => {
        showErr("Error adding batch", err);
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getStates()
      .then((res) => {
        setStates(res);
      })
      .catch((err) => console.log("Error: ", err));
  }, []);

  useEffect(() => {
    if (state) {
      getDistricts(state)
        .then((res) => {
          setDistricts(res);
        })
        .catch((err) => console.log("Error fetching districts: ", err));
    } else {
      setDistricts([]); // Clear districts if no state is selected
    }
  }, [state]);

  useEffect(() => {
    if (district) {
      getTalukas(district)
        .then((res) => {
          // console.log(res);
          setTalukas(res);
        })
        .catch((err) => console.log("Error fetching districts: ", err));
    } else {
      setTalukas([]); // Clear districts if no state is selected
    }
  }, [district]);

  useEffect(() => {
    if (taluka) {
      setTalukaId(Number(taluka));
    } else {
      setTalukaId(-1); // Clear districts if no state is selected
    }
  }, [taluka]);

  const stateOptions = states.map((s) => {
    return { value: s.id, label: s.name };
  });

  const districtOptions = districts.map((s) => {
    return { value: s.id, label: s.name };
  });

  const talukaOptions = talukas.map((s) => {
    return { value: s.id, label: s.name };
  });

  return (
    <div
      className={`fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white text-black p-4 rounded-md mx-4 md:w-4/12">
        <form onSubmit={handleSubmit(onsubmit)}>
          <p className="text-3xl text-cyan-900 mb-6">Add Salesman</p>
          <div className="flex">
            <div className="w-full px-2 md:mb-4">
              <CustomInput
                label={"First Name"}
                placeholder={"Enter First Name"}
                inputProps={{
                  ...register("firstName", {
                    required: "First Name is required",
                  }),
                  type: "text",
                }}
                error={errors?.firstName}
              />
            </div>
            <div className="w-full px-2 md:mb-4">
              <CustomInput
                label={"Last Name"}
                placeholder={"Enter Last Name"}
                inputProps={{
                  ...register("lastName", {
                    required: "Last Name is required",
                  }),
                  type: "text",
                }}
                error={errors?.lastName}
              />
            </div>
          </div>
          <div className="flex">
            <div className="w-full px-2 md:mb-4">
              <CustomInput
                label={"Email"}
                placeholder={"Enter Email Address"}
                inputProps={{
                  ...register("email", {
                    required: "email is required",
                  }),
                  type: "text",
                }}
                error={errors?.email}
              />
            </div>
            <div className="w-full px-2 md:mb-4">
              <CustomInput
                label={"Mobile Number"}
                placeholder={"Enter Mobile Number"}
                inputProps={{
                  ...register("mobileNumber", {
                    required: "Mobile number is required",
                  }),

                  type: "text",
                }}
                error={errors?.mobileNumber}
              />
            </div>
          </div>

          <div className="flex">
            <div className="w-full px-2 md:mb-4">
              <CustomSelect
                label="Choose an Option"
                options={[
                  { value: "", label: "Select State" },
                  ...stateOptions,
                ]}
                inputProps={{
                  ...register("state", {
                    required: "Selection is required",
                    validate: (value) => value !== "" || "State is required",
                  }),
                  defaultValue: "",
                }}
                error={errors?.state}
              />
            </div>
            <div className="w-full px-2 md:mb-4">
              <CustomSelect
                label="Choose District"
                options={[
                  { value: "", label: "Select..." },
                  ...districtOptions,
                ]}
                inputProps={{
                  ...register("district", {
                    required: "District is required",
                    validate: (value) => value !== "" || "District is required",
                  }),
                  defaultValue: "",
                }}
                error={errors?.district}
              />
            </div>
          </div>
          <div className="w-full px-2 md:mb-4">
            <CustomSelect
              label="Choose an Option"
              options={[{ value: "", label: "Select..." }, ...talukaOptions]}
              inputProps={{
                ...register("taluka", {
                  required: "Taluka is required",
                  validate: (value) => value !== "" || "Taluka is required",
                }),
                defaultValue: "",
              }}
              error={errors?.taluka}
            />
          </div>

          <div className="mt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
            >
              {loading ? <Loader /> : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const RemoveSalesmanModal = ({
  isOpen,
  onClose,
  currArt,
  changeEffect,
  product,
}) => {
  const [loading, setLoading] = useState(false);

  const onsubmit = (e) => {
    console.log(e);
    // e.preventDefault();
    // setLoading(true);
    // deleteDivision(currArt)
    //   .then((resp) => {
    //     console.log(resp);
    //     setLoading(false);
    //     changeEffect((e) => !e);
    //     onClose();
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //     setLoading(false);
    //     onClose();
    //   });
  };

  return (
    <div
      className={`fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white text-black p-4 rounded-md mx-4 md:w-4/12">
        <form onSubmit={onsubmit}>
          <p className="text-2xl text-cyan-900">Delete Division</p>
          <p className="text-lg text-black">
            Are you sure you want to delete division?
          </p>

          <div className="mt-4 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
            >
              {loading ? <Loader /> : "Delete"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function AdminAddSalesman(props) {
  const { changeLogin } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const [salesman, setSalesman] = useState([]);
  const [currSalesman, setcurrSalesman] = useState(null);

  const [effect, setEffect] = useState(false);

  const [isRed, setIsRed] = useState(false);
  const [fl, setFl] = useState(false);

  const showErr = (msg) => {
    setIsRed(true);
    toast.error(msg);
  };
  const showSucc = (msg) => {
    setIsRed(false);
    toast.success(msg);
    setFl((f) => !f);
  };

  const logout = () => {
    signOut();
    changeLogin(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  return (
    <div className="flex h-screen bg-cyan-900 text-white">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { color: `${isRed ? "red" : "green"}` },
        }}
      />
      {/* <Sidebar /> Add the Sidebar component */}
      <Sidebar changeLogin={logout} />
      <div className="flex-1 ms-14">
        <div>
          <div className=" p-2 flex justify-end gap-4">
            <button
              onClick={openModal}
              className={` cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
            >
              Add Salesman
            </button>
          </div>
          <hr></hr>
        </div>
        <p className=" text-4xl text-white px-8 py-2">Salesman</p>
      </div>

      <AddSalesmanModal
        isOpen={isModalOpen}
        onClose={closeModal}
        setSalesman={setSalesman}
        changeEffect={setEffect}
        showErr={showErr}
        showSucc={showSucc}
      />
      <RemoveSalesmanModal
        isOpen={isModalOpen2}
        onClose={closeModal2}
        currSalesman={currSalesman}
        changeEffect={setEffect}
      />
    </div>
  );
}
