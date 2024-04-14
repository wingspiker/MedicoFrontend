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

import { Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
export default function AdminVerify() {
  const [value, setValue] = useState(0);
  const [effect, setEffect] = useState(false);
  const [unvBuyers, setUnvBuyers] = useState([]);
  const [vBuyers, setvBuyers] = useState([]);
  const [unvCompanies, setUnvCompanies] = useState([]);
  const [vCompanies, setvCompanies] = useState([]);

  const navigate = useNavigate()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    getAllUnverifiedBuyers()
      .then((resp) => {
        setUnvBuyers(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });

    getAllVerifiedBuyers()
      .then((resp) => {
        setvBuyers(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });

    getAllUnverifiedCompanies()
      .then((resp) => {
        setUnvCompanies(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });

    getAllVerifiedCompanies()
      .then((resp) => {
        setvCompanies(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [effect]);

  const renderBuyerRow = (buyer) => {
    if (buyer === null) {
      return;
    }
    console.log('f',buyer);
    return (
      <TableRow key={buyer.id}>
        <TableCell>{buyer.displayName}</TableCell>
        <TableCell>{buyer.occupation}</TableCell>
        {/* <TableCell>{buyer.email}</TableCell> */}
        <TableCell>
          <Button variant="contained" color="primary">
            Verify
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  const renderVerBuyerRow = (buyer) => {
    if (buyer === null) {
      return;
    }
    return (
      <TableRow key={buyer.email}>
        <TableCell>{buyer.firstName + " " + buyer.lastName}</TableCell>
        <TableCell>{buyer.occupation}</TableCell>
        {/* <TableCell>{buyer.email}</TableCell> */}
        <TableCell>
          <p className=" text-2xl bg-green-200 w-fit px-3 py-1">Verified</p>
        </TableCell>
      </TableRow>
    );
  };

  const renderCompRow = (comp) => {
    if (comp === null) {
      return;
    }
    return (
      <TableRow key={comp.id}>
        <TableCell>{comp.name}</TableCell>
        <TableCell>{comp.companyEmail}</TableCell>
        {/* <TableCell>{buyer.email}</TableCell> */}
        <TableCell>
          <Button variant="contained" color="primary" onClick={handleVerify(comp.companyEmail)}>
            Verify
          </Button>
        </TableCell>
      </TableRow>
    );
  };

  const renderVerCompRow = (comp) => {
    if (comp === null) {
      return;
    }
    return (
      <TableRow key={comp.id}>
        <TableCell>{comp.name}</TableCell>
        <TableCell>{comp.companyEmail}</TableCell>
        {/* <TableCell>{buyer.email}</TableCell> */}
        <TableCell>
          <p className=" text-2xl bg-green-200 w-fit px-3 py-1">Verified</p>
        </TableCell>
      </TableRow>
    );
  };

  const handleVerify = (email) => () => {
    forceVerify(email)
    .then((res) => {
      console.log(res);
      setEffect(e=>!e)
    })
    .catch((err) => alert("Error verifying company"));
  }

  const onlogout = () => {
    signOut();
    navigate('/admin');
  }


console.log('veri buy', vBuyers); 
console.log('unveri buy', unvBuyers); 
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
      <div className=" mx-8 mt-2">
        <Box sx={{ width: "100%", bgcolor: "background.paper", overflow: "auto"  }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="admin tabs"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "#e3f2fd", // Light blue background for the tab bar
            }}
          >
            <Tab
              label="Companies"
              sx={{ textTransform: "none", color: "secondary.main" }}
            />
            <Tab
              label="Buyers"
              sx={{ textTransform: "none", color: "secondary.main" }}
            />
          </Tabs>
          {value === 1 && (
            <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Unverified Buyers</Typography>
            <TableContainer component={Paper} sx={{ mb: 4, maxHeight: 400, overflow: 'auto' }}>
              <Table aria-label="Verified Buyers">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    {/* <TableCell>Email</TableCell> */}
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vBuyers.map(renderBuyerRow)}
                </TableBody>
              </Table>
              {unvBuyers.filter(p=>p!==null).length===0 && 
                  <p className=" text-center w-full p-2 text-2xl">No data</p>
                  }
            </TableContainer>
          
            <Typography variant="h5" gutterBottom>Verified Buyers</Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
              <Table aria-label="Unverified Buyers">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    {/* <TableCell>Email</TableCell> */}
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vBuyers.map(renderVerBuyerRow)}
                </TableBody>
              </Table>
              {unvBuyers.filter(p=>p!==null).length===0 && 
                  <p className=" text-center w-full p-2 text-2xl">No data</p>
                  }
            </TableContainer>        
          </Box>
          
          )}
          {value === 0 && <Box sx={{ p: 3 }}>

          <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>Unverified Buyers</Typography>
            <TableContainer component={Paper} sx={{ mb: 4, maxHeight: 400, overflow: 'auto' }}>
              <Table aria-label="Verified Buyers">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {unvCompanies.map(renderCompRow)} 
                  
                </TableBody>
              </Table>
                {unvCompanies.filter(p=>p!==null).length===0 && 
                  <p className=" text-center w-full p-2 text-2xl">No data</p>
                  }
            </TableContainer>
          
            <Typography variant="h5" gutterBottom>Verified Companies</Typography>
            <TableContainer component={Paper} sx={{ maxHeight: 400, overflow: 'auto' }}>
              <Table aria-label="Unverified Buyers">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Company</TableCell>
                    {/* <TableCell>Email</TableCell> */}
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {vCompanies.map(renderVerCompRow)}
                  
                </TableBody>
              </Table>
              {vCompanies.filter(p=>p!==null).length===0 && 
                  <p className=" text-center w-full p-2 text-2xl">No data</p>
                  }
            </TableContainer>        
          </Box>
            
            
            </Box>}
        </Box>
      </div>
    </>
  );
}
