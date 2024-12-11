import React, { useEffect, useState } from "react";
import { OrderStatus, paymentStatus } from "../../Models/enums.model";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "../../Services/auth";
import { Button, Grid, Paper, Typography, Dialog, DialogContent } from "@mui/material";
import { getOrdersById } from "../../Services/orders";

export default function OrderDetails(props) {
  const { changeLogin } = props;
  const [order, setOrder] = useState(null);
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog
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
    const orderId = location?.state?.id;
    if (orderId) {
      getOrdersById(orderId)
        .then((resp) => {
          setOrder(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  // Handler to open/close the dialog
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  return (
    <div className="flex h-screen bg-cyan-900 text-white">
      <div className="flex-1 ms-14">
        <div className="p-2 flex justify-between">
          <Typography variant="h4">Order Details</Typography>
          <Button onClick={logout} variant="contained" color="error">
            Logout
          </Button>
        </div>
        <hr />
        <div className="mx-10 my-6">
          {order && (
            <Grid container spacing={4} className="my-6">
              {/* Order Summary */}
              <Grid item xs={12}>
                <Typography variant="h6">Order Summary</Typography>
                <p>
                  <strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Status:</strong> {getOrderStatus(order.orderStatus)}
                </p>
                <p>
                  <strong>Total Amount:</strong> ₹ {order.totalAmount}
                </p>
              </Grid>

              {/* Buyer Information */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Buyer Information</Typography>
                <p>
                  <strong>Name:</strong> {order.buyerResponse.name}
                </p>
                <p>
                  <strong>Email:</strong> {order.buyerResponse.email}
                </p>
              </Grid>

              {/* Shipping Address */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Shipping Address</Typography>
                <p>{order.orderAddress.addressLine1}</p>
                {order.orderAddress.addressLine2 && <p>{order.orderAddress.addressLine2}</p>}
                <p>
                  {order.orderAddress.city}, {order.orderAddress.state}, {order.orderAddress.country} - {order.orderAddress.pinCode}
                </p>
              </Grid>

              {/* Product Information */}
              <Grid item xs={12}>
                <Typography variant="h6">Products</Typography>
                {order.products.map((product) => (
                  <Paper key={product.id} className="p-4 mb-4">
                    <p>
                      <strong>Product:</strong> {product.name}
                    </p>
                    <p>
                      <strong>Price:</strong> ₹ {product.price}
                    </p>
                    <p>
                      <strong>Quantity:</strong> {product.quantity}
                    </p>
                  </Paper>
                ))}
              </Grid>

              {/* Payment Details */}
              <Grid item xs={12} md={6}>
                <Typography variant="h6">Payment Details</Typography>
                <p>
                  <strong>Payment Method:</strong> {order.paymentDetails.paymentMethod}
                </p>
                <p>
                  <strong>Amount:</strong> ₹ {order.paymentDetails.amount}
                </p>
                {/* View Button to open the Dialog */}
                <Button
                  onClick={handleDialogOpen}
                  variant="contained"
                  color="primary"
                  className="mt-2"
                >
                  View Payment Screenshot
                </Button>

                {/* Dialog to display the payment screenshot */}
                <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="sm" fullWidth>
                  <DialogContent>
                    <img
                      src={order.paymentDetails.paymentScreenshot}
                      alt="Payment Screenshot"
                      style={{ width: "100%" }}
                    />
                  </DialogContent>
                </Dialog>
              </Grid>

              {/* Offer Details */}
              {order.appliedOffer && (
                <Grid item xs={12} md={6}>
                  <Typography variant="h6">Applied Offer</Typography>
                  <img
                    src={order.appliedOffer.offerPhoto}
                    alt="Offer"
                    className="w-full max-w-sm"
                  />
                  <p>
                    <strong>Offer Name:</strong> {order.appliedOffer.offerName}
                  </p>
                  <p>
                    <strong>Offer Code:</strong> {order.appliedOffer.offerCode}
                  </p>
                 
                </Grid>
              )}
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
