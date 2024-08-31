import { useState, useEffect } from "react";

const useApplyDiscount = (products, discountPercentage) => {
  const [discountedProducts, setDiscountedProducts] = useState([]);

  useEffect(() => {
    const applyDiscount = (product) => {
      const discountedPrice = product.price * (1 - discountPercentage / 100);
      return { ...product, price: discountedPrice };
    };

    const updatedProducts = products.map(applyDiscount);
    setDiscountedProducts(updatedProducts);
  }, [products, discountPercentage]);

  return discountedProducts;
};

export default useApplyDiscount;
