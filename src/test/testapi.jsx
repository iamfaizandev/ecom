import "../pages/products/productCard.css";
import React, { useEffect, useState } from "react";
import { AddShoppingCart } from "@mui/icons-material";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

export default function Testapi() {
  const [weather, setWeather] = useState();
  const [apiKey] = useState("6c86a60f6f7efb3dbb261072d85000dd");
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=${apiKey}`
      )
      .then((res) => {
        console.log(res.data);
        setWeather(res.data);
      });
  }, [apiKey]);

  return (
    <div className="elecPage">
      <div className="elec-container">
        {weather.map((item) => (
          <div className="product-card" key={item.id}>
            <div className="product-card-header">
              <div className="badge">30% OFF</div>
              <div className="product-tumb">
                <img src={item.thumbnail} alt="" />
              </div>
            </div>
            <div className="product-details">
              <h5 className="product-title">{item.title}</h5>
              <p>{item.description}</p>
              <div className="product-bottom-details">
                <div className="product-price">
                  <small>₹{(item.price / 0.7).toFixed(2)}</small>₹
                  {item.price.toFixed(2)}
                </div>
                <div>{item.category}</div>
                <div className="product-links">
                  <div></div>
                  <div>
                    <AddShoppingCart className="Icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
