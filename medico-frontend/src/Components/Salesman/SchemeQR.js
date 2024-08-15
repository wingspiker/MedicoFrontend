import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";
import SalesmanNavbar from "./SalesmanNavbar";
import { IoMdArrowRoundBack } from "react-icons/io";
import QRCode from "react-qr-code";

export default function SchemeQR() {
  const [isRed, setIsRed] = useState(true);
  const location = useLocation();
  const [schemeUrl, setSchemeUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const route = location?.state?.schemeUrl;
    if (!route) {
      toast.error("Something Went Wrong");
      return;
    }
    const schemeUrl = `${route}`;
    console.log(schemeUrl);
    setSchemeUrl(schemeUrl)
  }, []);

  const handleBack = () => {
    navigate("/sales/Cart");
  };

  return (
    <div className="h-screen w-screen fixed flex flex-col bg-cyan-800">
      <Toaster
        position="top-center"
        toastOptions={{
          style: { color: `${isRed ? "red" : "green"}` },
        }}
      />
      <SalesmanNavbar />
      <div className="flex flex-1 p-6 gap-4">
        <div className=" ms-12 flex-1 overflow-y-auto pr-4 bg-white p-8 shadow-md h-[88vh] overflow-auto no-scrollbar">
          <button
            onClick={handleBack}
            className="text-2xl me-4 hover:text-cyan-500"
          >
            <IoMdArrowRoundBack />
          </button>
          <div className="flex items-center mb-4">
            <h2 className="text-4xl font-semibold text-cyan-800 text-center w-full">
              Scheme QR Code
            </h2>
          </div>

          <div className=" text-red-400 border mt-12 mx-auto w-fit">
            <QRCode
              size={256}
              style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              value={schemeUrl}
              viewBox={`0 0 256 256`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
