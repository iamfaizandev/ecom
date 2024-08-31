import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import Header from "../../component/header/header";
import "./orderdetails.css";
import Footer from "../../component/footer/footer";
import titleTrim from "../../hooks/titleTrim";
// import upi from "../../assets/upi.svg";
// import card from "../../assets/card.svg";
// import netBanking from "../../assets/net-banking.svg";

export default function OrderDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state;

  if (!orderDetails) {
    navigate("/notfound");
    return null; // Return early to avoid rendering the component
  }

  const { orderId, cart, totalAmount, totalQty } = orderDetails;

  function handlePayClick() {
    navigate("/payment", { state: { orderDetails } });
  }

  return (
    <>
      <Header />
      <div className="orderContainer">
        <main className="orderMain">
          <div className="orderHeader">
            <h4 className="orderHeading">Order Details</h4>
            <div className="orderId">Order ID: {orderId}</div>
          </div>

          <div className="orderContent">
            {cart.map((item, index) => (
              <div className="OrdercartContainer" key={index}>
                <div className="OrdercartImg">
                  <img src={item.image} alt="item" />
                  <div className="orderTitle">{titleTrim(item.title, 40)}</div>
                </div>
                <div className="orderPrice">₹{item.price}</div>
                <div className="orderQty">Qty: {item.qty}</div>
                <div className="orderSubtotal">
                  Subtotal: ₹{(item.qty * item.price).toFixed(2)}
                </div>
              </div>
            ))}
            <div className="total">
              <div className="orderQuantity">Total Quantity: {totalQty}</div>
              <div className="orderTotal">
                Total Amount: ₹{totalAmount.toFixed(2)}
              </div>
            </div>
          </div>

          {/* <div className="paymentContainer">
            <div className="payment-Title">Select Payment Method</div>
            <div className="pay-options">
              <RadioGroup>
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
            </div>
          </div> */}

          <div className="paymentBtn">
            <button className="btn btn-dark" onClick={handlePayClick}>
              Proceed to Payment
            </button>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
