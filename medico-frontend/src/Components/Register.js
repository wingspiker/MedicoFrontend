import React, { useEffect, useState } from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import StepOne from "./RegisterComponents/StepOne";
import StepTwo from "./RegisterComponents/StepTwo";
import StepThree from "./RegisterComponents/StepThree";
import StepFour from "./RegisterComponents/StepFour";
import BuyerStepThree from "./RegisterComponents/BuyerStepThree";
import { currStep, getEmailOtp, getMobileOtp, signUpService, verifyEmailOtp, verifyMobileOtp } from "../Services/auth";
import { Toaster, toast } from "sonner";
import { getDistricts, getStates, getTalukas } from "../Services/location";
import { handleImageUpload } from "../Services/upload";

const Register = () => {

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);

  // Your form state and functions...
  useEffect(() => {
    getStates()
      .then((res) => {
        setStates(res);
      })
      .catch((err) => console.log("Error: ", err));
  }, []);

  const navigate = useNavigate();
  const currSt = currStep
  const [step, setStep] = useState(currSt);
  const [red, isRed] = useState(true);
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
    companyEmail:"",
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

  let documents=[
    { id: "logoFile", name: "logoFile", label: "Company Logo", url: "" },
    { id: "aadharCardFile", name: "aadharCardFile", label: "Aadhar Card", url: "" },
    { id: "panCardFile", name: "panCardFile", label: "PAN Card", url: "" },
    { id: "gstLicenseFile", name: "gstLicenseFile", label: "GST Number", url: "" },
    { id: "wholesaleDrugLicenseFile", name: "wholesaleDrugLicenseFile", label: "Wholesale Drug License", url: "" },
    { id: "retailDrugLicenseFile", name: "retailDrugLicenseFile", label: "Retail Drug License", url: "" },
    { id: "companyRegistrationLicenseFile", name: "companyRegistrationLicenseFile", label: "Company Registration License", url: "" }
  ]

  let documentLinks = []

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = "";

    // Basic validation example, customize as needed
    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
        error = "Invalid email address";
    } else if (name === "password") {
        if (value.length < 8) {
            error = "Password must be at least 8 characters long";
        } else {
            // Check if the password contains at least one uppercase letter, one lowercase letter, one numeric digit, and one special character
            const hasUppercase = /[A-Z]/.test(value);
            const hasLowercase = /[a-z]/.test(value);
            const hasNumeric = /[0-9]/.test(value);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value); // You can adjust the special characters as per your requirement

            if (!hasUppercase || !hasLowercase || !hasNumeric || !hasSpecialChar) {
                error = "Password must contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character";
            }
        }
    } else if (name === "confirmPassword" && value !== formData.password) {
        error = "Passwords do not match";
    } else if (name === "companyEmail" && !/\S+@\S+\.\S+/.test(value)) {
        error = "Invalid company email address";
    } else if (name === "companyName" && value.trim() === "") {
        error = "Company name is required";
    } else if (name === "licenseNumber" && value.trim() === "") {
        error = "License number is required";
    } else if (name === "gstNumber" && value.trim() === "") {
        error = "GST number is required";
    } else if (name === "panCardNumber" && value.trim() === "") {
        error = "Pan card number is required";
    } else if (name === "displayName" && value.trim() === "") {
        error = "Display name is required";
    } else if (name === "state" && value.trim() === "") {
        error = "State is required";
    } else if (name === "district" && value.trim() === "") {
        error = "District is required";
    } else if (name === "taluka" && value.trim() === "") {
        error = "Taluka is required";
    } else if (name === "companyAddress1" && value.trim() === "") {
        error = "Company address 1 is required";
    } else if (name === "companyAddress2" && value.trim() === "") {
        error = "Company address 2 is required";
    } else if (name === "pincode" && (value.length !== 6 || !/^\d+$/.test(value))) {
        error = "Invalid pincode";
    } else if (name === "drugLicenseNumber" && value.trim() === "") {
        error = "Drug license number is required";
    } else if (name === "wholesaleLicenseNumber" && value.trim() === "") {
        error = "Wholesale license number is required";
    } else if (name === "companyType" && value.trim() === "") {
        error = "Company type is required";
    } else if (name === "chargeType" && value.trim() === "" && formData.companyType === "selfSelling") {
        error = "Charge type is required";
    }

    if (name === "state") {
        if (value === "") {
            error = "State is required";
        } else {
            getDistricts(value)
                .then((d) => {
                    setDistricts(d)
                })
                .catch((err) => console.log(err))
        }
    }

    if (name === "district") {
        if (value === "") {
            error = "District is required";
        } else {
            getTalukas(value)
                .then((d) => {
                    setTalukas(d)
                })
                .catch((err) => console.log(err))
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
    // const file = e.target.files[0];
    // const name = e.target.name;
    // Update form data with the selected file

    // handleImageUpload(e).then((url) => {console.log(url)}).catch((err)=>{console.log(err)})

    // setFormData((prevState) => ({
    //   ...prevState,
    //   [name]: file,
    // }));

    console.log(e.target.name);

    const doc = {
      name: e.target.name,
      link: "hello"
    };
    
    const existingDocIndex = documentLinks.findIndex(item => item.name === doc.name);
    
    if (existingDocIndex !== -1) {
      documentLinks[existingDocIndex].link = doc.link;
    } else {
      documentLinks.push(doc);
    }
  };

  const ValidateStep3 = () => {
    if(formData.companyEmail === '' || errors.companyEmail){
      toast.error(errors.companyEmail ?? 'Company Email is required');
      return;
    }
    
    if(formData.companyName === '' || errors.companyName){
      toast.error(errors.companyName ?? 'Company Name is required');
      return;
    }
    
    if(formData.licenseNumber === '' || errors.licenseNumber){
      toast.error(errors.licenseNumber ?? 'License Number is required');
      return;
    }
    
    if(formData.gstNumber === '' || errors.gstNumber){
      toast.error(errors.gstNumber ?? 'GST Number is required');
      return;
    }
    
    if(formData.panCardNumber === '' || errors.panCardNumber){
      toast.error(errors.panCardNumber ?? 'Pan Card Number is required');
      return;
    }
    
    if(formData.displayName === '' || errors.displayName){
      toast.error(errors.displayName ?? 'Display Name is required');
      return;
    }
    
    if(formData.state === '' || errors.state){
      toast.error(errors.state ?? 'State is required');
      return;
    }
    
    if(formData.district === '' || errors.district){
      toast.error(errors.district ?? 'District is required');
      return;
    }
    
    if(formData.taluka === '' || errors.taluka){
      toast.error(errors.taluka ?? 'Taluka is required');
      return;
    }
    
    if(formData.companyAddress1 === '' || errors.companyAddress1){
      toast.error(errors.companyAddress1 ?? 'Company Address 1 is required');
      return;
    }
    
    if(formData.companyAddress2 === '' || errors.companyAddress2){
      toast.error(errors.companyAddress2 ?? 'Company Address 2 is required');
      return;
    }
    
    if(formData.pincode === '' || errors.pincode){
      toast.error(errors.pincode ?? 'Pincode is required');
      return;
    }
    
  
    
    if(formData.drugLicenseNumber === '' || errors.drugLicenseNumber){
      toast.error(errors.drugLicenseNumber ?? 'Drug License Number is required');
      return;
    }
    
    if(formData.wholesaleLicenseNumber === '' || errors.wholesaleLicenseNumber){
      toast.error(errors.wholesaleLicenseNumber ?? 'Wholesale License Number is required');
      return;
    }
    
    if(formData.companyType === '' || errors.companyType){
      toast.error(errors.companyType ?? 'Company Type is required');
      return;
    }
    
    if(formData.companyType === 'selfSelling' && formData.chargeType === '' || errors.chargeType){
      toast.error(errors.chargeType ?? 'Charge Type is required');
      return;
    }

    setStep((prevStep) => prevStep + 1);

  }

  const ValidateStep4 = () => {
    const names = documents.map(doc => doc.name);
    const submitNames = documentLinks.map((link) => link?.name);
    const filteredNames = names.filter(name => !submitNames.includes(name));
    if(filteredNames.length){
      toast.error(filteredNames[0]+' is required');      
    }else{
      console.log(formData);    console.log(documentLinks);
      const {email, companyEmail, companyName, companyType, chargeType} = formData;

      const submitData = {email, companyEmail, companyName, companyType, chargeType,documentLinks}
      console.log(submitData);
    }
  }

  const submitDetails = () => {

  }

  const nextStep = () => {
    if (formData.role == 0) {      
      setIsBuyer(true);
    }else{
      setIsBuyer(false)
    }

    if(step===3){
      ValidateStep3();
      return;
    }

    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    ValidateStep4()
    
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

  const signUp = (registerData) => {

    // nextStep()

    // signUpService(registerData)
    //   .then((res) => {
    //     isRed(false)
    //     toast.success("Account created successfully!");
    //     isRed(true)
    //     localStorage.setItem('token', res.accessToken);        
    //     nextStep();
    //   })
    //   .catch((err) => {
    //     toast.error(err.response.data.detail)
    //   })

      nextStep();
  }

  return (
    <div className="min-h-screen bg-cyan-900 flex flex-col justify-center items-center">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { color: `${red?'red':'green'}`},
        }}
      />
      {/* <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg"> */}
      <div
        className={`md:w-full w-[80%] ${
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
            signUp={signUp}
          />
        )}

        {(step === 3 && (!isBuyer)) && (
          
          <StepThree
            formData={formData}
            handleChange={handleChange}
            errors={errors}
            nextStep={nextStep}
            prevStep={prevStep}
            states={states}
            districts={districts}
            talukas={talukas}
          />
        )}

        {(step === 3 && isBuyer) && (
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
            documents={documents}
          />
        )}
      </div>
    </div>
  );
};

export default Register;
