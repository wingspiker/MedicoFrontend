import React, { useEffect, useState } from "react";
import {
  decodeToken,
  signOut,
  showMessage,
  setMessage,
  loginService,
  setCurrStep,
  setFormData,
  formdata,
  initialData,
  setIsBuyer,
  isBuyer,
} from "../Services/auth";
import { Toaster, toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { IoClose } from "react-icons/io5";
import Textv1 from "./Global/Textv1";
import CustomButton from "./Global/Button";
// import env from 'react-dotenv'

const Login = (props) => {
  // console.log(env);

  // useEffect(() => {
  //   console.log("useEffect");
  // }, [])

  const { changeLogin, setShowSidebar } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isRed, setIsRed] = useState(true);

  const navigate = useNavigate();

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
          // debugger;
          // console.log(response);

          // Handle successful login response

          localStorage.setItem("token", response.accessToken);
          setMessage(true);
          const user = decodeToken();
          if (user?.userType === "Salesman") {
            changeLogin(true);
            navigate("/sales");
            return;
          }
          // console.log(user);
          const keys = Object.keys(user);
          const role = keys.find((claim) => claim.endsWith("role"));
          if (user[role] === "Admin") {
            toast.error(
              "You are not authorized to login here. kindly login to admin panel."
            );
            signOut();
            return;
          }
          if (user.isComplete === "False") {
            setShowSidebar(false);
            setFormData({ ...formdata, email: loginData.email });
            if (user[role] === "Buyer") {
              setFormData({ ...formdata, role: 0 });
              setIsBuyer(true);
            }
            if (user[role] === "Company") {
              setFormData({ ...formdata, role: 1 });
              setIsBuyer(false);
            }
            navigate("/register");
            setCurrStep(3);
          } else if (user.isVerified === "False") {
            toast.error("You are not verified. kindly get verified.");
            signOut();
          } else {
            // if(user[role]==="Buyer"){
            //   signOut()
            //   navigate('/');
            //   setFormData({...formdata, email:''})
            //   setCurrStep(1)
            //   return
            // }

            if (user[role] === "Buyer") {
              navigate(0);
              setTimeout(() => {
                navigate("/Home");
              }, 100);
              return;
            }
            changeLogin(true);
            setShowSidebar(true);
            console.log(user);
            // navigate(0)
            // debugger;
            if (user.isPaymentPending === "True") {
              navigate("/company/CompletePayment");
              return;
            } else {
              setTimeout(() => {
                navigate("/company/Home");
                navigate(0);
                setLoading(false); // Set loading to false after API response
              }, 2500);
            }
          }
        })
        .catch((error) => {
          console.error(error);
          setLoading(false); // Set loading to false after API response
          // Handle error response
          setErrors({ ...errors, common: error.response.data.detail });
          toast.error(error.response.data.detail);
          setEmail("");
          setPassword("");
        });

      // Remove this
      // changeLogin(true)
      // navigate('/welcome')
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <section className="h-screen flex items-center justify-center bg-gradient-to-b from-cyan-300 via-cyan-50 to-cyan-50">
      <div className="max-w-2xl md:w-full mx-auto">
        <div className="bg-white p-8 rounded-2xl shadow-md relative">
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-cyan-700"
            onClick={handleClose}
          >
            {" "}
            {/* Positioning close button */}
            <IoClose className="text-3xl" /> {/* Close icon */}
          </button>

          <h2 className="text-4xl  mb-6">
            <Textv1>Login</Textv1>
          </h2>

          <div className="flex gap-4">
            <div className="w-full flex justify-center items-center text-center gap-3">
              <p className="bg-cyan-50 border text-sm text-cyan-800 font-semibold rounded-2xl py-4 px-2 mb-4">
                ───▄▀▀▀▄▄▄▄▄▄▄▀▀▀▄─── ───█▒▒░░░░░░░░░▒▒█───
                ────█░░█░░░░░█░░█──── ─▄▄──█░░░▀█▀░░░█──▄▄─
                █░░█─▀▄░░░░░░░▄▀─█░░█ █▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀█
                █░░╦─╦╔╗╦─╔╗╔╗╔╦╗╔╗░░█ █░░║║║╠─║─║─║║║║║╠─░░█
                █░░╚╩╝╚╝╚╝╚╝╚╝╩─╩╚╝░░█ █▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄█
                <br />
                Please login to your account to access the dashboard.
              </p>
            </div>

            <div className="w-full">
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
                    className={`block w-[300px] p-2.5 text-gray-900 bg-gray-50 border ${
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
                    className={`block  w-[300px] p-2.5 text-gray-900 bg-gray-50 border ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:border-primary-500 focus:ring-primary-500 sm:text-sm`}
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="Enter Password"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
                <CustomButton
                  type="submit"
                  className="block mx-auto w-full px-5 py-2.5 text-sm font-medium text-center text-cyan-800 bg-cyan-200 hover:bg-cyan-400 hover:text-white  focus:ring-4 focus:ring-primary-300 relative "
                >
                  {loading ? <Loader /> : "Login"}
                </CustomButton>
                <div className="text-center mt-4 text-sm text-cyan-800">
                  Don't have an account?{" "}
                  <Link
                    to={"/register"}
                    onClick={() => {
                      setCurrStep(1);
                      setFormData(initialData);
                      console.log(formdata);
                    }}
                    className="font-semibold hover:text-cyan-600"
                  >
                    Go to signup
                  </Link>
                </div>
              </form>
            </div>
          </div>

          <Toaster
            position="top-center"
            toastOptions={{
              style: { color: `${isRed ? "red" : "green"}` },
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
