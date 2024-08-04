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

export const NavLinks = [
  {
    title: "Home",
    href: "/Home",
  },
  {
    title: "Offers",
    href: "#offers",
  },
  {
    title: "Products",
    href: "/Home/Products",
  },
  {
    title: "Contact",
    href: "/Home/Contact",
  },
  {
    title: "About",
    href: "/Home/About",
  },
];

export default function Navbar({ searchTerm, onSearchChange, onSearchSubmit }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    // Place your logout logic here
    signOut();
    navigate("/login");
    setOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/Home");
  };

  return (
    <nav className="bg-white px-4 py-2 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex justify-center items-center gap-6">
          <div
            className="text-3xl font-bold text-blue-600 cursor-pointer"
            onClick={handleLogoClick}
          >
            Medico
          </div>
          {NavLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className="text-gray-700 hover:text-gray-900   hover:font-medium"
            >
              {link.title}
            </Link>
          ))}
        </div>
        <div className="flex space-x-8 items-center">
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
