import React, { useState } from "react";
import { HiMenuAlt1 } from "react-icons/hi";
import { IoCloseSharp, IoLogOut } from "react-icons/io5";
import {
  MdOutlineManageAccounts,
  MdSubscriptions,
  MdGroups,
} from "react-icons/md";
import { BiSolidOffer } from "react-icons/bi";
import {
  BsFillCartCheckFill,
  BsFillSignIntersectionYFill,
} from "react-icons/bs";
import { FaUserCircle, FaGift } from "react-icons/fa";
import { RiMedicineBottleFill } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Accounts", icon: <MdOutlineManageAccounts />, link: "/Accounts" },
  {
    label: "Subscription",
    icon: <MdSubscriptions />,
    link: "#",
    subItems: [
      { label: "Percentage", link: "#" },
      { label: "plan", link: "#" },
    ],
  },
  {
    label: "Companies",
    icon: <RiMedicineBottleFill />,
    link: "#",
    subItems: [
      { label: "Self Selling", link: "#" },
      { label: "Admin Selling", link: "#" },
    ],
  },
  { label: "Groups", icon: <MdGroups />, link: "/Groups" },
  { label: "Offers", icon: <BiSolidOffer />, link: "/Offers" },
  { label: "Article", icon: <FaGift />, link: "/Article" },
  { label: "Orders", icon: <BsFillCartCheckFill />, link: "/Orders" },
  {
    label: "Analysis",
    icon: <BsFillSignIntersectionYFill />,
    link: "/Analysis",
  },
  { label: "Profile", icon: <FaUserCircle />, link: "/Profile" },
];

export const Sidebar = ({ changeLogin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const sidebarWidth = isOpen ? "w-64" : "w-14";
  const buttonText = isOpen ? <IoCloseSharp /> : <HiMenuAlt1 />;

  const toggleModal = () => setShowModal(!showModal);

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 overflow-hidden ${
        isOpen ? " bg-cyan-700" : "bg-black bg-opacity-30"
      } text-white transition-all duration-300 ease-in-out ${sidebarWidth} rounded-xl rounded-l-none`}
    >
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md mx-4 md:w-4/12">
            <p className="text-lg text-cyan-900">
              Are you sure you want to sign out?
            </p>
            <div className="mt-4 flex justify-end gap-4">
              <button
                onClick={toggleModal}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
              >
                Stay signed in
              </button>
              <button
                onClick={() => changeLogin(false)}
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
          className={`flex items-center justify-between px-2 py-5 border-b border-gray-200 ${
            isOpen ? "bg-cyan-800" : "bg-black bg-opacity-20 "
          }`}
        >
          {isOpen && (
            <div className="flex items-center gap-3">
              <img
                src="medico-logo.png"
                alt="Medico Logo"
                className="w-12 h-10"
              />
              <h1 className="text-3xl font-bold">
                Medico{" "}
                <p className="text-red-500 text-sm text-right -me-6 -mt-2">
                  Admin
                </p>
              </h1>
            </div>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center h-10 text-3xl rounded-md text-white hover:text-cyan-600 focus:outline-none"
          >
            {buttonText}
          </button>
        </div>
        <nav className="flex-1 mt-2">
          {navItems.map((item) => (
            <React.Fragment key={item.label}>
              <div className="relative group ">
                {" "}
                {/* Parent element with group class */}
                <NavLink
                  to={item.link}
                  className="px-4 py-2 rounded hover:bg-cyan-800 text-xl flex items-center gap-4"
                >
                  {item.icon} {isOpen ? item.label : ""}
                </NavLink>
                {item.subItems && (
                  <div className="group-hover:flex group-hover:flex-col w-full ms-8 bg-cyan-800 rounded hidden">
                    {item.subItems.map((sub) => {
                      console.log(sub);
                      return (
                        <NavLink
                          key={sub.label}
                          to={sub.link}
                          className="px-4 py-2 hover:bg-cyan-900 text-white text-xl"
                        >
                          {sub.label}
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </nav>
      </div>
    </aside>
  );
};
