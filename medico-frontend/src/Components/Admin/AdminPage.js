import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isAdmin, loginService } from "../../Services/auth";
import Loader from "../../Loader";
import { Toaster, toast } from "sonner";

export default function AdminPage(props) {
  const { setIsAdminLoggedIn } = props;
  // State for form fields
  const [loading, setloading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // State for form errors
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

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
        })
        .catch((err) => {
          console.log(err);
          showErr(err.response.data.detail)
          setloading(false);
        });
      setEmail("");
      setPassword("");
    }
  };

  const [isRed, setIsRed] = useState(true);

  const showSucc = (message) => {
    setIsRed(false);
    toast.success(message)
  };

  const showErr = (message) => {
    setIsRed(true);
    toast.error(message)
  };

  return (
    <div className="bg-cyan-900 h-screen text-white flex flex-col justify-center items-center">
      <Toaster
            position="top-center"
            toastOptions={{
              style: { color: `${isRed ? "red" : "green"}` },
            }}
          />
        
      <header className="flex justify-between items-center w-full px-8 py-4 absolute top-0">
        <h1 className="text-3xl font-bold">
          Medico{" "}
          <span className="text-sm absolute bottom-2 text-red-500">Admin</span>{" "}
        </h1>
        
      </header>
      <div className="flex justify-center items-center flex-grow">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl mb-4 font-bold text-gray-800">Admin Login</h2>
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
                className="block w-full px-4 py-2 border text-gray-900 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
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
                className="block w-full px-4 py-2 border text-gray-900 border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-indigo-600"
            >
              {loading ? <Loader /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
