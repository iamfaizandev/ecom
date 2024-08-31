// src/components/Home.js
import "./home.css";
import Header from "../header/header";
import Slide from "../slides/slides";
import ProductCard from "../productCard/productCard";
import Footer from "../footer/footer";
import { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../nav/nav";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const staticCategories = [
    "electronics",
    "jewelery",
    "men's clothing",
    "women's clothing",
  ];

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <div className="home">
      <div>
        <div className="headerNav">
          <Header />
          {/* Pass both static and fetched categories to Nav */}
          <Nav staticCategories={staticCategories} categories={categories} />
          {/* <Nav categories={categories} /> */}
        </div>
        <Slide />
        <ProductCard />
        <Footer />
      </div>
    </div>
  );
}
