import React, { useState } from "react";
import { loginService } from "../Services/auth";

import {useNavigate} from 'react-router-dom'

const Login = (props) => {
  const {changeLogin} = props
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const validateEmail = (email) => {
    if (!email.trim()) {
      return "Email is required";
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return "Invalid email address";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password.trim()) {
      return "Password is required";
    } else if (password.length < 6) {
      return "Password must be at least 6 characters";
    }
    return "";
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: validateEmail(e.target.value) });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: validatePassword(e.target.value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };

    setErrors(newErrors);

    if (Object.keys(newErrors).every((key) => !newErrors[key])) {
      setLoading(true); // Set loading to true when form is submitted
      const loginData = {
        email: email,
        password: password,
      };

      loginService(loginData)
        .then((response) => {
          console.log(response);
          setLoading(false); // Set loading to false after API response
          // Handle successful login response
          console.log("rrr");
          changeLogin(true)
          navigate('/welcome')
          
        })
        .catch((error) => {
          console.error(error);
          setLoading(false); // Set loading to false after API response
          // Handle error response
          setErrors({ ...errors, common: error.response.data.detail });
          setEmail('');
          setPassword('')
        });
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-cyan-900">
      <div className="max-w-md w-full mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                className={`block w-full p-2.5 text-gray-900 bg-gray-50 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:border-primary-500 focus:ring-primary-500 sm:text-sm`}
                placeholder="Enter Email"
                value={email}
                onChange={handleEmailChange}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className={`block w-full p-2.5 text-gray-900 bg-gray-50 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:border-primary-500 focus:ring-primary-500 sm:text-sm`}
                value={password}
                onChange={handlePasswordChange}
                placeholder="Enter Password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
            <button
              type="submit"
              className="block mx-auto w-full px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-500 hover:bg-blue-600 rounded-lg sm:w-auto hover:bg-primary-700 focus:ring-4 focus:ring-primary-300 relative" // Added relative class
            >
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-cyan-900 opacity-50">
                  <div className="loader ease-linear rounded-full border-4  h-6 w-6 border-gradient-to-r from-green-300 to-gray-400"></div>
                </div>
              )}
              Login
            </button>
          </form>

          {errors.common && (
            <p className="text-red-500 text-sm mt-1">{errors.common}</p>
          )}
        </div>
        <div className="text-center mt-4 text-sm text-gray-300">
          Don't have an account?{" "}
          <a
            href="/register"
            className="text-primary-600 hover:text-primary-400"
          >
            Go to signup
          </a>
        </div>
      </div>
    </section>
  );
};

export default Login;
