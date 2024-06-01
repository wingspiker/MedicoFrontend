import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { filterProducts } from "../../Services/buyer";
import { decodeToken } from "../../Services/auth";
import Navbar from "./Navbar";

export default function BuyerListing() {
    const [products, setProducts] = useState([])
  const location = useLocation();

  const search = location?.state?.search ?? "";

  const user = decodeToken();
  const keys = Object.keys(user);
  const email = user[keys.find((k) => k.endsWith("emailaddress"))];

  useEffect(() => {
    filterProducts(email, search).then(resp=>{
        setProducts(resp)
    })
  }, [search]);

  return <div className=" h-screen bg-white">
    <Navbar/>
  </div>;
}
