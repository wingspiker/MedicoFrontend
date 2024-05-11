import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Sidebar } from "./Sidebar";
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

export default function AdminLanding() {
    const navigate = useNavigate();

    const onlogout = () => {
      signOut();
      navigate("/admin");
    };
  
    return (
      <>
        <div className=" p-4 flex justify-between ms-12">
        <h1 className="text-3xl font-bold text-white">Medico <p className=" text-red-500 text-sm text-right -me-6 -mt-2">Admin</p> </h1>
          <button
            onClick={onlogout}
            className=" bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-indigo-600"
          >
            Logout
          </button>
        </div>
        <hr />
        <Sidebar changeLogin={onlogout} />
      </>
    );
}
