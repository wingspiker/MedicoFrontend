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

const AddSalesmanModal = ({ isOpen, onClose, setSalesman, changeEffect }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();


  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const email = watch("email");
  const mobileNumber = watch("mobileNumber");
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [taluka, setTaluka] = useState('');
  const [talukaId, setTalukaId] = useState(-1);

  const [loading, setLoading] = useState(false);

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);

  const [errs, setErrs] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    if (name === "state") {
      if (value === "") {
        error = "State is required";
      } else {
        setState(states.find(s=>s.id==value).name)
        getDistricts(value)
          .then((d) => {
            setDistricts(d);
          })
          .catch((err) => console.log(err));
      }
    }
    if (name === "district") {
      if (value === "") {
        error = "District is required";
      } else {
        setDistrict(districts.find(s=>s.id==value).name)
        getTalukas(value)
          .then((d) => {
            setTalukas(d);
          })
          .catch((err) => console.log(err));
      }
    }

    if (name === "taluka") {
      if (value === "") {
        error = "Taluka is required";
      } else {
        setTaluka(talukas.find(s=>s.id==value).name);
        setTalukaId(Number(value))
      }
    }

    setErrs(prev=>{
      return {...prev, [name]:error}
    })
  };

  useEffect(() => {
    getStates()
      .then((res) => {
        setStates(res);
      })
      .catch((err) => console.log("Error: ", err));
  }, []);

  const validateAddress = () => {
    let err=''
    if(state===''){
      setErrs(prev=>{
        return {...prev, state:err}
      })
    }
    else if(district===''){
      setErrs(prev=>{
        return {...prev, district:err}
      })
    }
    else if(taluka===''){
      setErrs(prev=>{
        return {...prev, taluka:err}
      })
    }else{
      setErrs({})
    }
  }


  const onsubmit = (data) => {

    validateAddress();
    if(Object.keys(errs).length>0){
      return;
    }
    data.areaAssignedTalukaId = talukaId;
    console.log(data);
    const address = {
      state, district, taluka
    }
    data.address = address;

    console.log(data);

    addSalesman(data);

  };

  const addSalesman = (salesman) => {
    registerSalesman(salesman)
      .then((res)=>{
        console.log(res);
        reset();
        onClose();
      })
      .catch((err)=>{
        console.log(err);
      })
  }

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
                    required: "Mobile Number is required",
                  }),
                  type: "text",
                }}
                error={errors?.mobileNumer}
              />
            </div>
          </div>

          <div className="flex">
            <div className="w-full px-2 md:mb-4">
              <div className="flex flex-col">
                <label htmlFor="state" className="text-black text-lg">
                  State
                </label>
                <select 
                  name="state"
                  // value={formData.state}
                  onChange={handleChange}
                  className="w-52 h-10 bg-white py-2 px-2 text-sm rounded-md outline-none border border-solid border-gray-900 text-black placeholder-gray-900 "
                >
                  <option value="" selected disabled>
                    Select State
                  </option>
                  {states.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {console.log(errs)}
                {errs.state && (
                  <span className="text-red-500">{errs.state}</span>
                )}
              </div>
            </div>
            <div className="w-full px-2 md:mb-4">
              <div className="flex flex-col">
                <label htmlFor="state" className="text-black text-lg">
                  District
                </label>
                <select 
                  name="district"
                  // value={formData.state}

                  onChange={handleChange}
                  className="w-52 h-10 bg-white py-2 px-2 text-sm rounded-md outline-none border border-solid border-gray-900 text-black placeholder-gray-900 "
                >
                  <option value="" selected disabled>
                    Select District
                  </option>
                  {districts.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                  {/* {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))} */}
                </select>
                {errs.state && (
                  <span className="text-red-500">{errs.state}</span>
                )}
              </div>
            </div>
          </div>
          <div className="w-full px-2 md:mb-4">
            <div className="flex flex-col">
              <label htmlFor="state" className="text-black text-lg">
                Taluka
              </label>
              <select 
                name="taluka"
                // value={formData.state}
                onChange={handleChange}
                className="w-52 h-10 bg-white py-2 px-2 text-sm rounded-md outline-none border border-solid border-gray-900 text-black placeholder-gray-900 "
              >
                <option value="" selected disabled>
                  Select Taluka
                </option>
                {talukas.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
                {/* {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))} */}
              </select>
              {errs.state && (
                <span className="text-red-500">{errs.state}</span>
              )}
            </div>
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

export default function Salesman(props) {
  const { changeLogin } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const [salesman, setSalesman] = useState([]);
  const [currSalesman, setcurrSalesman] = useState(null);

  const [effect, setEffect] = useState(false);

  const [isRed, setIsRed] = useState(false);

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
        l
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
