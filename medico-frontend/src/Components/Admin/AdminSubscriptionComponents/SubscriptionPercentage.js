import React, { useEffect, useState } from "react";
import { AdminSidebar } from "../AdminSidebar";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../../Services/auth";
import {
  getAllPendingPercentages,
  verifyPercentage,
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
  TextField,
} from "@mui/material";
import { Toaster, toast } from "sonner";

export default function SubscriptionPercentage(props) {
  const { changeLogin } = props;
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [percentage, setPercentage] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [inputPercentage, setInputPercentage] = useState("");
  const [red, isRed] = useState(true);
  const [fl, setFl] = useState(true);

  useEffect(() => {
    getAllPendingPercentages()
      .then((resp) => {
        setPercentage(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fl]);

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

  const handleClickOpen = (company) => {
    setSelectedCompany(company);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCompany(null);
    setInputPercentage("");
  };

  const handleConfirm = () => {
    if (!inputPercentage) {
      toast.error("Please enter a percentage.");
      return;
    }
    const percObj = {
      percentage: inputPercentage,
      companyEmail: selectedCompany.companyEmail,
    };
    verifyPercentage(percObj)
      .then(() => {
        isRed(false);
        toast.success("Percentage verified successfully!");
        setFl((f) => !f);
        handleClose();
      })
      .catch((err) => {
        console.log(err);
        setFl((f) => !f);
        toast.error("Failed to verify percentage.");
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
            <p className="text-2xl">Subscription Percentage Verification</p>
          </div>
          <hr className="mb-6" />
          <div className=" p-6">
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {percentage.length > 0 ? (
                    percentage
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((company) => (
                        <TableRow key={company.companyEmail}>
                          <TableCell>{company.companyName}</TableCell>
                          <TableCell>{company.companyEmail}</TableCell>
                          <TableCell>
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleClickOpen(company)}
                            >
                              Verify
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} style={{ textAlign: "center" }}>
                        <strong>No new verification requests found</strong>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            {/* <TablePagination
              component="div"
              count={percentage.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            /> */}
          </div>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Verify Percentage</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Please enter the percentage to verify for{" "}
                {selectedCompany?.companyName}.
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                label="Percentage"
                type="number"
                fullWidth
                value={inputPercentage}
                onChange={(e) => setInputPercentage(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleConfirm} color="primary">
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
