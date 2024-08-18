import React, { useEffect, useState } from "react";
import { signOut } from "../../Services/auth";
import { Sidebar } from "./Sidebar";
import { CustomInput, CustomTextArea } from "../OfferComponents/Input";
import { useForm } from "react-hook-form";
import {
  addDivision,
  deleteDivision,
  getDivisions,
} from "../../Services/division";
import Loader from "../../Loader";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import CustomButton from "../Global/Button";

// Modal component for adding a division
const AddDivisionModal = ({ isOpen, onClose, setDivisions, changeEffect }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const name = watch("name");
  const description = watch("description");

  const [loading, setLoading] = useState(false);

  const onsubmit = (data) => {
    setLoading(true);
    console.log(data);
    addDivision(data)
      .then((resp) => {
        console.log(resp);
        setLoading(false);
        changeEffect((e) => !e);
        onClose();
        reset();
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div
      className={`fixed inset-0  flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white text-black p-4 rounded-md mx-4 md:w-4/12">
        <form onSubmit={handleSubmit(onsubmit)}>
          <p className="text-lg text-cyan-900">Add Division</p>
          <div className="w-full px-2 md:mb-0">
            <CustomInput
              label={"Division Name"}
              placeholder={"Enter Division Name"}
              inputProps={{
                ...register("name", {
                  required: "Division Name is required",
                }),
                type: "text",
              }}
              error={errors?.name}
            />
          </div>
          <div className="w-full px-2 md:mb-4">
            <CustomTextArea
              label={"Description"}
              placeholder={"Describe the division..."}
              inputProps={{
                ...register("description", {
                  required: "Description is required",
                }),
              }}
              error={errors?.description}
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

const RemoveDivisionModal = ({ isOpen, onClose, currDiv, changeEffect }) => {
  const [loading, setLoading] = useState(false);

  const onsubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    deleteDivision(currDiv)
      .then((resp) => {
        console.log(resp);
        setLoading(false);
        changeEffect((e) => !e);
        onClose();
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        onClose();
      });
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

export default function Division(props) {
  const { changeLogin } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const [divisions, setDivisions] = useState([]);
  const [currDiv, setCurrDiv] = useState(null);

  const [effect, setEffect] = useState(false);

  useEffect(() => {
    getDivisions()
      .then((resp) => {
        setDivisions(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [effect]);

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

  const columns = [
    {
      field: "name",
      headerName: "Division Name",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-cell",
    },

    {
      field: "Action",
      headerName: "Action",
      flex: 1,
      headerClassName: "table-header",
      cellClassName: "table-cell",
      sortable: false,
      renderCell: (params) => {
        return (
          <Button
            variant="contained"
            onClick={() => {
              setCurrDiv(params.id);
              openModal2();
            }}
            style={{ backgroundColor: "#f44336", color: "#ffffff" }}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  return (
    <div className="flex h-screen bg-white text-slate-700">
      <Sidebar changeLogin={logout} />
      <div className="flex-1 ms-14">
        <div>
          <div className=" p-2 flex justify-end gap-4">
            <CustomButton
              onClick={openModal}
              className="cursor-pointer bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-full"
            >
              Add Division
            </CustomButton>
          </div>
          <hr></hr>
        </div>
        <div className=" p-8">
          <DataGrid
            rows={divisions}
            columns={columns}
            autoHeight
            disableColumnMenu
            hideFooter
            className="w-full h-full bg-cyan-100"
          />
        </div>
      </div>
      {/* Modal for adding division */}
      <AddDivisionModal
        isOpen={isModalOpen}
        onClose={closeModal}
        setDivisions={setDivisions}
        changeEffect={setEffect}
        l
      />
      <RemoveDivisionModal
        isOpen={isModalOpen2}
        onClose={closeModal2}
        currDiv={currDiv}
        changeEffect={setEffect}
      />
    </div>
  );
}
