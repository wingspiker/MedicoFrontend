import React, { useEffect, useState } from "react";
import { decodeToken, signOut } from "../../Services/auth";
import { getOrdersByEmail } from "../../Services/orders";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import TablePagination from "@mui/material/TablePagination";
import { paymentStatus, OrderStatus } from "../../Models/enums.model";
import { useNavigate } from "react-router-dom";

export default function Orders(props) {
  const { changeLogin } = props;

  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const user = decodeToken();
    const keys = Object.keys(user);
    const email = user[keys.find((k) => k.endsWith("emailaddress"))];
    getOrdersByEmail(email)
      .then((resp) => {
        setOrders(resp);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const logout = () => {
    signOut();
    changeLogin(false);
  };

  const navigate = useNavigate();
  const handleViewClick = (order, index) => {
    // implementation for handling view click
    navigate(`/company/Order/${index}`, { state: { order } });
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
    <div className="flex h-screen bg-cyan-900 text-white">
      <div className="flex-1 ms-14">
        <div className="p-2 flex justify-between">
          <p className="text-3xl">Orders</p>
          <Button onClick={logout} variant="contained" color="error">
            Logout
          </Button>
        </div>
        <hr />
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
                </TableRow>
              </TableHead>
              <TableBody>
                {orders
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
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={orders.length}
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
