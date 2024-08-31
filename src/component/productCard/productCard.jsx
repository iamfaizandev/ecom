// ProductCard.js
import { useEffect, useState, useContext } from "react";
import "./productCard.css";
import axios from "axios";
import trimTitle from "../nav/trim";
import { Skeleton } from "@mui/material";
import { Favorite } from "@mui/icons-material";
import { CartContext } from "../../context/cartContext";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function ProductCard() {
  const { addToCart } = useContext(CartContext);
  const [sampleProduct, setSampleProduct] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [open, setOpen] = useState(false);

  const handleCartClick = (product) => {
    addToCart(product);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsloading(false);
    }, 2000);

    axios.get("https://fakestoreapi.com/products?limit=3").then((res) => {
      setSampleProduct(res.data);
    });
  }, []);

  return (
    <div className="product-container">
      <div>
        <h3>
          Based on Your Interest{" "}
          <Favorite color="error" fontSize="large" className="mb-1" />
        </h3>
      </div>
      <div className="section">
        {sampleProduct.map((items) =>
          isLoading ? (
            <Skeleton
              key={items.id}
              variant="rectangular"
              width={300}
              height={300}
            />
          ) : (
            <div key={items.id} className="productCard">
              <img src={items.image} alt="productPoster" />
              <div className="product-info">
                <h6>{trimTitle(items.title, 20)}</h6>
                <p>₹{items.price}</p>
                <div
                  className="addtocart"
                  onClick={() => handleCartClick(items)}
                >
                  Add To Cart
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert
          onClose={handleClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Product added to cart!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
