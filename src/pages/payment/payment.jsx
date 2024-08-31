import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import upi from "../../assets/upi.svg";
import card from "../../assets/card.svg";
import netBanking from "../../assets/net-banking.svg";
import "./payment.css";
import { useCookies } from "react-cookie";

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [cookies, setCookies] = useCookies(["userOrder"]);
  const navigate = useNavigate();
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;

  const handlePayment = () => {
    setTimeout(() => {
      const orderData = {
        orderId: orderDetails.orderId,
        trackingStatus: "Order Placed",
        ...orderDetails,
      };

      // Set cookie with order details
      setCookies("userOrder", JSON.stringify(orderData), { path: "/" });

      const existingOrders =
        JSON.parse(localStorage.getItem("userOrders")) || [];
      existingOrders.push(orderData);
      localStorage.setItem("userOrders", JSON.stringify(existingOrders));

      navigate("/ordertracking", { state: { orderData } });
    }, 2000);
  };

  if (!orderDetails) {
    navigate("/notfound");
    return null;
  }

  return (
    <div className="payment-container">
      <Typography variant="h4" gutterBottom={true}>
        Payment Gateway
      </Typography>
      <RadioGroup
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <FormControlLabel
          value="upi"
          control={<Radio />}
          label={<img alt="upi" src={upi} />}
        />
        <FormControlLabel
          value="card"
          control={<Radio />}
          label={<img alt="card" src={card} />}
        />
        <FormControlLabel
          value="netbanking"
          control={<Radio />}
          label={<img alt="netbanking" src={netBanking} />}
        />
      </RadioGroup>
      <button className="btn btn-primary" onClick={handlePayment}>
        Pay Now
      </button>
    </div>
  );
}
