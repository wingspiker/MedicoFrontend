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
import { FaGift } from "react-icons/fa";
import { RiMedicineBottleFill } from "react-icons/ri";
import { NavLink, useLocation } from "react-router-dom";
import { FaAngleRight } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";

const navItems = [
  {
    label: "Accounts",
    icon: <MdOutlineManageAccounts />,
    link: "/admin/Accounts",
    subItems: [
      { label: "Company", link: "/admin/Company" },
      { label: "Buyer", link: "/admin/Buyer" },
    ],
  },
  {
    label: "Subscription",
    icon: <MdSubscriptions />,
    link: "/admin/Subscription",
    subItems: [
      { label: "Percentage", link: "/admin/SubscriptionPercentage" },
      { label: "Plan", link: "/admin/SubscriptionPlan" },
    ],
  },
  {
    label: "Product",
    icon: <RiMedicineBottleFill />,
    link: "/admin/Product",
  },
  { label: "Groups", icon: <MdGroups />, link: "/admin/Groups" },
  { label: "Offers", icon: <BiSolidOffer />, link: "/admin/Offers" },
  { label: "Article", icon: <FaGift />, link: "/admin/Article" },
  { label: "Orders", icon: <BsFillCartCheckFill />, link: "/admin/Orders" },
  { label: "Salesman", icon: <BsFillCartCheckFill />, link: "/admin/Salesman" },
  {
    label: "Analysis",
    icon: <BsFillSignIntersectionYFill />,
    link: "/admin/Analysis",
  },
  { label: "Settings", icon: <IoSettingsSharp />, link: "/admin/Settings" },
];

export const AdminSidebar = ({ changeLogin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const sidebarWidth = isOpen ? "w-64" : "w-14";
  const logoVisibility = isOpen ? "visible" : "hidden";

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const location = useLocation();
  const path = location.pathname

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 overflow-visible ${isOpen ? " bg-cyan-700" : "bg-black bg-opacity-30"} text-white transition-all duration-300 ease-in-out ${sidebarWidth} rounded-xl rounded-l-none`}
    >
      {/* Modal */}
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
          className={`flex items-center justify-between px-2 py-2 border-b border-gray-200 ${isOpen ? "bg-cyan-800" : "bg-black bg-opacity-20"}`}
        >
          <div className={`flex items-center gap-3 ${logoVisibility}`}>
            {/* <img
              src="/medico-logo.png"
              alt="Medico Logo"
              className="w-12 h-10"
            /> */}
            <h1 className="text-3xl font-bold text-white">Medico <p className=" text-red-500 text-xs text-right -me-6 -mt-2">Admin</p> </h1>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl h-10"
          >
            {isOpen ? <IoCloseSharp /> : <HiMenuAlt1 />}
          </button>
        </div>
        <nav className="flex-1 mt-2">
          {navItems.map((item) => (
            <React.Fragment key={item.label}>
              <div className="relative group">
                {!item.subItems ? <NavLink
                  to={item.link}
                  className={`px-4 py-2 rounded hover:bg-cyan-800 text-xl flex items-center gap-4 ${path===item.link?'bg-white text-cyan-800 hover:bg-slate-300':''}`}
                >
                  {item.icon} {isOpen ? item.label : ""}
                </NavLink>:
                <p                
                className="px-4 py-2 rounded hover:bg-cyan-800  text-xl flex items-center gap-4"
              >
                {item.icon} {isOpen ? item.label : ""}
              </p>

                }
                {item.subItems && (
                  <div className="absolute left-full top-0 w-48 bg-white text-cyan-800 font-semibold rounded hidden group-hover:flex flex-col">
                    {item.subItems.map((sub) => (
                      <>
                      <NavLink
                        key={sub.label}
                        to={sub.link}
                        className="px-4 py-2 hover:bg-slate-300 text-cyan-600 text-lg flex justify-between"
                      >
                        <span>{sub.label}</span>
                        <span className=" flex items-center"> <FaAngleRight /> </span>
                        
                      </NavLink>
                      <hr/>
                      </>
                    ))}
                  </div>
                )}
              </div>
            </React.Fragment>
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
