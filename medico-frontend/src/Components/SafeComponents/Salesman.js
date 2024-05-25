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
import { getCompanyByEmail } from "../../Services/company";
import { useNavigate } from "react-router-dom";

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
  const talukasSelected = watch("talukas") || [];

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [loading, setLoading] = useState(false);

  const onsubmit = (data) => {
    data.areaAssignedTalukaIds = talukasSelected.map(Number);
    const add = {
      state: states.find((s) => s.id == state).name,
      district: districts.find((d) => d.id == district).name,
      taluka: talukasSelected.map((t) => talukas.find((tk) => tk.id == t).name)[0],
    };
    data.addressRequest = add;

    const user = decodeToken();
    const keys = Object.keys(user);
    const ownerEmail = user[keys.find((k) => k.endsWith("emailaddress"))];

    const {
      firstName,
      lastName,
      addressRequest,
      mobileNumber,
      email,
      areaAssignedTalukaIds,
    } = data;

    const salesmanData = {
      firstName,
      lastName,
      mobileNumber,
      email,
      addressRequest,
      areaAssignedTalukaIds,
      ownerEmail
    };
    console.log(salesmanData);

    addSalesman(salesmanData);
  };

  const addSalesman = (salesman) => {
    setLoading(true);
    registerSalesman(salesman)
      .then((res) => {
        console.log(res);
        showSucc("Salesman Added Successfully");
        reset();
        setLoading(false);
        changeEffect(f=>!f)
        onClose();
      })
      .catch((err) => {
        showErr("Error adding Salesman", err);
        setLoading(false);
        changeEffect(f=>!f)
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
          setTalukas(res);
        })
        .catch((err) => console.log("Error fetching talukas: ", err));
    } else {
      setTalukas([]); // Clear talukas if no district is selected
    }
  }, [district]);

  const handleTalukaChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      setValue("talukas", [...talukasSelected, value]);
    } else {
      setValue(
        "talukas",
        talukasSelected.filter((t) => t !== value)
      );
    }
  };

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
                    minLength: {
                      value: 10,
                      message:
                        "Mobile number must be exactly 10 characters long",
                    },
                    maxLength: {
                      value: 10,
                      message:
                        "Mobile number must be exactly 10 characters long",
                    },
                    pattern: {
                      value: /^[0-9]*$/,
                      message: "Mobile number must contain only digits",
                    },
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
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Select Talukas
            </label>
            <div className="flex flex-wrap gap-2">
              {talukaOptions.map((option) => (
                <label key={option.value} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    value={option.value}
                    {...register("talukas", {
                      validate: (value) =>
                        value.length > 0 || "At least one Taluka must be selected",
                    })}
                    onChange={handleTalukaChange}
                    className="form-checkbox"
                  />
                  <span className="ml-2">{option.label}</span>
                </label>
              ))}
            </div>
            {errors?.talukas && (
              <p className="text-red-500 text-xs italic">
                {errors.talukas.message}
              </p>
            )}
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
    e.preventDefault();
    console.log('deletion simulated');
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

export default function Salesman(props) {
  const { changeLogin } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const [effect, setEffect] = useState(false);

  const navigate = useNavigate();

  const [salesman, setSalesman] = useState([]);
  const [currSalesman, setcurrSalesman] = useState(null);
  // const [flag, setflag] = useState(false);

  const [allsalesman, setAllsalesman] = useState([])
  useEffect(() => {
    const user = decodeToken();
    const keys = Object.keys(user);
    const ownerEmail = user[keys.find((k) => k.endsWith("emailaddress"))];
    getCompanyByEmail(ownerEmail)
    .then(resp=>{
      // console.log(resp);
      setAllsalesman(resp.assignedSalesmen)
    })
    .catch(err=>{
      console.log(err);
    })
  }, [effect])



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

  const SalesmanCard = ({ salesman, onView, onDelete, index }) => (
    <div className="bg-white text-black rounded-lg shadow-lg p-4 m-2 w-full sm:w-1/2 lg:w-1/4">
      <div className="flex items-center">
        <img
          src="/salesman.jpg"
          alt="avatar"
          className="rounded-full h-24 w-24"
        />
        <div className="ml-4 flex-grow">
          <h2 className="text-xl font-semibold">{salesman.firstName} {salesman.lastName}</h2>
          <p>{salesman.email}</p>
          <p>{salesman.mobileNumber}</p>
          <p>ID: {salesman.salesmanId}</p>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => onView(salesman, index)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          View
        </button>
        <button
          onClick={() => onDelete(salesman)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
  
  
  const SalesmanList = ({ salesmen }) => (
    <div className="flex flex-wrap">
      {salesmen && salesmen.map((salesman, index) => (
        <SalesmanCard key={salesman.id} salesman={salesman} onView={handleSalesmanView} onDelete={handleSalesmanDelete} index={index} />
      ))}
    </div>
  );

  const handleSalesmanView = (salesman, index) => {
    // console.log(salesman);
    // console.log('trtr');
    navigate(`/company/Salesman/${index}`,{state:{sid:salesman.id, salesmanEmail:salesman.email}})    
  }

  const handleSalesmanDelete = (salesman) => {
    console.log(salesman);
    setcurrSalesman(salesman)
    openModal2();
  }

  return (
    <div className=" h-screen bg-cyan-900 text-white">
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

      <div className=" ms-14 p-8">
        <SalesmanList salesmen={allsalesman} />
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
