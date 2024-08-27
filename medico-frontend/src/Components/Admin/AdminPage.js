import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { isAdmin, loginService } from "../../Services/auth";
import Loader from "../../Loader";
import { Toaster, toast } from "sonner";
import Button from "../Global/Button";
import { FaLock } from "react-icons/fa";

export default function AdminPage(props) {
  const { setIsAdminLoggedIn } = props;
  // State for form fields
  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State for form errors
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const setting = location?.state?.setting;
    if(setting){
      console.log('main yaha');
      navigate('')
    }  
  }, [])

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    }

    if (!password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Perform login logic here
      // For demonstration purposes, just logging the email and password
      setloading(true);
      const postData = { email, password };
      loginService(postData)
        .then((resp) => {
          console.log(resp);
          localStorage.setItem("token", resp.accessToken);
          setloading(false);
          if (isAdmin()) {
            setIsAdminLoggedIn(true);
            navigate("/admin/dashboard");
          } else {
            showErr("You are not authorized to view the admin panel");
          }
          setEmail("");
          setPassword("");
          
        })
        .catch((err) => {
          console.log(err);
          showErr(err.response.data.detail);
          setloading(false);
          setEmail("");
          setPassword("");
                
        });
      
    }
  };

  const [isRed, setIsRed] = useState(true);

  const showSucc = (message) => {
    setIsRed(false);
    toast.success(message);
  };

  const showErr = (message) => {
    setIsRed(true);
    toast.error(message);
  };

  return (
    <div className="bg-gradient-to-t from-cyan-50 to-cyan-300 h-screen text-black flex flex-col justify-center items-center">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { color: `${isRed ? "red" : "green"}` },
        }}
      />

      <header className="flex justify-between items-center w-full px-8 py-4 absolute top-0">
        <div className="flex gap-2">
          <h1 className="text-2xl font-bold text-cyan-700">Medico </h1>
          <span className="text-2xl font-bold text-slate-600">admin</span>{" "}
        </div>
      </header>
      <div className=" flex justify-center items-center bg-white p-8 rounded-2xl shadow-lg  gap-5">
        <div className="h-full w-[300px] flex justify-between flex-col gap-4">
          <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
          <div className="flex justify-center items-center h-full">
            <div className="bg-cyan-200 rounded-3xl p-5 flex justify-center items-center gap-4 h-full">
              <FaLock className="text-6xl text-cyan-600" />
              <p>
                Welcome to the admin panel. Please login with your credentials
              </p>
            </div>
          </div>
        </div>
        <div className="">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-gray-800 font-medium"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="block w-[300px] px-4 py-2 border text-gray-900 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
              {errors.email && <p className="text-red-500">{errors.email}</p>}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-gray-800 font-medium"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="block w-[300px] px-4 py-2 border text-gray-900 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full text-center bg-cyan-200 text-cyan-600 font-semibold hover:bg-cyan-300"
            >
              {loading ? <Loader /> : "Login"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
