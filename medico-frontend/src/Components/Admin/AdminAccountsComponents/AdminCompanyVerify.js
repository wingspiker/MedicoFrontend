import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllUnverifiedCompanies,
  getAllVerifiedCompanies,
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
  TextField,
  Pagination,
  Chip,
  Alert,
  Snackbar,
  DialogActions,
  DialogContentText,
  DialogContent,
  Dialog,
  DialogTitle,
  InputAdornment,
} from "@mui/material";
import { MdVerified } from "react-icons/md";
import { verifyCompanyApi } from "../../../Services/company";
import { subscriptionTypeEnum } from "../../../Models/enums.model";

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

function CompanyTable({ companies, isVerified, verifyCompany }) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [percentage, setPercentage] = useState("");
  const [currentCompany, setCurrentCompany] = useState(null);

  console.log(companies);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleView = (company, index) => {
    // console.log(id);
    console.log(company);
    navigate(`/admin/Company/${index}`, { state: { company } });
  };

  const handleOpenDialog = (company) => {
    setCurrentCompany(company);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleVerify = () => {
    if (currentCompany.chargesType===1 && percentage >= 1 && percentage <= 100) {
      verifyCompany(currentCompany.companyEmail, percentage);
      console.log('ee');
      handleCloseDialog();
    } 
    else if(currentCompany.chargesType===0){
        verifyCompany(currentCompany.companyEmail);
        handleCloseDialog();
    }
    else {
      setSnackbarMessage("Please enter a valid percentage (1-100).");
      setOpenSnackbar(true);
    }
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
              <TableCell>Charges</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companies
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((company, index) => (
                <TableRow
                  key={company.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {company.displayName}
                    <Chip
                      label={
                        company.companyType === 0
                          ? "Admin Selling"
                          : "Self Selling"
                      }
                      size="small"
                      color={
                        company.companyType === 0 ? "primary" : "secondary"
                      }
                      sx={{ ml: 1, height: "16px", fontSize: 8 }}
                    />
                  </TableCell>
                  <TableCell>{company.companyEmail}</TableCell>
                  {console.log(company)}
                  <TableCell>
                    <Chip
                      label={
                        company.chargesType === 0
                          ? <p>
                          Subscription {isVerified && <>: {Object.values(subscriptionTypeEnum)[company.activeSubscription??0]}</>}
                          </p>
                          : <p>
                            Percentage {isVerified && <>: {(+company.percentage).toFixed(2)} %</>}
                          </p>
                      }
                      color={
                        company.chargesType === 0 ? "primary" : "secondary"
                      }
                      size="small"
                      sx={{ fontSize: 10 }} // Adjust styling as needed
                    />
                  </TableCell>
                  {isVerified ? (
                    <TableCell align="right">
                      <p className=" text-2xl flex justify-end gap-6">
                        <Button
                          onClick={() => handleView(company, index)}
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
                        onClick={() => handleView(company, index)}
                        variant="contained"
                        color="primary"
                        size="small"
                      >
                        View
                      </Button>
                      <Button
                        onClick={() => handleOpenDialog(company)}
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
        <DialogTitle>Verify Company</DialogTitle>
        <DialogContent>
            {/* {console.log(currentCompany)} */}
          <DialogContentText sx={{marginBottom:2}}> 
            Are you sure You want to verify the company {currentCompany?.name} ?
          </DialogContentText>
          { currentCompany?.chargesType===1 &&
            <>
              {/* <DialogContentText>
                Please enter the percentage for the commission:
              </DialogContentText> */}
              <TextField
                autoFocus
                margin="dense"
                id="percentage"
                label="Percentage"
                type="number"
                fullWidth
                variant="outlined"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                InputProps={{
                    endAdornment: <InputAdornment position="end">%</InputAdornment>,
                  }}
              />
            </>
          }
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleVerify}>Confirm</Button>
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
        count={Math.ceil(companies.length / rowsPerPage)}
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
export default function AdminCompanyVerify() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const [verified, setVerified] = useState([]);
  const [unverified, setUnverified] = useState([]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [isRed, setIsRed] = useState(false);
  const [Flag, setFlag] = useState(false);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onlogout = () => {
    signOut();
    navigate("/admin");
  };

  useEffect(() => {
    getAllVerifiedCompanies().then(setVerified).catch(console.error);
    getAllUnverifiedCompanies().then(setUnverified).catch(console.error);
  }, [Flag]);

  const verifyCompany = (email, percentage) => {
    verifyCompanyApi(email, percentage)
    .then(resp=>{
        console.log(resp);
        setSnackbarMessage("Hello World");
        setIsRed(false)
        setOpenSnackbar(true);
        setFlag(f=>!f)

    })
    .catch(err=>{
        console.log(err);
        setSnackbarMessage(err.response.data.detail);
        setIsRed(true)
        setOpenSnackbar(true);
        setFlag(f=>!f)
    })
  };

  return (
    <>
      {/* {console.log(unverified)} */}
      <div className=" flex justify-between">
        <h1 className="ms-16 p-2 pb-3 text-3xl font-semibold text-white flex items-center">
          Company Accounts
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
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Unverified Companies" />
              <Tab label="Verified Companies" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <CompanyTable
              companies={unverified}
              isVerified={false}
              verifyCompany={verifyCompany}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <CompanyTable companies={verified} isVerified={true} />
          </TabPanel>
        </Box>
      </div>
      <AdminSidebar changeLogin={onlogout} />
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={isRed?'error':'success'}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
