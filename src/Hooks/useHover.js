import React, { useState, useEffect } from 'react';

/*
  Accepts ref.
  Returns boolean - is hovering above this element(ref.current).
*/
export default function useHover(ref) {
  const [ hovering, setHovering ] = useState(false);
  
  useEffect(() => {

    const hoverEL = () => {
      setHovering(true);
    }

    const unhoverEL = () => {
      setHovering(false);
    }

    let element = ref.current;

    if (element) {
      element.addEventListener("mouseenter", hoverEL);
      element.addEventListener("mouseleave", unhoverEL);
    }
    return () => {
      if (element) {
        element.removeEventListener("mouseenter", hoverEL);
        element.removeEventListener("mouseleave", unhoverEL);
      }
    }
  });

  return hovering;
}