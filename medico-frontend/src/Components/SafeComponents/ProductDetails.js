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

const AddProductDetailModal = ({
  isOpen,
  onClose,
  setproductDetail,
  changeEffect,
  product,
  showSucc,
  showErr
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
        showSucc('Batch Added Successfully')
        onClose();
        reset();
      })
      .catch((err) => {
        console.log(err);
        showErr('Error adding batch', err)
        setLoading(false);
      });
  };

  useEffect(() => {
    setValue("price", product.sellingPrice);
  }, [product]);

  return (
    <div
      className={`fixed inset-0  flex items-center justify-center bg-black bg-opacity-75  ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white text-black p-4 rounded-md mx-4 md:w-4/12">
        <form onSubmit={handleSubmit(onsubmit)}>
          <p className="text-lg text-cyan-900 mb-6">Add Batch - {product.drugName} </p>
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
    setIsRed(true)
    toast.error(msg)
  }
  const showSucc = (msg) => {
    setIsRed(false)
    toast.success(msg)
  }

  const history = useLocation();

  const logout = () => {
    signOut();
    changeLogin(false);
  };

  const onAddProduct = () => {
    navigate("/Product/add");
  };

  const [product, setProduct] = useState({});

  useEffect(() => {
    getProductById(history.state)
      .then((res) => {
        console.log('prodd');
        console.log(res);
        setProduct(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
          style: { color: `${isRed?'red':'green'}`},
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
        <div className=" h-[90vh] overflow-y-auto no-scrollbar">
          {Object.keys(product).length != 0 && (
            <p className=" text-white text-lg ">
              <div className="medicine-info bg-cyan-900 text-white text-sm p-4 rounded-md flex justify-between ">
                <div className="w-1/3 m-4 rounded-md border border-solid p-4">
                  <img
                    src={product.photoUrl}
                    alt={product.brandName}
                    className="my-4 w-60 mx-auto h-60 object-cover rounded-md bg-white"
                  />
                  <h2 className="text-2xl text-center mb-4">
                    Drug Name : {product.drugName}
                  </h2>
                  <div className="">Brand Name: {product.brandName}</div>
                  <div className="">
                    Manufacturing Name: {product.manufacturingName}
                  </div>
                  <div>Manufacturer Name: {product.manufacturerName}</div>

                  <div>
                    Letterpad Document: {product.letterPadDocument}
                    <button
                      className={` my-2 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
                    >
                      Show Letterpad
                    </button>
                  </div>
                </div>
                <div className="w-2/3 m-4 rounded-md border border-solid p-4">
                  <div>Contents: {product.contents}</div>
                  <div>Division: {product.division}</div>
                  <div>
                    Type:{" "}
                    {
                      productTypeEnum[
                        Object.keys(productTypeEnum)[product.type]
                      ]
                    }
                  </div>
                  <div>
                    Prescription Required: {product.prescription ? "Yes" : "No"}
                  </div>
                  <div>MRP: {product.mrp}</div>
                  <div>Retail Price: {product.retailPrice}</div>
                  <div>Selling Price: {product.sellingPrice}</div>
                  <div>License Number: {product.licenseNo}</div>

                  <div>
                    Return Policy:{" "}
                    {product.returnPolicy.allowReturn
                      ? "Allow Return"
                      : "No Return Allowed"}
                  </div>
                  <div>
                    Exchange Policy:{" "}
                    {product.returnPolicy.allowExchange
                      ? "Allow Exchange"
                      : "No Exchange Allowed"}
                  </div>

                  <div>
                    Effective Price Calculation Type:{" "}
                    {product.effectivePriceCalculationType}
                  </div>
                  <div>Value: {product.value}</div>
                  <div>product Batches</div>
                </div>
              </div>
            </p>
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
        </div>
      </div>
    </div>
  );
}
