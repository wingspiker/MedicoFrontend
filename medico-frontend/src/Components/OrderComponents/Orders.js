import React, { useEffect, useState } from "react";
import { decodeToken, isAdmin, signOut } from "../../Services/auth";
import { getOrdersByEmail, updateOrderStatus } from "../../Services/orders"; // Assuming you have an updateOrderStatus function
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Tabs,
  Tab,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { paymentStatus, OrderStatus } from "../../Models/enums.model";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "sonner";

export default function Orders(props) {
  const { changeLogin } = props;

  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState({}); // State for selected status
  const [Loader, setLoader] = useState(false);
  const [fl, setFl] = useState(false);
  const [red, setred] = useState(false);

  useEffect(() => {
    const user = decodeToken();
    const keys = Object.keys(user);
    const email = user[keys.find((k) => k.endsWith("emailaddress"))];
    getOrdersByEmail(email)
      .then((resp) => {
        setOrders(resp);
        setFilteredOrders(resp); // Initialize filtered orders
        filterOrders(selectedTab); // Filter orders based on current tab after fetching
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fl]);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue);
    filterOrders(newValue);
  };

  const filterOrders = (tabIndex) => {
    let filtered;
    switch (tabIndex) {
      case 0:
        filtered = orders;
        break;
      case 1:
        filtered = orders.filter(
          (order) => order.orderStatus === OrderStatus.Pending
        );
        break;
      case 2:
        filtered = orders.filter(
          (order) => order.orderStatus === OrderStatus.Confirmed
        );
        break;
      case 3:
        filtered = orders.filter(
          (order) => order.orderStatus === OrderStatus.Cancelled
        );
        break;
      case 4:
        filtered = orders.filter(
          (order) => order.orderStatus === OrderStatus.Shipped
        );
        break;
      case 5:
        filtered = orders.filter(
          (order) => order.orderStatus === OrderStatus.Delivered
        );
        break;
      default:
        filtered = orders;
        break;
    }
    setFilteredOrders(filtered);
    setPage(0); // Reset to the first page on tab change
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  const handleSaveStatus = (order) => {
    setLoader(true);
    const newStatus = selectedStatus[order.id];
    console.log(newStatus);
    if (newStatus && newStatus !== order.orderStatus) {
      updateOrderStatus(order.id, newStatus)
        .then(() => {
          const updatedOrders = orders.map((o) =>
            o.id === order.id ? { ...o, orderStatus: newStatus } : o
          );
          setOrders(updatedOrders);
          filterOrders(selectedTab); // Apply the filter again to refresh the filtered list
          setLoader(false);
          setFl((f) => !f);
          setred(false);
          toast.success('Order updated successfully')
        })
        .catch((err) => {
          console.log(err);
          setLoader(false);
          setred(true)
          toast.success('Something went wrong');
        });
    } else {
      setLoader(false); // Stop loader if no changes are made
    }
  };

  const logout = () => {
    signOut();
    changeLogin(false);
  };

  const navigate = useNavigate();
  const handleViewClick = (order, index) => {
    if (isAdmin()) {
      navigate(`/admin/Order/${index}`, { state: { order } });
    } else {
      navigate(`/company/Order/${index}`, { state: { order } });
    }
  };

  const getOrderStatus = (status) => {
    const statusMap = {
      [OrderStatus.Pending]: "Pending",
      [OrderStatus.Confirmed]: "Confirmed",
      [OrderStatus.Shipped]: "Shipped",
      [OrderStatus.Delivered]: "Delivered",
      [OrderStatus.Cancelled]: "Cancelled",
      [OrderStatus.Returned]: "Returned",
    };
    return statusMap[status] || "Unknown";
  };

  const getPaymentStatus = (status) => {
    const statusMap = {
      [paymentStatus.Pending]: "Pending",
      [paymentStatus.Paid]: "Paid",
      [paymentStatus.Verified]: "Verified",
      [paymentStatus.Failed]: "Failed",
    };
    return statusMap[status] || "Unknown";
  };

  return (
    <div className="flex h-screen bg-white text-slate-700">
      {Loader && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <CircularProgress />
        </div>
      )}
      <div className="flex-1 ms-14">
        <div className="p-2 flex justify-between">
          <p className="text-3xl font-bold">Orders</p>
          <Button onClick={logout} variant="contained" color="error">
            Logout
          </Button>
        </div>
        <hr />
        <Toaster
          position="top-center"
          toastOptions={{
            style: { color: `${red ? "red" : "green"}` },
          }}
        />
        <Tabs
          value={selectedTab}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="All Orders" />
          <Tab label="Pending" />
          <Tab label="Confirmed" />
          <Tab label="Declined" />
          <Tab label="Shipped" />
          <Tab label="Delivered" />
        </Tabs>
        <div className="mx-10 my-6">
          <TableContainer
            component={Paper}
            style={{ backgroundColor: "#fff", color: "#000" }}
          >
            <Table>
              <TableHead sx={{ backgroundColor: "orange" }}>
                <TableRow>
                  <TableCell>Order Date</TableCell>
                  <TableCell>Payment Status</TableCell>
                  <TableCell>Order Status</TableCell>
                  <TableCell>Action</TableCell>
                  <TableCell>Change Status</TableCell>
                  <TableCell>Save</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((order, index) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        {new Date(order.orderDate).toDateString()}{" "}
                        {new Date(order.orderDate).toLocaleTimeString()}
                      </TableCell>
                      <TableCell>
                        {getPaymentStatus(order.paymentStatus)}
                      </TableCell>
                      <TableCell>{getOrderStatus(order.orderStatus)}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleViewClick(order, index)}
                        >
                          View
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={selectedStatus[order.id] || -1}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                        >
                          <MenuItem value={-1} disabled selected>
                            Select status
                          </MenuItem>
                          {Object.values(OrderStatus).map((status) => {
                            if (status > order.orderStatus)
                              return (
                                <MenuItem key={status} value={status}>
                                  {getOrderStatus(status)}
                                </MenuItem>
                              );
                          })}
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleSaveStatus(order)}
                        >
                          Save
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={filteredOrders.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
