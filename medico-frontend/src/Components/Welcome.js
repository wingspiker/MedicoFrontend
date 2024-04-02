// Welcome.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './SafeComponents/Header';


const Welcome = (props) => {
  const {changeLogin} = props
  return (
    <>
    <div className='bg-cyan-900 h-screen text-white'>
    <Header changeLogin={changeLogin}/>
    </div>
    </>
  );
}

export default Welcome;
