import React, { useState, useEffect, useContext } from "react";
import { useCookies } from "react-cookie";
import "./wishlist.css";
import { CartContext } from "../../context/cartContext";
import { WishListItem } from "./wishlistItem";

export default function Wishlist() {
  const [cookies, setCookie] = useCookies(["userWishlist"]);
  const [wishlist, setWishlist] = useState(cookies.userWishlist || []);
  const { addToCart } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setCookie("userWishlist", wishlist, { path: "/" });
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, [setCookie, wishlist]);

  useEffect(() => {}, []);

  const handleCartClick = (product) => {
    addToCart(product);
    setOpen(true);
  };

  const handleRemoveWishListClick = (product) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== product.id);
    setWishlist(updatedWishlist);
    setCookie("userWishlist", updatedWishlist, { path: "/" });
  };

  return (
    <div>
      <div className="wishlist-container">
        <section>
          <WishListItem
            wishlist={wishlist}
            isLoading={isLoading}
            handleRemoveWishListClick={handleRemoveWishListClick}
            handleCartClick={handleCartClick}
          />
        </section>
      </div>
    </div>
  );
}
