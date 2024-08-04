import React, { useEffect, useState } from "react";
import { cart, deleteProductFromCart, loadCart, saveMyCart, setCart } from "../../Services/cart"; // Ensure you have a removeFromCart method in your cart service
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaPlus, FaMinus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  IoRemoveCircleOutline,
  IoAddCircleOutline,
  IoTrashBin,
} from "react-icons/io5";
import SalesmanNavbar from "./SalesmanNavbar";

export default function SalesmanCart() {
  const [flag, setFlag] = useState(true);
  const [currCart, setCurrCart] = useState([]);
  const [isRed, setIsRed] = useState(true);

  useEffect(() => {
    const c = loadCart();
    setCurrCart(c);
  }, [flag]);

  const navigate = useNavigate();

  // Calculate total price
  const total = () =>
    currCart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Function to handle item deletion
  const handleDelete = (prodId, batchId) => {
    deleteProductFromCart(prodId, batchId);
    setFlag((f) => !f);
  };

  const validateCompanyNames = () => {
    if (cart.length < 1) return false;
    const companyName = currCart[0]?.companyName; // Get the companyName of the first item
    return currCart.every((item) => item.companyName === companyName);
  };

  const handleCheckout = () => {
    saveMyCart(currCart);
    setFlag((f) => !f);
    if (validateCompanyNames()) {
      navigate("/sales/Applyoffer", {
        state: { ownerEmail: cart[0].ownerEmail },
      });
    } else {
      toast.error(
        "All products must be from the same company to proceed to checkout."
      );
    }
  };

  const handleBack = () => {
    navigate("/sales");
  };

  const handleIncrease = (prodId, batchId) => {
    setCurrCart((currentCart) =>
      currentCart.map((item) =>
        item.prodId === prodId && item.batchId === batchId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrease = (prodId, batchId) => {
    setCurrCart((currentCart) => {
      // Find the item in the cart
      const item = currentCart.find(
        (i) => i.prodId === prodId && i.batchId === batchId
      );

      // If the item quantity is 1, call the delete method
      if (item && item.quantity === 1) {
        handleDelete(prodId, batchId);
        return currentCart;
      }

      // Otherwise, decrease the quantity
      return currentCart.map((item) =>
        item.prodId === prodId && item.batchId === batchId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  };

  return (
    <div className="h-screen w-screen fixed flex flex-col bg-cyan-800">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { color: `${isRed ? "red" : "green"}` },
        }}
      />
      <SalesmanNavbar />
      <div className="flex flex-1 p-6 gap-4">
        <div className="ms-12 flex-1 overflow-y-auto pr-4 bg-white p-8 shadow-md h-[88vh] overflow-auto no-scrollbar">
          <div className="flex items-center mb-4">
            <button
              onClick={() => handleBack()}
              className=" text-2xl me-4 hover:text-cyan-500"
            >
              {/* Arrow icon as content */}
              <IoMdArrowRoundBack />
            </button>

            <h2 className="text-xl font-semibold text-cyan-800">Shopping Cart</h2>
          </div>
          <div className="flex flex-col gap-4">
            {currCart.length === 0 ? (
              <p className=" text-center text-cyan-800">Your Cart is empty</p>
            ) : (
              <></>
            )}
            {currCart.map((item) => (
              <div
                key={item.prodId}
                className="p-4 bg-cyan-100 relative shadow rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between"
              >
                <span className=" absolute z-50 -top-8 right-0 rounded-full cursor-pointer hover:text-cyan-500" onClick={() => handleDelete(item.prodId, item.batchId)}>
                  <MdDelete className=" text-cyan-400 text-2xl" />
                </span>
                <div className="flex items-center mb-4 sm:mb-0">
                  <img
                    src={item.photoUrl}
                    alt={item.productName}
                    className="w-20 h-20 mr-4 object-cover rounded-full"
                  />
                  <div>
                    <h5 className="text-lg font-semibold text-cyan-800">
                      {item.productName}
                    </h5>
                    <div className="text-sm text-cyan-600">
                      <p className="font-semibold mr-4">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-cyan-600 mt-0 flex items-center border-2 rounded-lg gap-2 border-cyan-500 p-2">
                    <button
                      onClick={() => handleDecrease(item.prodId, item.batchId)}
                      className="hover:text-cyan-800"
                    >
                      {item.quantity > 1 ? (
                        <FaMinus size="24" />
                      ) : (
                        <IoTrashBin size="24" />
                      )}
                    </button>
                    <span className="font-bold mx-2 text-2xl text-cyan-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrease(item.prodId, item.batchId)}
                      className="hover:text-cyan-800"
                    >
                      <FaPlus size="24" />
                    </button>
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 bg-cyan-500 text-white px-2 py-1 text-xs font-semibold rounded-tl-lg">
                  {item.companyName}
                </span>
              </div>
            ))}
          </div>
        </div>
        {currCart.length ? (
          <div className="w-96 bg-white shadow-md p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-semibold text-cyan-800 mb-4">Price Details</h3>
              <div className="flex justify-between mb-2 text-cyan-800">
                <p>Total Price:</p>
                <p>₹ {Number(total()).toFixed(2)}</p>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded w-full"
            >
              Apply Offers
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
