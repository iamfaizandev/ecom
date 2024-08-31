// File: src/components/LoadingSpinner.js
import React, { useState, useEffect } from "react";
import { BarLoader } from "react-spinners";
import "./LoadingSpinner.css"; // Create and import a CSS file for styling
import loadingGif from "../assets/loadinggif.gif";

const LoadingSpinner = () => {
  const [isSlowConnection, setIsSlowConnection] = useState(false);

  useEffect(() => {
    const checkConnectionSpeed = () => {
      const startTime = new Date().getTime();
      const img = new Image();
      img.src = "https://www.google.com/images/phd/px.gif";
      img.onload = () => {
        const endTime = new Date().getTime();
        const duration = endTime - startTime;
        if (duration > 2000) {
          // 1 second threshold for slow connection
          setIsSlowConnection(true);
        }
      };
      img.onerror = () => {
        setIsSlowConnection(true); // Fallback if image fails to load
      };
    };

    checkConnectionSpeed();
  }, []);

  return (
    <div className="loading-spinner-container bg-dark">
      {isSlowConnection ? (
        <div className="slow-connection-message">Your internet is slow</div>
      ) : (
        <span>
          {/* <img src={loadingGif} alt="" width={100} height={100} /> */}
          <BarLoader size={70} color="#ffffff" loading="Loading..." /> <br />
          <span className="text-center">Loading........</span>
        </span>
      )}
    </div>
  );
};

export default LoadingSpinner;
