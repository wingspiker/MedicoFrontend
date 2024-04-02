import React from 'react';
import Header from './SafeComponents/Header';
import { Sidebar } from './SafeComponents/Sidebar';

const Welcome = (props) => {
  const { changeLogin } = props;

  return (
    <div className="flex h-screen bg-cyan-900 text-white">
      
      {/* <Sidebar /> Add the Sidebar component */}
      <Sidebar changeLogin={changeLogin}/>
      <div className="flex-1">
        {/* ...rest of your welcome page content */}
      </div>
    </div>
  );
};

export default Welcome;
