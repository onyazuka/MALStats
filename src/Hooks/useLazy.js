import { useState, useEffect } from 'react';
import useCheckVisible from './useCheckVisible';


/*
  Calls callback if props.ref.current is visible.
  May be used for lazy loading.
  Props:
    ref,
    callback,
    timeout - time interval for checking element visibility,
*/
export default function useLazy(props) {

  const checkIsVisible = useCheckVisible({
    ref: props.ref,
  });

  useEffect(() => {
    const callback = () => {
      if (checkIsVisible()) props.callback();
    }
    const timeout = props.timeout ? props.timeout : 500;
    let interval = setInterval(callback, timeout);
    return () => {
      if(interval) clearInterval(interval);
    }
  });
}