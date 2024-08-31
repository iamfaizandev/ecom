import React from "react";
import { Skeleton, Typography } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { AddShoppingCart, Favorite } from "@mui/icons-material";
import titleTrim from "../../hooks/titleTrim";
import { Link, useParams } from "react-router-dom";
import "./wishlist.css";
import Header from "../../component/header/header";

export function WishListItem({
  wishlist,
  isLoading,
  handleRemoveWishListClick,
  handleCartClick,
}) {
  let params = useParams();
  console.log(params);

  if (wishlist.length === 0) {
    return (
      <div className="empty-message-container">
        <p className="empty-message text-center text-danger fs-1">
          Your wishlist is empty
        </p>
      </div>
    );
  }

  return (
    <section>
      <Header />
      <div className="text mt-4 mb-0 ms-4">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            className="text-decoration-none text-dark h5"
            underline="hover"
            color="inherit"
            to="/"
          >
            Home
          </Link>
          <Typography color="text.primary">
            <span className="h5">Your Wishlist</span>
          </Typography>
        </Breadcrumbs>
      </div>
      <div className="wishlist-page">
        {wishlist.map((item) => (
          <div className="wishlist-product-card" key={item.id}>
            {isLoading ? (
              <Skeleton variant="rectangular" width={380} height={300} />
            ) : (
              <div className="product-card-header">
                <div className="product-tumb">
                  <img src={item.image} alt="" />
                </div>
              </div>
            )}
            {isLoading ? (
              <Skeleton variant="rectangular" width={380} height={150} />
            ) : (
              <div className="product-details">
                <h5 className="product-title">{titleTrim(item.title, 30)}</h5>
                <p>{titleTrim(item.description, 50)}</p>
                <div className="product-bottom-details">
                  <div className="product-price">
                    <small>₹{(item.price / 0.7).toFixed(2)}</small>₹
                    {item.price.toFixed(2)}
                  </div>
                  <div className="product-links">
                    <div onClick={() => handleRemoveWishListClick(item)}>
                      <Favorite className="Icon favorite-filled" />
                    </div>
                    <div>
                      <AddShoppingCart
                        className="Icon"
                        onClick={() => handleCartClick(item)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
