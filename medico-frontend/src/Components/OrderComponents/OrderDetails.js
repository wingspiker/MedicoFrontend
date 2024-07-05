import React, { useEffect, useState } from "react";
import { OrderStatus, paymentStatus } from "../../Models/enums.model";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "../../Services/auth";
import { Button, Grid, Paper } from "@mui/material";

export default function OrderDetails(props) {
  const { changeLogin } = props;
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    signOut();
    changeLogin(false);
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

  const goBack = () => {
    navigate(-1);
  };

  const location = useLocation();
  useEffect(() => {
    const order = location?.state?.order;
    setOrder(order);
  }, []);

  return (
    <div className="flex h-screen bg-cyan-900 text-white">
      <div className="flex-1 ms-14">
        <div className="p-2 flex justify-between">
          <p className="text-3xl">Order Details</p>

          <Button onClick={logout} variant="contained" color="error">
            Logout
          </Button>
        </div>
        <hr />
        <div className="mx-10 my-6">
          {order && (
            <Grid container spacing={2} className="my-6">
              <Grid item xs={12} md={6}>
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Status:</strong> {getOrderStatus(order.orderStatus)}
                </p>
                <p>
                  <strong>Payment Status:</strong>{" "}
                  {getPaymentStatus(order.paymentStatus)}
                </p>
                <p>
                  <strong>Total Amount:</strong> ${order.totalAmount}
                </p>
              </Grid>
              <Grid item xs={12} md={6}>
                <h3>Shipping Address</h3>
                <p>{order.orderAddress.addressLine1}</p>
                {order.orderAddress.addressLine2 && (
                  <p>{order.orderAddress.addressLine2}</p>
                )}
                <p>
                  {order.orderAddress.city}, {order.orderAddress.state}
                </p>
                <p>
                  {order.orderAddress.country} - {order.orderAddress.pinCode}
                </p>
              </Grid>
            </Grid>
          )}
          <Button
            onClick={goBack}
            variant="contained"
            sx={{ marginRight: 2 }}
            color="primary"
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
}
