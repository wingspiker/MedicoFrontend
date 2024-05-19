import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { signOut, decodeToken, isCompanySelf, isAdmin } from "../../Services/auth";
import { getProductById } from "../../Services/product";
import { CustomInput, CustomTextArea } from "../OfferComponents/Input";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useForm } from "react-hook-form";
import Loader from "../../Loader";
import { productTypeEnum } from "../../Models/enums.model";
import { addBatch, editBatch } from "../../Services/batch";
import { Toaster, toast } from "sonner";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/compact";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import CircularProgress from '@mui/material/CircularProgress';
import { AdminSidebar } from "../Admin/AdminSidebar";

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
    getProductById(history.state.pid)
      .then((res) => {
        // console.log(res);

        if (isCompanySelf() || isAdmin()) {
          // console.log('yes');
          let batches = res.productBatches;
          let b = batches.map((p, i) => {
            return { ...p, index: i + 1, isEditable: false };
          });
          setNodes(b);
        }
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

  const handlePriceChange = (e, item) => {
    const newPrice = e.target.value;
    const updatedItems = nodes.map((i) => {
      if (i.id === item.id) {
        return { ...i, price: newPrice };
      }
      return i;
    });
    setNodes(updatedItems);
  };

  const handleIsVisibleChange = (e, item) => {
    const newIsVisible = e.target.checked;
    const updatedItems = nodes.map((i) => {
      if (i.id === item.id) {
        return { ...i, isVisible: newIsVisible };
      }
      return i;
    });
    setNodes(updatedItems);
  };

  const [isLoading, setIsLoading] = useState(false)

  const saveBatchChanges = (item) => {
    // console.log(item);
    setIsLoading(true)

    const {manufacturingDate, id, expiryDate, isVisible, isSold, price, quantity} = item;
    const updatedBatch = {id, manufacturingDate, expiryDate, quantity, price, isSold, isVisible}

    

    editBatch(updatedBatch)
    .then(r=>{
      console.log(r);
      setFl(f=>!f)
      setIsLoading(false)
    })
    .catch(err=>{
      console.log(err);
      setIsLoading(false)
    })
    // Call the API to save changes
    // After saving, set isEditable to false for the item
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
    {
      label: "Price",
      renderCell: (item) => {
        if (item.isEditable) {
          return (
            <TextField
              type="text"
              value={item.price}
              onChange={(e) => handlePriceChange(e, item)}
              label="Price"
              variant="filled"
            />
          );
        }
        return (
          "₹ " + Number(item.price).toPrecision(String(item.price).length + 2)
        );
      },
    },
    {
      label: "Is Sold",
      renderCell: (item) =>
        item.isSold ? (
          <p className=" text-green-500 font-semibold">Yes</p>
        ) : (
          <p className=" text-red-500 font-semibold">No</p>
        ),
    },
    {
      label: "Is Visible",
      renderCell: (item) =>
        item.isEditable ? (
          <Checkbox
            checked={item.isVisible}
            onChange={(e) => handleIsVisibleChange(e, item)}
          />
        ) : item.isVisible ? (
          <p className=" text-green-500 font-semibold">Yes</p>
        ) : (
          <p className=" text-red-500 font-semibold">No</p>
        ),
    },
    {
      label: "Action",
      renderCell: (item) =>
        item.isEditable ? (
          <button
            onClick={() => saveBatchChanges(item)}
            className=" cursor-pointer bg-green-500 hover:bg-green-600 text-white font-bold rounded p-1 flex items-center gap-2"
          >
            {isLoading?<CircularProgress />:'Save'}
            {/* Save */}
          </button>
        ) : (
          <button
            onClick={() => {
              item.isEditable = true;
              setNodes([...nodes]);
            }}
            className=" cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold p-1 rounded flex items-center gap-2"
          >
            Edit
          </button>
        ),
    },
  ];

  const [nodes, setNodes] = useState([]);

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
      {
        isAdmin()?<AdminSidebar changeLogin={logout}/>:<Sidebar changeLogin={logout}/>}
      <div className="flex-1 ms-14">
        <div>
          <div className={" p-2 flex justify-end gap-4 h-14"}>
            {(isCompanySelf() || isAdmin()) && (
              <button
                onClick={openModal}
                className={` cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
              >
                Add Batch
              </button>
            )}
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
                    {product.letterPadDocument && (
                      <button className="inline-flex items-center gap-2 px-4 py-2 mt-3 text-white bg-orange-600 hover:bg-orange-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50">
                        Show Letterpad
                      </button>
                    )}
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
          {(isCompanySelf() || isAdmin()) && (
            <div className="mx-8 bg-gray-100 shadow-lg rounded-lg overflow-hidden mb-16">
              <p className="text-xl font-semibold p-4 bg-blue-800 text-white">
                Batches
              </p>

              <div className="p-4 bg-white text-black">
                <CompactTable columns={COLUMNS} data={data} theme={theme} />
              </div>
              {/* {console.log(data)} */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
