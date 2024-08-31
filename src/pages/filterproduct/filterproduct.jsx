import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./productfilter.css"; // Corrected path
import { Skeleton } from "@mui/material";
import { Dropdown } from "react-bootstrap";
import Badge from "@mui/material/Badge";

import {
  Favorite,
  FavoriteBorder,
  Home,
  ShoppingCart,
} from "@mui/icons-material";
import { CartContext } from "../../context/cartContext";
export function FilterProduct({
  filter,
  sort,
  handleFilterChange,
  handleSortChange,
  getFilterOptions,
}) {
  const { cart } = useContext(CartContext);
  const cartItemCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const [Isloading, setIsLoading] = useState(true);
  let params = useParams();

  let navigate = useNavigate();
  function handleCartClick() {
    navigate("/viewcart");
  }
  function handleFvtClick() {
    navigate("/wishlist");
  }
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [params.catehory]);
  return (
    <div className="filterSide">
      {Isloading ? (
        <Skeleton
          sx={{ bgcolor: "grey.900" }}
          className="home-container"
          width={40}
          height={40}
          variant="rectangular"
        />
      ) : (
        <div className="home-container">
          <Link to="/">
            <Home fontSize="large" />
          </Link>
        </div>
      )}
      <div className="category-container ">
        {Isloading ? (
          <Skeleton
            sx={{ bgcolor: "grey.900" }}
            variant="rounded"
            width={200}
            height={50}
          />
        ) : (
          <div className="category-filter">
            <div>
              <select
                className="form-select"
                value={filter}
                onChange={handleFilterChange}
              >
                {getFilterOptions().map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
      <div className="sort-container">
        {Isloading ? (
          <Skeleton
            sx={{ bgcolor: "grey.900" }}
            variant="rounded"
            width={200}
            height={50}
          />
        ) : (
          <div className="sort-filter">
            <select
              className="form-select"
              value={sort}
              onChange={handleSortChange}
            >
              <option value="">None</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-asc">Rating: Low to High</option>
              <option value="rating-desc">Rating: High to Low</option>
            </select>
          </div>
        )}
      </div>
      <div className="cart-container d-flex">
        {Isloading ? (
          <Skeleton
            variant="circular"
            sx={{ bgcolor: "grey.900" }}
            width={40}
            height={40}
          />
        ) : (
          <Dropdown style={{ cursor: "pointer" }}>
            <Badge className="badge" badgeContent={cartItemCount} color="error">
              <ShoppingCart onClick={handleCartClick} fontSize="large" />
            </Badge>
          </Dropdown>
        )}
        <div className="wishList-container ms-2">
          {Isloading ? (
            <Skeleton
              variant="circular"
              sx={{ bgcolor: "grey.900" }}
              width={40}
              height={40}
            />
          ) : (
            <FavoriteBorder
              cursor="pointer"
              onClick={handleFvtClick}
              fontSize="large"
              sx={{ color: "white" }}
              className="mt-1"
            />
          )}
        </div>
      </div>
    </div>
  );
}
