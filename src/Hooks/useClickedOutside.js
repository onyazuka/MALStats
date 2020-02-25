import { useEffect } from "react";

// calls 'handler' when clicked outside 'ref.current'
export default function useClickedOutside(ref, handler) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      handler();
    }
  }

  useEffect(() => {
    // Bind the event listener
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutside);
    }
  })
}