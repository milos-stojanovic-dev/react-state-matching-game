import { useRef, useState, useEffect } from "react";

const useHover = () => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);

  const enter = () => {
    setHovered(true);
  };

  const leave = () => {
    setHovered(false);
  };

  useEffect(() => {
    return () => {
      const refCopy = ref;
      refCopy.current.removeEventListener("mouseenter", enter);
      refCopy.current.removeEventListener("mouseleave", leave);

      refCopy.current.addEventListener("mouseenter", enter);
      refCopy.current.addEventListener("mouseleave", leave);

    };
  });
  return [ref, hovered];
};

export default useHover;
