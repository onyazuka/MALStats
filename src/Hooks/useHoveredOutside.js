import { useState, useRef, useEffect } from "react";

/*
  calls 'handler' when hovered outside 'ref.current',
  but only if it remains unhovered after 'timeout' ms(which can be 0)
*/
export default function useHoveredOutside(ref, handler, timeout=0, exceptionsClassesCloseImmediately=[]) {
  function handleHover() {
    setHovered(true);
  }

  function handleUnhover(event) {
    const isException = exceptionsClassesCloseImmediately.some(exceptionClass => 
      event.relatedTarget && event.relatedTarget.closest(`.${exceptionClass}`)
    );
    if (isException) handler();
    else setHovered(false);
  }
  
  const [hovered, setHovered] = useState(false);
  const timer = useRef(null);

  useEffect(() => {
    if(hovered) {
      if(timer.current) {
        clearTimeout(timer.current);
      }
    }
    else {
      timer.current = setTimeout(handler, timeout);
    }
  }, [hovered]);


  useEffect(() => {
    const current = ref.current;
    // Bind the event listener
    current.addEventListener("mouseenter", handleHover);
    current.addEventListener("mouseleave", handleUnhover);
    return () => {
      // Unbind the event listener on clean up
      current.removeEventListener("mouseenter", handleHover);
      current.removeEventListener("mouseleave", handleUnhover);
      clearTimeout(timer.current);
    }
  });
}