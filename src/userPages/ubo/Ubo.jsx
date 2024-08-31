import React, { useEffect, useState } from "react";
import HeaderandNav from "../../twoInOne/header&Nav/header&Nav";
import "./userbasedorders.css";
import OrderTracking from "../../pages/orderTrack/orderTrack";

export default function UserBasedOrders() {
  const [order, setOrder] = useState();

  return (
    <>
      <HeaderandNav />
      <div className="userBasedOrders">
        <OrderTracking />
      </div>
    </>
  );
}
