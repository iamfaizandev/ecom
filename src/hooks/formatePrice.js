import { useMemo } from "react";

// Custom hook to format a price
function FormattedPrice(price, decimals = 2) {
  // Use useMemo to memoize the formatted price
  const formattedPrice = useMemo(() => {
    if (typeof price !== "number") {
      return "Invalid price";
    }
    return price.toFixed(decimals);
  }, [price, decimals]);

  return formattedPrice;
}

export default FormattedPrice;
