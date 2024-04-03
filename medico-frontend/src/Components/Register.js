import React, { useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import StepOne from "./RegisterComponents/StepOne";
import StepTwo from "./RegisterComponents/StepTwo";
import StepThree from "./RegisterComponents/StepThree";
import StepFour from "./RegisterComponents/StepFour";
import BuyerStepThree from "./RegisterComponents/BuyerStepThree";
import { getEmailOtp, getMobileOtp, verifyEmailOtp, verifyMobileOtp } from "../Services/auth";
import { Toaster, toast } from "sonner";

const Register = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const initialForm = {
    email: "",
    emailOtp: "",
    mobile: "",
    mobileOtp: "",
    username: "",
    role: "",
    password: "",
    confirmPassword: "",

    //step 3

    companyName: "",
    licenseNumber: "",
    gstNumber: "",
    panCardNumber: "",
    displayName: "",
    state: "",
    district: "",
    taluka: "",
    companyAddress1: "",
    companyAddress2: "",
    pincode: "",
    logo: "",
    drugLicenseNumber: "",
    wholesaleLicenseNumber: "",
    companyType: "",
    chargeType: "",

    //Buyer
    degree: "",
    firstName: "",
    lastName: "",
    occupation: "",
  };
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpEmailLoading, setOtpEmailLoading] = useState(false);
  const [e, sE] = useState(false);
  const [m, sM] = useState(false);
  const [otpMobileLoading, setOtpMobileLoading] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [isBuyer, setIsBuyer] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    // Basic validation example, customize as needed
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      error = "Invalid email address";
    } else if (name === "password" && value.length < 6) {
      error = "Password must be at least 6 characters long";
    } else if (name === "confirmPassword" && value !== formData.password) {
      error = "Passwords do not match";
    }

    if (name === "confirmPassword" && value !== formData.password) {
      error = "Passwords do not match";
    }

    if (name === "username") {
      if (!/^[a-z]+$/.test(value)) {
        error = "Username must contain only lowercase alphabets";
      }
    }

    if (name === "mobile") {
      if (!/^\d{10}$/.test(value) && (value.length > 10 || value.length < 10)) {
        error = "Mobile number must be 10 digits";
      }
    }

    if (name === "firstName" || name === "lastName") {
      if (!/^[a-zA-Z]*$/.test(value)) {
        error = "Only alphabets are allowed";
      }
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const verifyEmail = (e) => {
    e.preventDefault();
    // Simulate email verification
    // You can replace this with actual verification logic
    setOtpEmailLoading(true)  

    getEmailOtp(formData.email).then((res) => {
      console.log("OTP: ", res);
      setEmailVerified(true)
      setOtpEmailLoading(false)
    }).catch(()=>{
      toast.error('Invalid Email');
      setOtpEmailLoading(false);
    })

    
  };

  const verifyMobile = (e) => {
    e.preventDefault();
    // Simulate mobile verification
    // You can replace this with actual verification logic    

    const {email, mobile} = formData;
    if(!email.length){
      toast.error( 'Please verify your email first' );
    }
    else{
      setOtpMobileLoading(true);
      getMobileOtp({email, mobile}).then((res) => {
        console.log("OTP: ", res);
        setMobileVerified(true)
        setOtpMobileLoading(false)
      }).catch((e)=>{
        console.log(e);
        toast.error('Invalid Mobile');
        setOtpMobileLoading(false);
      })
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    // You may want to perform further validation or processing of the file here
    setFormData((prevState) => ({
      ...prevState,
      logo: file,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    // Update form data with the selected file
    setFormData((prevState) => ({
      ...prevState,
      [name]: file,
    }));
  };

  const nextStep = () => {
    if (formData.role == 1) {
      setIsBuyer(true);
    }
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  const confirmEmailOtp = (e) => {
    e.preventDefault();
    // Handle email OTP confirmation logic here
    const {email, emailOtp} = formData;
    verifyEmailOtp({email, emailOtp})
      .then((d) => {
        console.log(d);
        sE(true);
        setEmailVerified(false)
      })
      .catch((err) => {
      toast.error(err.response.data.detail)
    })
  };

  const confirmMobileOtp = (e) => {
    e.preventDefault();
    // Handle mobile OTP confirmation logic here
    const {mobile, mobileOtp} = formData;
    const phoneOtpData = {phoneNumber:mobile, phoneNumberOtp:mobileOtp}
    verifyMobileOtp(phoneOtpData)
      .then((d) => {
        console.log(d);
        sM(true);
        setMobileVerified(false)
      })
      .catch((err) => {
      toast.error(err.response.data.detail)
    })
  };

  const changeEmail = () => {
    setFormData({ ...formData, email: "", emailOtp: "" });
    setEmailVerified(false);
  };

  const changeMobile = () => {
    setFormData({ ...formData, mobile: "", mobileOtp: "" });
    setMobileVerified(false);
  };

  const goback = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-cyan-900 flex flex-col justify-center items-center">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { color: "red"},
        }}
      />
      {/* <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"> */}
      <div
        className={`md:w-full ${
          step === 3 || step == 4
            ? "max-w-full max-h-full"
            : "max-w-md bg-white rounded-2xl"
        }  text-white p-8  `}
      >
        <button onClick={goback}>
          {step === 1 ? (
            <IoChevronBackSharp className="cursor-pointer text-2xl hover:text-cyan-900 text-gray-900" />
          ) : (
            ""
          )}
        </button>
        <h2
          className={`flex w-full ${
            step === 3 || step == 4
              ? "text-white text-left"
              : "text-black text-center"
          }  text-4xl mb-4`}
        >
          {/* Add back button */}
          <p className=" text-center w-full mb-4">Register</p>
        </h2>

        {step === 1 && (
          <StepOne
            formData={formData}
            handleChange={handleChange}
            verifyEmail={verifyEmail}
            emailVerified={emailVerified}
            errors={errors}
            confirmEmailOtp={confirmEmailOtp}
            nextStep={nextStep}
            changeEmail={changeEmail}
            confirmMobileOtp={confirmMobileOtp}
            changeMobile={changeMobile}
            mobileVerified={mobileVerified}
            verifyMobile={verifyMobile}
            otpMobileLoading={otpMobileLoading}
            otpEmailLoading={otpEmailLoading}
            E={e}
            M={m}
          />
        )}

        {step === 2 && (
          <StepTwo
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            nextStep={nextStep}
          />
        )}

        {step === 3 && !isBuyer && (
          <StepThree
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {step === 3 && isBuyer && (
          <BuyerStepThree
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        )}

        {step === 4 && (
          <StepFour
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
            handleFileChange={handleFileChange}
          />
        )}
      </div>
    </div>
  );
};

export default Register;
