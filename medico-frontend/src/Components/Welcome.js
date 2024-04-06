import React, { useEffect, useState } from 'react';
import { decodeToken, signOut, showMessage } from '../Services/auth';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

const Welcome = (props) => {
  const { changeLogin, setShowSidebar } = props;  
  const navigate = useNavigate();

  const [isRed, setIsRed] = useState(true)

  useEffect(() => {
    const user = decodeToken();
    if(user.isVerified==='False'){
      toast.error('You are not verified. kindly get verified.');
      setTimeout(() => {        
        changeLogin(false)
        signOut();
      }, 3000);
    }
    if(user.isComplete==='False'){
      setShowSidebar(false)
      navigate('/complete-details')
    }
    if(showMessage){
    setIsRed(false)
      toast.success("Logged in successfully!");
    }
    setTimeout(() => {
      setIsRed(true)
    }, 6000);
  }, [])

  return (
    <div className="flex h-screen bg-cyan-900 text-white">
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
