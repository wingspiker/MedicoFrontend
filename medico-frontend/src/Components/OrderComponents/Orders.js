import React, { useEffect, useState } from "react";
import { decodeToken, signOut } from "../../Services/auth";
import { getOrdersByEmail } from "../../Services/orders";

export default function Orders(props) {
  const { changeLogin } = props;
  const logout = () => {
    signOut();
    changeLogin(false);
  };

  const [orders, setOrders] = useState([])
  useEffect(() => {
    const user = decodeToken();
    const keys = Object.keys(user);
    const email = user[keys.find((k) => k.endsWith("emailaddress"))];
    getOrdersByEmail(email).then(resp=>{
        setOrders(resp);
    }).catch(err=>{
        console.log(err);
    })
  }, [])
  return (
    <div className="flex h-screen bg-cyan-900 text-white">
      <div className="flex-1 ms-14">
      <div>
          <div className="p-2 flex justify-between">
          <p className=" text-3xl text-white">Orders</p>
            <button
            //   onClick={onAddOffer}
              className={`cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
            >
              Add Offer
            </button>
          </div>
          <hr />
          <div className="p-4">
            {orders && <>
                {console.log(orders)}
            </>}           
          </div>
        </div>
      </div>
    </div>
  );
}
