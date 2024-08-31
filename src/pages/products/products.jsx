import React, { useEffect, useState, useContext } from "react";
import { useCookies } from "react-cookie";
import { Skeleton, Snackbar } from "@mui/material";
import { AddShoppingCart, Favorite, FavoriteBorder } from "@mui/icons-material";
import { CartContext } from "../../context/cartContext";
import MuiAlert from "@mui/material/Alert";
import titleTrim from "../../hooks/titleTrim";
import Footer from "../../component/footer/footer";
import axios from "axios";
import useApplyDiscount from "../../hooks/useApplyDiscount";
import { useParams } from "react-router-dom";
import { FilterProduct } from "../filterproduct/filterproduct"; // Importing the new FilterSide component
import "./productCard.css";

export default function Products() {
  const { addToCart } = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [cookies, setCookie] = useCookies(["userWishlist"]);
  const [wishList, setWishList] = useState(cookies.userWishlist || []);
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  const handleCartClick = (product) => {
    addToCart(product);
    setOpen(true);
  };

  let params = useParams();
  console.log("Product.js", params);

  const handleWishListClick = (product) => {
    let updatedWishlist;
    if (wishList.some((item) => item.id === product.id)) {
      updatedWishlist = wishList.filter((item) => item.id !== product.id);
    } else {
      updatedWishlist = [...wishList, product];
    }
    setWishList(updatedWishlist);
    setCookie("userWishlist", updatedWishlist, { path: "/" });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (params.category === "Electronics") {
          const res = await axios.get(
            `https://fakestoreapi.in/api/products?limit=150`
          );
          setProducts(res.data.products);
        } else if (params.category === "Women's") {
          const [res1, res2, res3, res4, res5, res6, res7, res8] =
            await Promise.all([
              axios.get(
                `https://dummyjson.com/products/category/womens-dresses`
              ),
              axios.get(`https://dummyjson.com/products/category/womens-bags`),
              axios.get(`https://dummyjson.com/products/category/womens-shoes`),
              axios.get(`https://dummyjson.com/products/category/womens-watch`),
              axios.get(`https://dummyjson.com/products/category/beauty`),
              axios.get(
                `https://dummyjson.com/products/category/womens-jewellery`
              ),
              axios.get(`https://dummyjson.com/products/category/skin-care`),
              axios.get(`https://dummyjson.com/products/category/tops`),
            ]);
          const combinedWomens = [
            ...res1.data.products,
            ...res2.data.products,
            ...res3.data.products,
            ...res4.data.products,
            ...res5.data.products,
            ...res6.data.products,
            ...res7.data.products,
            ...res8.data.products,
          ];
          setProducts(combinedWomens);
        } else if (params.category === "Mens") {
          const [res1, res2, res3, res4] = await Promise.all([
            axios.get(`https://dummyjson.com/products/category/mens-shirts`),
            axios.get(`https://dummyjson.com/products/category/mens-shoes`),
            axios.get(`https://dummyjson.com/products/category/mens-watches`),
            axios.get(`https://dummyjson.com/products/category/sunglasses`),
          ]);
          const combinedMens = [
            ...res1.data.products,
            ...res2.data.products,
            ...res3.data.products,
            ...res4.data.products,
          ];
          setProducts(combinedMens);
          console.log(combinedMens);
        } else if (params.category === "Home Things") {
          const [res1, res2, res3, res4] = await Promise.all([
            axios.get(`https://dummyjson.com/products/category/furniture`),
            axios.get(`https://dummyjson.com/products/category/groceries`),
            axios.get(
              `https://dummyjson.com/products/category/kitchen-accessories`
            ),
            axios.get(
              `https://dummyjson.com/products/category/home-decoration`
            ),
          ]);
          const combinedHomes = [
            ...res1.data.products,
            ...res2.data.products,
            ...res3.data.products,
            ...res4.data.products,
          ];
          setProducts(combinedHomes);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [params.category]);

  const discountedProducts = useApplyDiscount(products, 30);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSort(event.target.value);
  };

  const getFilterOptions = () => {
    switch (params.category) {
      case "Electronics":
        return [
          "All",
          "Audio",
          "TV",
          "Appliances",
          "Gaming",
          "Mobile",
          "Laptop",
        ];
      case "Mens":
        return ["All", "Shirts", "Shoes", "Watches"];
      case "Women's":
        return [
          "All",
          "Dresses",
          "Bags",
          "Shoes",
          "Beauty",
          "Jewellery",
          "Skin-Care",
          "Tops",
        ];
      case "Home Things":
        return [
          "All",
          "Furniture",
          "Groceries",
          "Kitchen-Accessories",
          "Home-Decoration",
        ];
      default:
        return ["All"];
    }
  };

  const filteredProducts = discountedProducts.filter((product) =>
    filter === "All" || !filter
      ? true
      : product.category.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sort === "price-asc") {
      return a.price - b.price;
    } else if (sort === "price-desc") {
      return b.price - a.price;
    } else if (sort === "rating-asc") {
      return a.rating - b.rating;
    } else if (sort === "rating-desc") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <>
      <section>
        <FilterProduct
          filter={filter}
          sort={sort}
          handleFilterChange={handleFilterChange}
          handleSortChange={handleSortChange}
          getFilterOptions={getFilterOptions}
        />
        <div className="product-section">
          <div className="product-page-container">
            {sortedProducts.map((item) => (
              <div className="product-card" key={item.id}>
                {isLoading ? (
                  <Skeleton
                    sx={{ bgcolor: "GrayText" }}
                    variant="rectangular"
                    width={380}
                    height={300}
                  />
                ) : (
                  <div className="product-card-header">
                    <div className="product-tumb">
                      <img
                        src={
                          params.category === "Electronics"
                            ? item.image
                            : item.thumbnail
                        }
                        alt={item.title}
                      />
                    </div>
                    <div className="Offerbadge">
                      <div>30% OFF</div>
                    </div>
                  </div>
                )}
                {isLoading ? (
                  <Skeleton variant="rectangular" width={380} height={150} />
                ) : (
                  <div className="product-details">
                    <h5 className="product-title">
                      {titleTrim(item.title, 30)}
                    </h5>
                    <p>{titleTrim(item.description, 50)}</p>
                    <div className="product-bottom-details">
                      <div className="product-price">
                        <small>₹{(item.price / 0.7).toFixed(2)}</small>₹
                        {item.price.toFixed(2)}
                      </div>
                      <div className="product-links">
                        <div onClick={() => handleWishListClick(item)}>
                          {wishList.some(
                            (wishItem) => wishItem.id === item.id
                          ) ? (
                            <Favorite className="Icon favorite-filled" />
                          ) : (
                            <FavoriteBorder className="Icon" />
                          )}
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
          <div>
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
        </div>
      </section>
      <Footer />
    </>
  );
}
