import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../../Services/auth";
import { AdminSidebar } from "../AdminSidebar";
import {
  getAllPendingSubscriptions,
  verifySubscriptionPayment,
} from "../../../Services/user";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { subscriptionTypeEnum } from "../../../Models/enums.model";
import { Toaster } from "sonner";

export default function SubscriptionPlan(props) {
  const { changeLogin } = props;
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [plans, setPlans] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedEmail, setSelectedEmail] = useState("");
  const [open, setOpen] = useState(false);
  const [flag, setflag] = useState(false);
  const [loading, setloading] = useState(false);
  const [red, isRed] = useState(true);
  const [confopen, setConfOpen] = useState(false);

  useEffect(() => {
    getAllPendingSubscriptions()
      .then((resp) => {
        setPlans(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [flag]);

  const logout = () => {
    signOut();
    navigate("/admin");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClickOpen = (imageUrl) => {
    // console.log(imageUrl);
    setSelectedImage(imageUrl);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfOpen = (companyEmail) => {
    setSelectedEmail(companyEmail);
    setConfOpen(true);
  };

  const handleConfClose = () => {
    setConfOpen(false);
  };

  const handleClickVerify = () => {
    // console.log(selectedEmail);
    setloading(true);
    verifySubscriptionPayment(selectedEmail)
      .then((resp) => {
        console.log(resp);
        setflag((f) => !f);
        setloading(false);
        setConfOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setloading(false);
        setConfOpen(false);
      });
  };

  return (
    <div className="flex h-screen bg-cyan-900 text-white">
      <AdminSidebar changeLogin={logout} />
      <div className="flex-1 ms-14">
      <Toaster
          position="top-center"
          toastOptions={{
            style: { color: `${red ? "red" : "green"}` },
          }}
        />
        <div>
          <div className="p-3 flex gap-4">
            <p className=" text-2xl">Subscription Plan Verification</p>
          </div>
          <hr />
        </div>
        <div className=" ps-14 p-8">
          <TableContainer component={Paper}>
            <Table>
              <TableHead style={{ backgroundColor: "#32974f" }}>
                {" "}
                {/* Darker shade for better contrast */}
                <TableRow>
                  <TableCell style={{ color: "#fff" }}>Company Name</TableCell>
                  <TableCell align="right" style={{ color: "#fff" }}>
                    Company Email
                  </TableCell>
                  <TableCell align="right" style={{ color: "#fff" }}>
                    Due Amount Paid
                  </TableCell>
                  <TableCell align="right" style={{ color: "#fff" }}>
                    Current Plan Type
                  </TableCell>
                  <TableCell align="right" style={{ color: "#fff" }}>
                    Next Plan Type
                  </TableCell>
                  <TableCell align="right" style={{ color: "#fff" }}>
                    Payment Proof
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {plans.length > 0 ? (
                  plans
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <TableRow key={row.companyName}>
                        <TableCell component="th" scope="row">
                          {row.companyName}
                        </TableCell>
                        <TableCell align="right">{row.companyEmail}</TableCell>
                        <TableCell align="right">{row.dueAmountPaid}</TableCell>
                        <TableCell align="right">
                          {
                            Object.values(subscriptionTypeEnum)[
                              +row.currentSubscriptionPlanType
                            ]
                          }
                        </TableCell>
                        <TableCell align="right">
                          {
                            Object.values(subscriptionTypeEnum)[
                              +row.nextSubscriptionPlanType
                            ]
                          }
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleClickOpen(row.photoUrl)}
                          >
                            View
                          </Button>
                          <Button
                            sx={{ marginLeft: 2 }}
                            variant="contained"
                            color="success"
                            onClick={() => handleConfOpen(row.companyEmail)}
                          >
                            Verify
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} style={{ textAlign: "center" }}>
                      <strong>No new requests found</strong> 
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            {plans.length > 0 && (
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={plans.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            )}
          </TableContainer>
        </div>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Payment Proof</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <img
                src={selectedImage}
                alt="Payment Proof"
                style={{ width: "100%" }}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={confopen}
          onClose={handleConfClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to verify the payment
          </DialogTitle>

          <DialogActions>
            <Button onClick={handleClickVerify} color="primary">
              {loading ? <CircularProgress size={20} /> : "Confirm"}
            </Button>
            <Button
              sx={{ marginLeft: 2 }}
              onClick={handleConfClose}
              color="secondary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
