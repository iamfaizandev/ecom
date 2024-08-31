import { useEffect, useState } from "react";
import Header from "../../component/header/header";
import Nav from "../../component/nav/nav";
import axios from "axios";

export default function HeaderandNav() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products/categories").then((res) => {
      setCategories(res.data);
    });
  });
  return (
    <div>
      <Header />
      <Nav categories={categories} />
    </div>
  );
}
