import * as CONSTS from './constants';

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function fetchWithSleep(fetchFunc) {
  return async function(...args) {
    let beforeMillis = (new Date()).getTime();
    let res = await fetchFunc(...args);
    let afterMillis = (new Date()).getTime();
    let delta = CONSTS.API_SLEEP_INTERVAL - (afterMillis - beforeMillis);
    let toSleep = delta >= 0 ? delta : 0;
    await sleep(toSleep);
    return res;
  }
}

String.prototype.capitalize = function() {
  if (this.length === 0) return this;
  return String.prototype.concat(this.substring(0, 1).toUpperCase(), this.substring(1));
}