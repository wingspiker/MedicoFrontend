import React, { useState } from 'react';
import { HiMenuAlt1 } from "react-icons/hi";
import { IoCloseSharp, IoLogOut  } from "react-icons/io5";
import { MdHome, MdGroups, MdLocalOffer } from "react-icons/md";
import { SiProducthunt } from "react-icons/si";
import { BiSolidOffer } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { BsFillCartCheckFill } from "react-icons/bs";
// import logo from './logo.svg'; // Update the path as necessary

const navItems = ['Home', 'Product', 'Group', 'Offer', 'Salesman', 'Order', 'Profile']; 
const navItemsIcons = [<MdHome/>, <SiProducthunt />, <MdGroups/>, <BiSolidOffer />, <MdLocalOffer />, <BsFillCartCheckFill />, <FaUserCircle/>]; 

export const Sidebar = (props) => {
    const { changeLogin } = props;
  const [isOpen, setIsOpen] = useState(false);

  const sidebarWidth = isOpen ? 'w-64' : 'w-14';
  const buttonText = isOpen ? <IoCloseSharp /> : <HiMenuAlt1 />;

  return (
    <aside className={`fixed inset-y-0 left-0 z-30 overflow-hidden bg-black bg-opacity-30 text-white transition-all duration-300 ease-in-out ${sidebarWidth}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
            {
                isOpen?                
                <div className=' flex items-center gap-2'>
                    <img src="https://images.vexels.com/media/users/3/142777/isolated/lists/84711206e52e0d4ff6c793cb476ea264-heartbeat-star-medical-logo.png" alt="Medico Logo" className="w-10 h-10" />
                    <h1 className='text-3xl font-bold'>Medico</h1>
                </div>:''
            }
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-center h-10 text-3xl rounded-md text-white hover:text-cyan-600 focus:outline-none"
          >
            {buttonText}
          </button>
        </div>
        <nav className="flex-1 mt-2">
          {navItems.map((item, index) => (
            <a
              key={item}
            //   href={`/${}`}
              className="block px-4 py-2 rounded hover:bg-purple-800 text-xl flex items-center gap-4"
            >
             {navItemsIcons[index]} { isOpen? item:''}
            </a>
          ))}

          <div className={`absolute bottom-4 w-full flex justify-end px-1`}>

            <button onClick={()=>{changeLogin(false)}} className={`${isOpen?'me-4':'me-2'} bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-2 rounded flex items-center gap-2`}>
               <IoLogOut /> {isOpen?'Logout':''}
                
            </button>
          </div>

        </nav>

      </div>
        
    </aside>
  );
};
