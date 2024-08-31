import { useState } from "react";
import "./register.css";
import Header from "../header/header";
import { TextField, Button, Snackbar, Avatar } from "@mui/material";
import { Password, Person, Phone } from "@mui/icons-material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import Avatarr from "../../assets/personSvg.svg";
import { Link, useNavigate } from "react-router-dom";
import MuiAlert from "@mui/material/Alert";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useCookies } from "react-cookie";
import Footer from "../footer/footer";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function Register() {
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [cookies, setCookie] = useCookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [phone, setPhone] = useState("");
  const [isLengthValid, setIsLengthValid] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);

  const handlePasswordChange = (e) => {
    const pw = e.target.value;
    setPassword(pw);

    // Check length (between 8 and 20 characters)
    setIsLengthValid(pw.length >= 8 && pw.length <= 20);

    // Check for at least one special character
    setHasSpecialChar(/[!@#$%^&*(),.?":{}|<>]/.test(pw));

    // Check for at least one uppercase letter
    setHasUpperCase(/[A-Z]/.test(pw));

    // Check for at least one number
    setHasNumber(/\d/.test(pw));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      if (user) {
        await setDoc(doc(db, "Users", user.uid), {
          email: user.email,
          firstName: fname,
          lastName: lname,
          phoneNo: phone,
        });
        setCookie("Email", user.email);
        setCookie("FirstName", fname);
        setCookie("LastName", lname);
        setCookie("PhoneNo", phone);
      }

      setOpen(true);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="Register_page">
      <Header />
      <section className="container-fluid">
        <main>
          <div className="form-bg">
            <div className="form_top">
              <Avatar
                className="avatar"
                alt="Remy Sharp"
                src={Avatarr}
                sx={{ width: 100, height: 100 }}
              />
            </div>
            <form onSubmit={handleRegister}>
              <TextField
                onChange={(e) => setFname(e.target.value)}
                value={fname}
                required
                name="firstname"
                label="First Name"
                placeholder="First Name"
                type="text"
                variant="outlined"
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
                onChange={(e) => setLname(e.target.value)}
                value={lname}
                required
                name="lastname"
                label="Last Name"
                placeholder="Last Name"
                type="text"
                variant="outlined"
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
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                name="email"
                label="Email Id"
                variant="outlined"
                placeholder="example@gmail.com"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  style: {
                    color: "black",
                    fontSize: "150%",
                    fontFamily: "Playwrite IT Moderna ",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <AlternateEmailIcon position="start" className="me-2" />
                  ),
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
                onChange={(e) => {
                  const phoneInput = e.target.value;
                  // Allow only numbers and restrict to 10 digits
                  if (/^\d{0,10}$/.test(phoneInput)) {
                    setPhone(phoneInput);
                  }
                }}
                value={phone}
                required
                name="phone"
                label="Phone No"
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="10-digit Phone No"
                InputLabelProps={{
                  style: {
                    color: "black",
                    fontSize: "150%",
                    fontFamily: "Playwrite IT Moderna",
                  },
                }}
                InputProps={{
                  startAdornment: <Phone position="start" className="me-2" />,
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
                onChange={handlePasswordChange}
                value={password}
                required
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder="Create Your Password"
                InputLabelProps={{
                  style: {
                    color: "black",
                    fontSize: "150%",
                    fontFamily: "Playwrite IT Moderna ",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <Password position="start" className="me-2" />
                  ),
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

              <div className="passwordIntrus">
                <ul>
                  <li className="text-dark">
                    <span className="passwordIcon">
                      {isLengthValid ? (
                        <CheckCircleIcon sx={{ color: "green" }} />
                      ) : (
                        <CancelIcon sx={{ color: "red" }} />
                      )}
                    </span>
                    8-20 characters
                  </li>
                  <li>
                    <span className="passwordIcon">
                      {hasSpecialChar ? (
                        <CheckCircleIcon sx={{ color: "green" }} />
                      ) : (
                        <CancelIcon sx={{ color: "red" }} />
                      )}
                    </span>
                    1 special character
                  </li>
                  <li>
                    <span className="passwordIcon">
                      {hasUpperCase ? (
                        <CheckCircleIcon sx={{ color: "green" }} />
                      ) : (
                        <CancelIcon sx={{ color: "red" }} />
                      )}
                    </span>
                    1 uppercase letter
                  </li>
                  <li>
                    <span className="passwordIcon">
                      {hasNumber ? (
                        <CheckCircleIcon sx={{ color: "green" }} />
                      ) : (
                        <CancelIcon sx={{ color: "red" }} />
                      )}
                    </span>
                    1 number
                  </li>
                </ul>
              </div>

              <Button
                variant="contained"
                color="info"
                sx={{ mt: 2, width: "60%" }}
                type="submit"
              >
                Sign Up
              </Button>
              {/* <SigninwithGoogle /> */}
              <div className="newUser d-flex justify-content-center mt-4">
                <div className="fw-bold me-2">Already have an account?</div>
                <div>
                  <Link to="/login" className="">
                    Log In
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
            You Are Registered
          </MuiAlert>
        </Snackbar>
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
