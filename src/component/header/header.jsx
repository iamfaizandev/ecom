import {
  Favorite,
  Login,
  Logout,
  Person,
  ShoppingCart,
  ViewInAr,
} from "@mui/icons-material";
import { Dropdown } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Badge from "@mui/material/Badge";
import "./header.css";
import { useState, useEffect, useContext } from "react";
import { CartContext } from "../../context/cartContext";
import { useCookies } from "react-cookie";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Avatar } from "@mui/material";
import personSvg from "../../assets/personSvg.svg";

export default function Header() {
  let navigate = useNavigate();
  const [loading, setIsLoading] = useState(true);
  const { cart } = useContext(CartContext);
  const cartItemCount = cart.reduce((acc, item) => acc + item.qty, 0);

  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies([
    "username",
    "password",
    "userWishlist",
    "userOrderlist",
    "firstname",
    "lastname",
  ]);

  const fetchUserData = async () => {
    auth.onAuthStateChanged(async (userData) => {
      if (userData) {
        const docRef = doc(db, "Users", userData.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUser(docSnap.data().firstName);
        }
      } else {
        setUser(null);
      }
    });
  };

  useEffect(() => {
    fetchUserData();
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [cookies]);

  function handleCartClick() {
    navigate("/viewcart");
  }

  function handleUboClick() {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/ubOrder");
    }
  }

  function handleWishlistClick() {
    if (!user) {
      navigate("/login");
    } else {
      navigate("/wishlist");
    }
  }

  function handleProfileClick() {
    console.log("User:", user);
    if (!user) {
      console.log("Navigating to login");
      navigate("/login");
    } else {
      console.log("Navigating to profile");
      navigate("/profile");
    }
  }

  function handleLogout() {
    // Add your logout functionality here, such as calling the auth signOut method
    auth.signOut().then(() => {
      removeCookie("username");
      removeCookie("password");
      removeCookie("firstname");
      removeCookie("lastname");
      setUser(null);
      navigate("/");
    });
  }

  return (
    <div className="header">
      <header>
        <div className="header-container">
          <div className="brand_logo">
            {loading ? (
              <Skeleton
                variant="text"
                sx={{ bgcolor: "grey.900" }}
                width={150}
                height={50}
              />
            ) : (
              <NavLink to="/" title="Home">
                <h1>
                  <span className="">On</span>
                  <span className="text-danger">E</span>.com
                </h1>
              </NavLink>
            )}
          </div>

          <div className="accountCart">
            <div className="dropdown">
              {loading ? (
                <Skeleton
                  variant="text"
                  sx={{ bgcolor: "grey.900" }}
                  width={100}
                  height={50}
                />
              ) : (
                <Dropdown>
                  <Dropdown.Toggle as="span" style={{ cursor: "pointer" }}>
                    {user ? (
                      <>
                        <Avatar
                          className="me-2"
                          src={personSvg}
                          alt={cookies.firstname}
                          sx={{ width: 30, height: 30 }}
                        />
                      </>
                    ) : (
                      <Person fontSize="large" />
                    )}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {!user && (
                      <Dropdown.Item
                        className="d-flex align-items-center"
                        onClick={() => navigate("/signup")}
                      >
                        <div className="d-flex justify-content-between">
                          <div className="me-4">New Customer ?</div>
                          <div>Sign Up</div>
                        </div>
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item
                      onClick={handleProfileClick}
                      className="d-flex align-items-center"
                    >
                      <span className="me-2">
                        <Person />
                      </span>
                      My Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={handleUboClick}
                      className="d-flex align-items-center"
                    >
                      <span className="me-2">
                        <ViewInAr />
                      </span>
                      My Orders
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={handleWishlistClick}
                      className="d-flex align-items-center"
                    >
                      <span className="me-2">
                        <Favorite />
                      </span>
                      My Wishlist
                    </Dropdown.Item>
                    {user ? (
                      <Dropdown.Item
                        onClick={handleLogout}
                        className="d-flex align-items-center"
                      >
                        <span className="me-2">
                          <Logout />
                        </span>
                        Logout
                      </Dropdown.Item>
                    ) : (
                      <Dropdown.Item
                        className="d-flex align-items-center"
                        onClick={() => navigate("/login")}
                      >
                        <span className="me-2">
                          <Login />
                        </span>
                        Login
                      </Dropdown.Item>
                    )}
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </div>
            <div className="cart">
              {loading ? (
                <Skeleton
                  variant="circular"
                  sx={{ bgcolor: "grey.900" }}
                  width={40}
                  height={40}
                />
              ) : (
                <Dropdown style={{ cursor: "pointer" }}>
                  <Badge badgeContent={cartItemCount} color="error">
                    <ShoppingCart onClick={handleCartClick} fontSize="large" />
                  </Badge>
                </Dropdown>
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
