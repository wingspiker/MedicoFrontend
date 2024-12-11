import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllUnverifiedBuyers,
  getAllVerifiedBuyers,
  signOut,
} from "../../../Services/auth";
import { AdminSidebar } from "../AdminSidebar";
import {
  Tab,
  Tabs,
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Pagination,
  Chip,
  Alert,
  Snackbar,
  DialogActions,
  DialogContentText,
  DialogContent,
  Dialog,
  DialogTitle,
  CircularProgress,
} from "@mui/material";
import { MdVerified } from "react-icons/md";
import { verifyBuyerApi } from "../../../Services/buyer";
import { Logout } from "@mui/icons-material";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function BuyerTable({ buyers, isVerified, verifyBuyer, loading }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [currentBuyer, setCurrentBuyer] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleView = (buyer, index) => {
    navigate(`/admin/Buyer/${index}`, { state: { buyer } });
  };

  const handleOpenDialog = (buyer) => {
    setCurrentBuyer(buyer);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleVerify = () => {
    verifyBuyer(currentBuyer.email);
    handleCloseDialog();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Occupation</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buyers.length &&
              buyers
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((buyer, index) => (
                  <TableRow
                    key={buyer.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {buyer.firstName + " " + buyer.lastName}
                    </TableCell>
                    <TableCell>{buyer.email}</TableCell>
                    <TableCell>{buyer.occupation}</TableCell>
                    {isVerified ? (
                      <TableCell align="right">
                        <p className=" text-2xl flex justify-end gap-6">
                          <Button
                            onClick={() => handleView(buyer, index)}
                            variant="contained"
                            color="primary"
                            size="small"
                          >
                            View
                          </Button>

                          <MdVerified color="green" />
                        </p>
                      </TableCell>
                    ) : (
                      <TableCell align="right">
                        <Button
                          onClick={() => handleView(buyer, index)}
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          View
                        </Button>
                        <Button
                          onClick={() => handleOpenDialog(buyer)}
                          variant="contained"
                          color="secondary"
                          size="small"
                          style={{ marginLeft: "10px" }}
                        >
                          Verify
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Verify Buyer</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: 2 }}>
            Are you sure you want to verify the buyer{" "}
            {currentBuyer?.firstName + " " + currentBuyer?.lastName}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleVerify}>
            {loading ? <CircularProgress size={"20px"} /> : "Verify"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Pagination
        count={Math.ceil(buyers.length / rowsPerPage)}
        page={page}
        onChange={handleChangePage}
        color="primary"
        size="large"
        sx={{
          backgroundColor: "white",
          padding: 1,
          display: "flex",
          justifyContent: "end",
          marginTop: 2,
          marginBottom: 2,
          ".MuiPaginationItem-root": {
            color: "#1976d2",
            "&:hover": {
              backgroundColor: "#e3f2fd",
            },
          },
          ".Mui-selected": {
            backgroundColor: "#90caf9",
            color: "white",
            "&:hover": {
              backgroundColor: "#64b5f6",
            },
          },
        }}
      />
    </>
  );
}

export default function AdminBuyerVerify({logout}) {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [verified, setVerified] = useState([]);
  const [unverified, setUnverified] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [Flag, setFlag] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    getAllVerifiedBuyers().then(setVerified).catch(console.error);
    getAllUnverifiedBuyers().then(setUnverified).catch(console.error);
  }, [Flag]);

  const verifyBuyer = (email) => {
    setLoading(true);
    verifyBuyerApi({ email })
      .then((resp) => {
        console.log("Buyer verified successfully:", resp);
        setOpenSnackbar(true);
        setSnackbarMessage("Buyer verified successfully!");
        setFlag((f) => !f);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error verifying buyer:", err);
        setOpenSnackbar(true);
        setSnackbarMessage("Failed to verify buyer.");
        setFlag((f) => !f);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="p-2 pb-3  flex justify-between">
        <h1 className="ms-16 text-3xl font-semibold flex items-center">
          Buyer Accounts
        </h1>
      </div>
      <hr />
      <div className="ms-16 p-4">
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              backgroundColor: "white",
              padding: 1,
            }}
          >
            <Tabs
              value={value}
              onChange={(event, newValue) => setValue(newValue)} // Corrected this line
              aria-label="basic tabs example"
            >
              <Tab label="Unverified Buyers" />
              <Tab label="Verified Buyers" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <BuyerTable
              buyers={unverified}
              isVerified={false}
              verifyBuyer={verifyBuyer}
              loading={Loading}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <BuyerTable buyers={verified} isVerified={true} loading={Loading} />
          </TabPanel>
        </Box>
      </div>
      <AdminSidebar changeLogin={logout} />
    </>
  );
}
