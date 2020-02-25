import React, { useCallback, useLayoutEffect, useRef } from 'react';

/*
  Can be useful for async updates.
  Prevents warnings like " Can't perform a React state update on an unmounted component. This is a no-op...".
*/
export default function useMounted() {
  const mounted = useRef(true);
  // providing getter so we can get actual state each time
  const get = useCallback(() => mounted.current, []);
  // I am using useLayoutEffect here to update state synchronously after render, so preventing state update gaps
  useLayoutEffect(() => {
    mounted.current = true;
    return () => mounted.current = false;
  });
  return get;
}

export function wrapWithCheckMounted(checker, func) {
  return function(...args) {
    if(checker) func(...args);
  }
}