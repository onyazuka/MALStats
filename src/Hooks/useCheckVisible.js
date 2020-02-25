import { useState, useEffect } from "react";

/*
  callback hook, with which we can anytime check if props.ref.current is visible on viewport
*/
export default function useCheckVisible(props) {
  let { ref, advance } = props;
  if (!advance) advance = 0;
  return function isElementVisible() {
    let element = ref.current;
    if(!element) return false;
    let elRect = element.getBoundingClientRect();
    // replaced conjunction with disjunction - should be a little faster
    return !(
      !(elRect.top < window.innerHeight + advance) ||
      !(elRect.left < window.innerWidth + advance) ||
      !(elRect.bottom > 0 - advance) ||
      !(elRect.right > 0 - advance) 
    );
  }
}