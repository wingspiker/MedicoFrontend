import React, { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoCloseSharp, IoLogOut } from "react-icons/io5";
import { MdHome, MdGroups, MdLocalOffer } from "react-icons/md";
import { SiProducthunt } from "react-icons/si";
import { BiSolidOffer } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

const navItems = [
  "Home",
  "Product",
  "Group",
  "Offer",
  "Salesman",
  "Order",
  "Profile",
];
const navItemsIcons = [
  <MdHome />,
  <SiProducthunt />,
  <MdGroups />,
  <BiSolidOffer />,
  <MdLocalOffer />,
  <BsFillCartCheckFill />,
  <FaUserCircle />,
];

export const Sidebar = (props) => {
  const { changeLogin } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const sidebarWidth = isOpen ? "w-64" : "w-14";
  const buttonText = isOpen ? <IoCloseSharp /> : <HiMenuAlt1 />;

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 overflow-hidden ${
        isOpen ? " bg-cyan-700" : "bg-black bg-opacity-30"
      }  text-white transition-all duration-300 ease-in-out ${sidebarWidth} rounded-xl rounded-l-none`}
    >
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0  flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md w-4/12">
            <p className="text-lg text-cyan-900">Are you sure you want to sign out?</p>
            <div className="mt-4 flex justify-end gap-4">
              
              <button
                onClick={toggleModal}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
              >
                Stay signed in
              </button>
              <button
                onClick={() => {
                  changeLogin(false);
                }}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md mr-2"
              >
                Yes, sign out
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col h-full">
        <div
          className={`flex items-center justify-between px-2 py-2 border-b border-gray-200 ${
            isOpen ? "bg-cyan-800" : "bg-black bg-opacity-20  "
          } `}
        >
          {isOpen ? (
            <div className=" flex items-center gap-3">
              <img
                src="medico-logo.png"
                alt="Medico Logo"
                className="w-10 h-10"
              />
              <h1 className="text-3xl font-bold">Medico</h1>
            </div>
          ) : (
            ""
          )}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center h-10 text-3xl rounded-md text-white hover:text-cyan-600 focus:outline-none"
          >
            {buttonText}
          </button>
        </div>
        <nav className="flex-1 mt-2">
          {navItems.map((item, index) => (
            <NavLink
              to={`/${item}`}
              key={item}
              className="px-4 py-2 rounded hover:bg-cyan-800 text-xl flex items-center gap-4"
            >
              {navItemsIcons[index]} {isOpen ? item : ""}
            </NavLink>
          ))}

          <div className={`absolute bottom-4 w-full flex justify-end px-1`}>
            <button
              onClick={toggleModal}
              className={`${
                isOpen ? "mx-4 w-full" : "me-2"
              } cursor-pointer bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}
            >
              <IoLogOut /> {isOpen ? "Logout" : ""}
            </button>
          </div>
        </nav>
      </div>
    </aside>
  );
};
