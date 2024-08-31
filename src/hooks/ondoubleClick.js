import { useRef } from "react";

const OnDoubleClick = (onCopy) => {
  const elementRef = useRef(null);

  const handleDoubleClick = () => {
    if (elementRef.current) {
      const text = elementRef.current.innerText;
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      if (onCopy) {
        onCopy(text);
      }
    }
  };

  return [elementRef, handleDoubleClick];
};

export default OnDoubleClick;
