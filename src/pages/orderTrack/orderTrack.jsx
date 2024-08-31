import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Breadcrumbs,
} from "@mui/material";
import "./OrderTracking.css";
import { Home, Person } from "@mui/icons-material";

const steps = [
  "Order Placed",
  "Order Packed",
  "Shipped",
  "Out for Delivery",
  "Delivered",
];

export default function OrderTracking({ orderId }) {
  const location = useLocation();
  let navigate = useNavigate();
  const { orderData } = location.state || { orderData: {} };
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const currentStep = orderData.trackingStatus
      ? steps.indexOf(orderData.trackingStatus)
      : -1;
    setActiveStep(currentStep >= 0 ? currentStep : 0);
  }, [orderData]);

  return (
    <>
      <div className="Breadcrumbs">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            className="text-decoration-none text-dark h5"
            underline="hover"
            color="inherit"
            to="/"
          >
            Home
          </Link>
          <Typography color="text.primary">
            <span className="h5">Your Orders</span>
          </Typography>
        </Breadcrumbs>
      </div>
      <div className="tracking-container">
        {orderData.trackingStatus ? (
          <div>
            <Typography variant="h4" gutterBottom>
              Order Tracking
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Order ID: {orderData.orderId}
            </Typography>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
        ) : (
          <Typography variant="body1" gutterBottom>
            <h4> No order yet</h4>
          </Typography>
        )}

        <div className="orderItems">
          {orderData.cart &&
            orderData.cart.map((item, index) => (
              <div key={index} className="orderItem">
                <img src={item.image} alt={item.title} />
                <div>
                  <h5>{item.title}</h5>
                  <p>Price: ₹{item.price}</p>
                  <p>Qty: {item.qty}</p>
                </div>
              </div>
            ))}
        </div>
        <div>
          <button
            className="text-white btn btn-dark mt-4"
            onClick={() => navigate("/")}
          >
            <Home />
          </button>
        </div>
        {/* {orderData.trackingStatus ? (
        
      ) : (
       
      )} */}
      </div>
    </>
  );
}
