import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getProductDetails } from "../../Services/buyer";
import { decodeToken } from "../../Services/auth";
import Navbar from "./Navbar";

export default function BuyerProductDetails() {
  const location = useLocation();
  const pid = location.state.pid;
  // console.log(pid);
  const [product, setProduct] = useState(null);
  const [owner, setOwner] = useState(null);

  const user = decodeToken();
  const keys = Object.keys(user);
  const email = user[keys.find((k) => k.endsWith("emailaddress"))];

  useEffect(() => {
    getProductDetails(email, pid)
      .then((resp) => {
        setProduct(resp.productDetails);
        setOwner(resp.ownerDetails);
      })
      .then((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="h-screen flex flex-col bg-white">
      <Navbar />
      {/* {console.log(product)}
      {console.log(owner)} */}
    </div>
  );
}
