import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { decodeToken, signOut } from "../../Services/auth";
import { Sidebar } from "../SafeComponents/Sidebar";
import { getOffers } from "../../Services/offer";

export default function Offer(props) {
  const navigate = useNavigate();
  const { changeLogin } = props;
  const [offers, setOffers] = useState([]);

  const onAddOffer = () => {
    navigate("/offer/add");
  };

  const logout = () => {
    signOut();
    changeLogin(false);
  };

  useEffect(() => {
    const user = decodeToken();
    const keys = Object.keys(user);
    const email = user[keys.find((k) => k.endsWith("emailaddress"))];
    getOffers(email)
      .then((res) => {
        console.log(res);
        setOffers(res);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex h-screen bg-cyan-900 text-white">
      <Sidebar changeLogin={logout} />
      <div className="flex-1 ms-14">
        <div>
          <div className=" p-2 flex justify-end">
            <button
              onClick={onAddOffer}
              className={` cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
            >
              Add Offer
            </button>
          </div>
          <hr></hr>
        </div>
      </div>
    </div>
  );
}
