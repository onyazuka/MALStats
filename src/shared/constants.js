// we can fetch info from api only once in a while, so need to do some sleep between requests
// delay should be 2 seconds, because there are max 2 request in a second, BUT 30 in a minute!
export const MAX_FETCH_ATTEMPTS = 10;
export const API_SLEEP_INTERVAL = 2000;
export const ENTRIES_ON_LIST_PAGE = 300;

export const APP_CLASS_PREFIX = "MALApp_";

export const BASE_API_URL = "https://api.jikan.moe/v3/";
export const PATH_USER = "user/";
export const PATH_ANIMELIST = "animelist/all";
export const PATH_MANGALIST = "mangalist/all"

export const PAGES = {
    STATS: 0,
    ANIME: 1,
    MANGA: 2,
};
