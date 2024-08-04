import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QrScanner from "react-qr-scanner";
import Button from "@mui/material/Button";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function BuyerScanQR() {
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();

  const handleScan = (data) => {
    if (data) {
      setScanResult(data.text);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const previewStyle = {
    height: 240,
    width: 320,
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if(scanResult){
        console.log(scanResult);
    }  
  }, [scanResult])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          className="mb-4"
        >
          Back
        </Button>
        <h1 className="text-2xl font-bold mb-4 text-center">Scan QR Code</h1>
        <div className="flex justify-center">
          <QrScanner
            delay={300}
            style={previewStyle}
            onError={handleError}
            onScan={handleScan}
          />
        </div>
      </div>
    </div>
  );
}
