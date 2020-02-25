import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TC from 'haniwa-type-checker';


/*
  Wrapper to set 'loading' state of component while doing 'func'.
  After function completion, loading status is set to false.
  Timeout may be needed, for example, to prevent twitching on rendering.
*/
export async function withLoading(loadingStateSetter, func, timeout=0) {
  TC.assertAnd(TC.isFunction(loadingStateSetter), TC.isFunction(func), "withLoading() - functions are required");
  loadingStateSetter(true);
  const res = await func();
  setTimeout(() => loadingStateSetter(false), timeout ? timeout : 0);
  return res;
}

/*
  Returns loading component or childrent depending on loading status.
*/
export default function LoadingWrapper(props) {
  const { classPrefix, loading, loadingText, children } = props;
  const contents = loading ?
  <div className={`${classPrefix}_container`}>
    <div className={`${classPrefix}_inner_container`}>
      <div className={`${classPrefix}_inner`}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      <p className={`${classPrefix}_text`}>{loadingText}</p>
    </div>
  </div>
  : children;
  return contents;
};

LoadingWrapper.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadingText: PropTypes.string,
};