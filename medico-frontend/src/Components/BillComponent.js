import React, { useState } from "react";
import {
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
  Paper,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import PendingIcon from "@mui/icons-material/AccessTime";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import "@mui/material/styles"; // Import this if you're customizing Material-UI themes or need to override styles
import { paymentStatus } from "../Models/enums.model";
import { handleImageUpload } from "../Services/upload";
import { completepayment } from "../Services/user";
import { decodeToken } from "../Services/auth";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

const getStatusComponent = (status) => {
  switch (status) {
    case paymentStatus.Paid:
      return {
        icon: <ReportProblemIcon style={{ color: "orange" }} />,
        text: "Under Scrutiny",
      };
    case paymentStatus.Verified:
      return {
        icon: <VerifiedUserIcon style={{ color: "blue" }} />,
        text: "Verified",
      };
    case paymentStatus.Pending:
      return {
        icon: <PendingIcon style={{ color: "orange" }} />,
        text: "Pending",
      };
    case paymentStatus.Failed:
      return { icon: <ErrorIcon style={{ color: "red" }} />, text: "Failed" };
    default:
      return { icon: <ErrorIcon style={{ color: "grey" }} />, text: "Unknown" };
  }
};

function PaymentStatus({ status }) {
  const { icon, text } = getStatusComponent(status);

  return (
    <Box display="flex" alignItems="center">
      {icon}
      <Typography variant="body1" style={{ marginLeft: 8 }}>
        Payment Status: {text}
      </Typography>
    </Box>
  );
}

export default function BillComponent({ bills, reload }) {
  const currentMonth = new Date().getMonth() + 1; // getMonth() returns 0-11, so add 1
  const currentYear = new Date().getFullYear();
  console.log(bills);

  const [selectedMonthYear, setSelectedMonthYear] = useState(
    `${bills[0]?.monthName} - ${bills[0].year}`
  );
  const handleSelectChange = (event) => {
    setSelectedMonthYear(event.target.value);
    setPaymentProof("");
  };
  const [loading, setLoading] = useState(false);
  const [completeLoading, setCompleteLoading] = useState(false);
  const [paymentProof, setPaymentProof] = useState("");

  const handlePaymentProofChange = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    if (file) {
      handleImageUpload(e)
        .then((resp) => {
          setPaymentProof(resp.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  const handlePaymentComplete = () => {
    // console.log(selectedBill);
    // console.log(paymentProof);
    const user = decodeToken();
    const keys = Object.keys(user);
    const companyEmail = user[keys.find((k) => k.endsWith("emailaddress"))];
    const billObj = {
      year: selectedBill.year,
      month: selectedBill.month,
      photoUrl: paymentProof,
      amount: selectedBill.paymentAmount,
    };
    setCompleteLoading(true);
    completepayment(billObj, companyEmail)
      .then((resp) => {
        console.log(resp);
        reload();
        setCompleteLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setCompleteLoading(false);
      });
  };

  const selectedBill = bills.find(
    (bill) => `${bill.monthName} - ${bill.year}` === selectedMonthYear
  );

  return (
    <div className="p-5 w-full">
      <Typography variant="h6" className="mb-4" sx={{ mb: 2 }}>
        Select a month to view Bill
      </Typography>
      <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
        <FormControl
          variant="outlined"
          sx={{ flex: 1, minWidth: "200px", maxWidth: "300px" }}
        >
          <InputLabel>Month - Year</InputLabel>
          <Select
            value={selectedMonthYear}
            onChange={handleSelectChange}
            label="Month - Year"
          >
            {bills.map((bill) => (
              <MenuItem
                key={`${bill.monthName}-${bill.year}`}
                value={`${bill.monthName} - ${bill.year}`}
              >
                {bill.monthName} - {bill.year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {selectedBill ? (
          <Paper
            elevation={3}
            sx={{ flex: 3, p: 2, minWidth: "calc(70% - 16px)" }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              Details for {selectedBill.monthName} {selectedBill.year}
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">
                Turnover: ₹ {(+selectedBill.turnover).toFixed(2)}
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">
                <PaymentStatus status={selectedBill.paymentStatus} />
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">
                Bill Amount: ₹ {(+selectedBill.paymentAmount).toFixed(2)}
              </Typography>
            </Box>
            {selectedBill.paymentStatus === paymentStatus.Pending && !(selectedBill.month === currentMonth && selectedBill.year === currentYear)  && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  component="label"
                  startIcon={<UploadFileIcon />}
                  sx={{ mr: 2 }}
                >
                  {loading ? (
                    <CircularProgress size={"20px"} sx={{ color: "white" }} />
                  ) : (
                    "Payment Proof"
                  )}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handlePaymentProofChange}
                  />
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!paymentProof}
                  onClick={() => handlePaymentComplete()}
                >
                  {completeLoading ? (
                    <CircularProgress size={"20px"} sx={{ color: "white" }} />
                  ) : (
                    "Complete Payment"
                  )}
                </Button>
              </Box>
            )}
            {(selectedBill.month === currentMonth && selectedBill.year === currentYear) && <>
              <Typography variant="body1">
                  Your bill is not generated yet.
                </Typography>
            </>}
            {selectedBill.paymentStatus === paymentStatus.Paid && (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Typography variant="body1">
                  Payment is under scrunity, it will be verified shortly.
                </Typography>
              </Box>
            )}
          </Paper>
        ) : (
          <Typography variant="body2" sx={{ flex: 3 }}>
            No details available
          </Typography>
        )}
      </Box>
    </div>
  );
}
