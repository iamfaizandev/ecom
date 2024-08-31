import { useState } from "react";
import "./login.css";
import { TextField, Button, Snackbar, Avatar } from "@mui/material";
import { Google, Password, Person } from "@mui/icons-material";
import Avatarr from "../../assets/male_avatar_white.svg";
import { Link, useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import Header2 from "../header2/header2";
import Footer from "../footer/footer";
import { SigninwithGoogle } from "../../pages/signinwithgoogle/signinwithGoogle";

export default function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  /////alert
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="login_page">
      <Header2 />
      <section className="container-fluid">
        <main>
          <div className="form-bg">
            <div className="form_top">
              <Avatar
                className="avatar"
                alt="Remy Sharp"
                src={Avatarr}
                sx={{
                  width: 100,
                  height: 100,
                }}
              />
            </div>
            <form onSubmit={handleSubmit}>
              <TextField
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="info"
                name="email"
                label="Email"
                variant="outlined"
                placeholder="Enter Your Email Id"
                focused
                fullWidth
                margin="normal"
                InputProps={{
                  startAdornment: <Person position="start" className="me-2" />,
                }}
                InputLabelProps={{
                  style: {
                    color: "black",
                    fontSize: "150%",
                    fontFamily: "Playwrite IT Moderna ",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderWidth: "2px",
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                      borderWidth: "2px",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                      borderWidth: "2px",
                    },
                    backgroundColor: "transparent",
                    backdropFilter: "blur(5px)",
                  },
                }}
              />
              <TextField
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="Enter Your Password"
                focused
                InputProps={{
                  startAdornment: <Person position="start" className="me-2" />,
                }}
                InputLabelProps={{
                  style: {
                    color: "black",
                    fontSize: "150%",
                    fontFamily: "Playwrite IT Moderna ",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderWidth: "2px",
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                      borderWidth: "2px",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                      borderWidth: "2px",
                    },
                    backgroundColor: "transparent",
                    backdropFilter: "blur(5px)",
                  },
                }}
              />
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2, backgroundColor: "black" }}
                type="submit"
              >
                Login
              </Button>
              <div className="mt-4">
                <Link>Forget Password?</Link>
              </div>
              {/* <div>
                <SigninwithGoogle />
              </div> */}
              {/* <div className="d-flex justify-content-center ">
                <div className="mt-4 me-3 fw-bold">Sign In with</div>
                <Button
                  variant="text"
                  sx={{ mt: 2, borderColor: "white" }}
                  onClick={handleGoogleClick}
                >
                  <img
                    src={GoogleImg}
                    width="30"
                    height="30"
                    alt="loginWithGoogle"
                  />
                </Button>
              </div> */}
              <div className="newUser d-flex justify-content-center mt-4">
                <div className="fw-bold me-2">New User ?</div>
                <div>
                  <Link to="/signup " className="text-decoration-none">
                    {" "}
                    Sign Up
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </main>
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <MuiAlert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Text Copied
          </MuiAlert>
        </Snackbar>
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
