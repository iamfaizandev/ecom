import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import notFound from "../../assets/notfound.gif";
import "./notfound.css";
import { Home, Person } from "@mui/icons-material";

export default function Nofound() {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="gif">
        <img src={notFound} alt="" />
      </div>
      <div className="notfound-error">
        <h4>
          Page Not Found <br />
          Follow Navigation
        </h4>
        <button
          className="text-white btn btn-dark mt-4"
          onClick={() => navigate("/")}
        >
          <Home />
        </button>
        <button
          className="text-white btn btn-dark mt-4 ms-2"
          onClick={() => navigate("/login")}
        >
          <Person />
        </button>
      </div>
    </Container>
  );
}
