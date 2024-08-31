import { useEffect, useState } from "react";
import Nav from "../../component/nav/nav";
import axios from "axios";

export default function NavForPage() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("https://fakestoreapi.com/products/categories").then((res) => {
      setCategories(res.data);
    });
  });
  return (
    <div>
      <Nav categories={categories} />
    </div>
  );
}
