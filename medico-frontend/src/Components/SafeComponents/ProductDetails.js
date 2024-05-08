import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { signOut, decodeToken } from "../../Services/auth";
import { getProductById } from "../../Services/product";
import { CustomInput, CustomTextArea } from "../OfferComponents/Input";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import Loader from "../../Loader";
import { productTypeEnum } from "../../Models/enums.model";
import { addBatch } from "../../Services/batch";
import { Toaster, toast } from "sonner";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/compact";

const AddProductDetailModal = ({
  isOpen,
  onClose,
  setproductDetail,
  changeEffect,
  product,
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
  } = useForm();

  const manufacturingDate = watch("manufacturingDate");
  const expiryDate = watch("expiryDate");
  const quantity = watch("quantity");
  const price = watch("price");

  const [inputValue, setInputValue] = useState(product.sellingPrice);

  const [loading, setLoading] = useState(false);

  // const [url, setUrl] = useState(null);

  // const handleOnFileChange = (e) => {
  //   console.log(e);
  //   handleImageUpload(e)
  //     .then((res) => {
  //       console.log(res);
  //       setValue("articleImg", res.data);
  //     })
  //     .catch((err) => console.log("Error: ", err));
  // };

  const onsubmit = (data) => {
    data.productId = product.id;
    console.log(data);

    setLoading(true);
    addBatch(data)
      .then((resp) => {
        console.log(resp);
        setLoading(false);
        showSucc("Batch Added Successfully");
        onClose();
        reset();
      })
      .catch((err) => {
        console.log(err);
        showErr("Error adding batch", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    setValue("price", product.sellingPrice);
  }, [product]);

  return (
    <div
      className={`fixed inset-0  flex items-center justify-center bg-black bg-opacity-75 z-50  ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white text-black p-4 rounded-md mx-4 md:w-4/12">
        <form onSubmit={handleSubmit(onsubmit)}>
          <p className="text-lg text-cyan-900 mb-6">
            Add Batch - {product.drugName}{" "}
          </p>
          <div className="w-full px-2 md:mb-4 r">
            <CustomInput
              label={"Manufacturing Date"}
              placeholder={"Enter Manufacturing Date"}
              inputProps={{
                ...register("manufacturingDate", {
                  required: "Manufacturing Date is required",
                }),
                type: "date",
              }}
              error={errors?.manufacturingDate}
            />
          </div>
          <div className="w-full px-2 md:mb-4">
            <CustomInput
              label={"Expiry Date"}
              placeholder={"Enter Expiry Date"}
              inputProps={{
                ...register("expiryDate", {
                  required: "Expiry Date is required",
                  validate: (value) =>
                    (value && value >= manufacturingDate) ||
                    "Expiry Date cannot be before Manufacturing Date",
                }),
                type: "date",
              }}
              error={errors?.expiryDate}
            />
          </div>

          <div className="w-full px-2 md:mb-4">
            <CustomInput
              label={"Quantity"}
              placeholder={"Enter quantity"}
              inputProps={{
                ...register("quantity", {
                  required: "quantity is required",
                }),
                type: "number",
              }}
              error={errors?.quantity}
            />
          </div>

          <div className="w-full px-2 md:mb-4">
            <div className="flex flex-col">
              <label className="text-black text-lg">Price</label>
              <input
                className="w-52 h-10 bg-white py-2 px-2 text-sm rounded-md outline-none border border-solid border-gray-900 text-black placeholder-gray-900"
                label="Price"
                type="number"
                id="editableInput"
                {...register("price", {
                  required: "Price is required",
                })}
                defaultValue={product.sellingPrice}
                onChange={(e) => {
                  setValue("price", e.target.value);
                }}
              />
              {errors?.price && (
                <p className="text-red-500">{errors.price.message}</p>
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

const RemoveProductDetailModal = ({
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

export default function ProductDetails(props) {
  const { changeLogin } = props;
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const [productDetail, setproductDetail] = useState([]);
  const [currArt, setcurrArt] = useState(null);

  const [effect, setEffect] = useState(false);
  const [isRed, setIsRed] = useState(false);

  const showErr = (msg) => {
    setIsRed(true);
    toast.error(msg);
  };
  const showSucc = (msg) => {
    setIsRed(false);
    toast.success(msg);
    setFl((f) => !f);
  };

  const history = useLocation();

  const logout = () => {
    signOut();
    changeLogin(false);
  };

  const [product, setProduct] = useState({});

  const [fl, setFl] = useState(false);

  useEffect(() => {
    getProductById(history.state)
      .then((res) => {
        console.log("prodd");
        console.log(res);
        let batches = res.productBatches;
        let b = batches.map((p, i) => {
          return { ...p, index: i + 1 };
        });
        setNodes(b);
        setProduct(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fl]);

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

  const COLUMNS = [
    { label: "ID", renderCell: (item) => item.index },
    {
      label: "Manufacturing Date",
      renderCell: (item) =>
        new Date(item.manufacturingDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
    },
    {
      label: "Expiry Date",
      renderCell: (item) =>
        new Date(item.expiryDate).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }),
    },
    { label: "Quantity", renderCell: (item) => item.quantity },
    { label: "Price", renderCell: (item) => '₹ ' + Number(item.price).toPrecision(String(item.price).length+2) },
    // {
    //   label: 'Is Sold',
    //   renderCell: (item) => item.isSold.toString(),
    // },
    // {
    //   label: 'Is Visible',
    //   renderCell: (item) => item.isVisible.toString(),
    // },
  ];

  const [nodes, setNodes] = useState([]);

  // const nodes = [
  //   // {
  //   //     id: "75320e44-165f-43b7-8497-e4521c16eb15",
  //   //     manufacturingDate: "2024-05-01",
  //   //     expiryDate: "2024-05-31",
  //   //     quantity: 12,
  //   //     price: 1259,
  //   //     isSold: false,
  //   //     isVisible: true
  //   // },
  //   // {
  //   //     id: "fb068a95-89da-4019-99fa-e5ee6226cee8",
  //   //     manufacturingDate: "2024-05-08",
  //   //     expiryDate: "2024-05-11",
  //   //     quantity: 34,
  //   //     price: 1259,
  //   //     isSold: false,
  //   //     isVisible: true
  //   // }
  // ];

  const data = { nodes };

  const theme = useTheme({
    HeaderRow: `
        .th {
          border-bottom: 1px solid #a0a8ae;
          background-color:#aff886;
        }
      `,
    BaseCell: `
        &:not(:last-of-type) {
          border-right: 1px solid #a0a8ae;
        }

        padding: 8px 16px;

        background-color:#fffff2;
      `,
  });
  

  return (
    <div className="flex h-screen bg-cyan-900 text-white fixed w-full">
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
              Add Batch
            </button>
          </div>
          <hr></hr>
        </div>
        <p className=" text-4xl text-white px-8 py-2">Product Detail</p>
        <div className="h-[90vh] overflow-y-auto no-scrollbar">
          {Object.keys(product).length !== 0 && (
            <div className="text-gray-800 mb-8">
              <div className="bg-blue-900 p-6 rounded-lg shadow-lg flex justify-between space-x-4">
                <div className="flex-1 p-4 rounded-lg border border-gray-300 bg-white shadow-sm">
                  <img
                    src={product.photoUrl}
                    alt={product.brandName}
                    className="w-60 h-60 mx-auto rounded-lg object-cover my-4"
                  />
                  <h2 className="text-3xl font-semibold text-center text-blue-700 mb-4">
                    {product.drugName}
                  </h2>
                  <p className="text-lg">
                    <strong>Brand:</strong> {product.brandName}
                  </p>
                  <p className="text-lg">
                    <strong>Manufacturing Name:</strong>{" "}
                    {product.manufacturingName}
                  </p>
                  <p className="text-lg">
                    <strong>Manufacturer:</strong> {product.manufacturerName}
                  </p>
                  <div>
                    {product.letterPadDocument && 
                    <button className="inline-flex items-center gap-2 px-4 py-2 mt-3 text-white bg-orange-600 hover:bg-orange-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                      Show Letterpad
                    </button>
                    }
                  </div>
                </div>
                <div className="flex-1 p-4 rounded-lg border border-gray-300 bg-white shadow-sm">
                  <p className="text-lg">
                    <strong>Contents:</strong> {product.contents}
                  </p>
                  <p className="text-lg">
                    <strong>Division:</strong> {product.division}
                  </p>
                  <p className="text-lg">
                    <strong>Type:</strong>{" "}
                    {
                      productTypeEnum[
                        Object.keys(productTypeEnum)[product.type]
                      ]
                    }
                  </p>
                  <p className="text-lg">
                    <strong>Prescription Required:</strong>{" "}
                    {product.prescription ? "Yes" : "No"}
                  </p>
                  <p className="text-lg">
                    <strong>MRP:</strong> {product.mrp}
                  </p>
                  <p className="text-lg">
                    <strong>Retail Price:</strong> {product.retailPrice}
                  </p>
                  <p className="text-lg">
                    <strong>Selling Price:</strong> {product.sellingPrice}
                  </p>
                  <p className="text-lg">
                    <strong>License Number:</strong> {product.licenseNo}
                  </p>
                  <p className="text-lg">
                    <strong>Return Policy:</strong>{" "}
                    {product.returnPolicy.allowReturn
                      ? "Allowed"
                      : "Not Allowed"}
                  </p>
                  <p className="text-lg">
                    <strong>Exchange Policy:</strong>{" "}
                    {product.returnPolicy.allowExchange
                      ? "Allowed"
                      : "Not Allowed"}
                  </p>
                  <p className="text-lg">
                    <strong>Effective Price Calculation Type:</strong>{" "}
                    {product.effectivePriceCalculationType}
                  </p>
                  <p className="text-lg">
                    <strong>Value:</strong> {product.value}
                  </p>
                  {/* <p className="text-lg"><strong>Product Batches</strong></p> */}
                </div>
              </div>
            </div>
          )}
          <AddProductDetailModal
            isOpen={isModalOpen}
            onClose={closeModal}
            setproductDetail={setproductDetail}
            changeEffect={setEffect}
            product={product}
            showErr={showErr}
            showSucc={showSucc}
          />
          <RemoveProductDetailModal
            isOpen={isModalOpen2}
            onClose={closeModal2}
            currArt={currArt}
            changeEffect={setEffect}
            product={product}
          />
          <div className="mx-8 bg-gray-100 shadow-lg rounded-lg overflow-hidden mb-16">
            <p className="text-xl font-semibold p-4 bg-blue-800 text-white">
              Batches
            </p>
            <div className="p-4 bg-white text-black">
              <CompactTable columns={COLUMNS} data={data} theme={theme} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
