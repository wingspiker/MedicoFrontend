import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {
  forceVerify,
  getAllUnverifiedBuyers,
  getAllUnverifiedCompanies,
  getAllVerifiedBuyers,
  getAllVerifiedCompanies,
  signOut,
} from "../../Services/auth";

import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
export default function AdminVerify() {
  const navigate = useNavigate();

  const onlogout = () => {
    signOut();
    navigate("/admin");
  };

  return (
    <>
      <div className=" p-4 flex justify-between">
        <h1 className=" text-3xl text-white font-bold ">Medico</h1>
        <button
          onClick={onlogout}
          className=" bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-indigo-600"
        >
          Logout
        </button>
      </div>
      <hr />
    </>
  );
}
