import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  IconButton,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { CartContext } from "../../context/cartContext";
import "./cart.css";
import Header from "../../component/header/header";
import Footer from "../../component/footer/footer";
import titleTrim from "../../hooks/titleTrim";

export default function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    emptyCart,
  } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  let params = useParams();

  const cartTotalQty = cart ? cart.reduce((acc, data) => acc + data.qty, 0) : 0;
  const cartTotalAmount = cart
    ? cart.reduce((acc, data) => acc + data.price * data.qty, 0)
    : 0;

  const handleOrder = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmOrder = () => {
    const orderId = `O1E${Math.floor(10000000 + Math.random() * 90000000)}`;
    navigate("/orderdetails", {
      state: {
        orderId,
        cart,
        totalAmount: cartTotalAmount,
        totalQty: cartTotalQty,
      },
    });
    setOpen(false);
  };

  return (
    <>
      <Header />
      <div className="cartContainer">
        <main>
          <div className="cartHeader">
            <div className="cartTitle h4" color="white">
              Cart Products {cart && cart.length > 0 ? `(${cart.length})` : ""}
            </div>
            {cart && cart.length > 0 && (
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={emptyCart}
                startIcon={<DeleteIcon />}
              >
                Empty Cart
              </Button>
            )}
          </div>

          {cart && cart.length === 0 ? (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              p={3}
            >
              <ShoppingCartIcon sx={{ fontSize: 40 }} />
              <Typography>Your Cart Is empty</Typography>
            </Box>
          ) : (
            <div>
              {cart.map((data, index) => {
                const { id, images, thumbnail, title, price, qty } = data;
                return (
                  <div className="cartProduct-container p-2" key={index}>
                    <div className="cartProduct-img ms-4">
                      <div>
                        {params.category === "Home Things" ? (
                          <img src={thumbnail} alt="" />
                        ) : (
                          <img src={images} alt={title} />
                        )}

                        <div className="cartProduct-name h6">
                          {titleTrim(title, 50)}
                        </div>
                      </div>
                    </div>

                    <div className=" cartProduct-action">
                      {/* <div className="cartProduct-price">₹{price}</div> */}
                      <IconButton
                        color="error"
                        onClick={() => removeFromCart(id)}
                      >
                        <DeleteIcon fontSize="large" />
                      </IconButton>
                      <IconButton onClick={() => decreaseQuantity(id)}>
                        <RemoveIcon />
                      </IconButton>
                      <Typography>{qty}</Typography>
                      <IconButton onClick={() => increaseQuantity(id)}>
                        <AddIcon />
                      </IconButton>
                    </div>
                    <div align="right">₹{(qty * price).toFixed(2)}</div>
                  </div>
                );
              })}
              <div
                className="cartProduct-footer"
                mt={3}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography>
                  Items in Cart:{" "}
                  <span className="text-danger">{cartTotalQty}</span>
                </Typography>
                <Typography>
                  Total Price:{" "}
                  <span className="text-danger">
                    ₹{cartTotalAmount.toFixed(2)}
                  </span>
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleOrder}
                >
                  Order
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Order</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to place the order?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmOrder} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Footer />
    </>
  );
}
