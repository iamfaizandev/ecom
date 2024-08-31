import React, { useEffect, useState } from "react";
import "./nav.css";
import { Skeleton, IconButton } from "@mui/material";
import { Close, Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const staticCategories = ["Electronics", "Mens", "Women's", "Home Things"]; // Define your static categories here
  let navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  function menutoggle() {
    setMenuOpen(!menuOpen);
  }

  function closeClick() {
    setMenuOpen(!menuOpen);
  }
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      <nav className="navbarr">
        <ul
          className={`mt-3 mb-3 nav-links ${
            menuOpen ? "open" : ""
          } list-style-none`}
        >
          <li className="closeBtn">
            <IconButton onClick={closeClick}>
              <Close
                sx={{
                  color: "white",
                  width: "50px",
                  height: "40px",
                  marginLeft: "340px",
                  marginTop: "0px",
                  marginBottom: "0px",
                }}
              />
            </IconButton>
          </li>

          {staticCategories.map((category, index) =>
            loading ? (
              <Skeleton
                className="ms-4"
                variant="text"
                width={120}
                height={50}
                key={index}
              />
            ) : (
              <li
                key={index}
                value={category.toLocaleLowerCase()}
                onClick={() => navigate(`product/${category}`)}
              >
                <button
                  variant="text"
                  className="dropDownTxt text-white categoryName"
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              </li>
            )
          )}
        </ul>
        <div className="menu-icon-Skel">
          {loading ? (
            <Skeleton variant="text" width={50} height={50} />
          ) : (
            <div className="menu-icon" onClick={menutoggle}>
              <MenuIcon fontSize="large" sx={{ color: "white" }} />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
