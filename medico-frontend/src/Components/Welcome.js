import React, { useEffect, useState } from 'react';
import { decodeToken, signOut, showMessage, setMessage, } from '../Services/auth';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import { Sidebar } from './SafeComponents/Sidebar';



const Welcome = (props) => {
  const { changeLogin, setShowSidebar } = props;  
  const navigate = useNavigate();

  const logout = () => {
    signOut();
    changeLogin(false)
  };

  const [isRed, setIsRed] = useState(true)

  useEffect(() => {
    
    if(showMessage){
    setIsRed(false)
      toast.success("Logged in successfully!", {autoClose: 1000});
    }
    setTimeout(() => {
      setIsRed(true)
      setMessage(false)
    }, 6000);
  }, [])

  return (
    <div className="flex h-screen bg-cyan-900 text-white">
      <Sidebar changeLogin={logout}  />
      <div className="flex-1">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { color: `${isRed?'red':'green'}`},
        }}
      />
        
      </div>
    </div>
  );
};

export default Welcome;
