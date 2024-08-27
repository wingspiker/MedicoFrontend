import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../../Services/auth";
import { AdminSidebar } from "../AdminSidebar";
import {
  getAllPendingPercentagesBills,
  verifyBillPayment,
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
import { toast, Toaster } from "sonner";

export default function SubscriptionPercentageBills(props) {
  const { changeLogin } = props;
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [percentages, setPercentages] = useState([]);
  const [openView, setOpenView] = useState(false);
  const [openVerify, setOpenVerify] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [red, isRed] = useState(true);
  const [fl, setFl] = useState(true);

  useEffect(() => {
    getAllPendingPercentagesBills().then(setPercentages).catch(console.error);
  }, [fl]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenView = (imageUrl) => {
    setSelectedImage(imageUrl);
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };

  const handleOpenVerify = (item) => {
    setSelectedItem(item);
    setOpenVerify(true);
  };

  const handleCloseVerify = () => {
    setOpenVerify(false);
  };

  const handleVerify = () => {
    setLoading(true);
    // console.log("Verifying:", selectedItem);
    const verifyObj = {
      companyEmail: selectedItem.companyEmail,
      year: selectedItem.year,
      month: selectedItem.month,
    };
    // console.log(verifyObj);
    verifyBillPayment(verifyObj, verifyObj.companyEmail)
      .then((resp) => {
        setLoading(false);
        setOpenVerify(false);
        setFl((f) => !f);
      })
      .catch((err) => {
        setLoading(false);
        setOpenVerify(false);
        toast.error("Something went wrong");
        setFl((f) => !f);
      });
  };

  const logout = () => {
    signOut();
    navigate("/admin");
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
        <h2 className="text-2xl py-3 px-2">
          Subscription Percentage Payments Verification
        </h2>
        <hr className=" mb-4" />
        <div className=" p-6">
          <TableContainer component={Paper}>
            <Table>
              <TableHead style={{ backgroundColor: "#32974f" }}>
                <TableRow>
                  <TableCell style={{ color: "#fff" }}>Company Name</TableCell>
                  <TableCell align="right" style={{ color: "#fff" }}>
                    Year
                  </TableCell>
                  <TableCell align="right" style={{ color: "#fff" }}>
                    Month
                  </TableCell>
                  <TableCell align="right" style={{ color: "#fff" }}>
                    Due Amount Paid
                  </TableCell>
                  <TableCell align="right" style={{ color: "#fff" }}>
                    Percentage
                  </TableCell>
                  <TableCell align="right" style={{ color: "#fff" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {percentages.length > 0 ? (
                  percentages.map((row) => (
                    <TableRow key={row.companyName + row.year + row.month}>
                      <TableCell>{row.companyName}</TableCell>
                      <TableCell align="right">{row.year}</TableCell>
                      <TableCell align="right">{row.month}</TableCell>
                      <TableCell align="right">
                        {row.dueAmountPaid
                          ? `₹ ${row.dueAmountPaid} /-`
                          : "Pending"}
                      </TableCell>
                      <TableCell align="right">{`${row.percentage}%`}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleOpenView(row.photoUrl)}
                        >
                          View
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          style={{ marginLeft: "10px" }}
                          onClick={() => handleOpenVerify(row)}
                        >
                          Verify
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} style={{ textAlign: "center" }}>
                      No pending payment verification
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={percentages.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </div>

        <Dialog open={openView} onClose={handleCloseView}>
          <DialogTitle>{"Payment Proof"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              <img
                src={selectedImage}
                alt="Payment Proof"
                style={{ width: "100%" }}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseView} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openVerify} onClose={handleCloseVerify}>
          <DialogTitle>{"Verify Payment"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to verify the payment for{" "}
              {selectedItem?.companyName}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleVerify} color="primary">
              {loading ? <CircularProgress size={"20px"} /> : "Confirm"}
            </Button>
            <Button onClick={handleCloseVerify} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
