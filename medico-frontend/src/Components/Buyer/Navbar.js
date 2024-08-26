import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { signOut } from "../../Services/auth";
import { FaSearch } from "react-icons/fa";
import { cartLength } from "../../Services/cart";
import { BsQrCodeScan } from "react-icons/bs"; // Import the QR scan icon
import { Toaster } from "sonner";

export default function Navbar({ searchTerm, onSearchChange, onSearchSubmit }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [red, isRed] = useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {

    signOut()

    setOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/Home");
  };

  return (
    <nav className="bg-white px-4 py-2 shadow-md">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { color: `${red ? "red" : "green"}` },
        }}
      />
      <div className="container mx-auto flex justify-between items-center">
        <div
          className="text-3xl font-bold text-blue-600 cursor-pointer"
          onClick={handleLogoClick}
        >
          Medico
        </div>
        {/* <form onSubmit={onSearchSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={searchTerm}
            onChange={onSearchChange}
            className="border rounded px-2 py-1"
            placeholder="Search..."
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded flex items-center justify-center"
          >
            <FaSearch />
          </button>
        </form> */}
        <div className="flex space-x-8 items-center">
          <Link
            to="#offers"
            className="text-gray-700 hover:text-gray-900 font-medium"
          >
            Offers
          </Link>
          <Link
            to="/Home/Cart"
            className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2 relative"
          >
            <IoCartOutline className="text-3xl" />

            {cartLength() > 0 && (
              <span className=" absolute -top-2 -right-2  bg-blue-600 text-white rounded-full px-2 py-1 text-xs">
                {cartLength()}
              </span>
            )}
          </Link>
          <Link
            to="/Home/Scan" // Assuming you have a route for QR scanning
            className="text-gray-700 hover:text-gray-900 font-medium flex items-center gap-2"
          >
            <BsQrCodeScan className="text-3xl" />
          </Link>
          <button
            onClick={handleClickOpen}
            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogout} autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </nav>
  );
}
