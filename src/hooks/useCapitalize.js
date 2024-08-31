// useCapitalize.js
import { useCallback } from "react";

const useCapitalize = () => {
  const capitalizeText = useCallback((text) => {
    if (!text) return "";
    return (
      text.trim().charAt(0).toUpperCase() + text.trim().slice(1).toLowerCase()
    );
  }, []);

  return capitalizeText;
};

export default useCapitalize;
