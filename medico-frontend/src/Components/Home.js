import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { formdata, setCurrStep, setFormData } from "../Services/auth";

const Home = () => {
  return (
    <div className="bg-cyan-900 h-screen text-white flex flex-col justify-center items-center">
      <header className="flex justify-between items-center w-full px-8 py-4 absolute top-0">
        <h1 className="text-3xl font-bold">Medico </h1>
        <div>
          <Link
            to="/login"
            className="bg-blue-100 hover:bg-blue-200 text-blue-600 font-bold py-2 px-4 rounded-full mr-4"
          >
            Login
          </Link>
          <Link
            onClick={() => {
              setCurrStep(1);
              setFormData(formdata);
            }}
            to="/register"
            className="bg-green-100 hover:bg-green-200 text-green-600 font-bold py-2 px-4 rounded-full"
          >
            Register
          </Link>
        </div>
      </header>
      <div className="flex justify-center items-center">
        <img src="medico-logo.png" alt="Medico Logo" className="w-64 h-64" />
      </div>
    </div>
  );
};

export default Home;
