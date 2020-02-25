import React, { useState } from 'react';
import TC from 'haniwa-type-checker';
import Components from "./Components";
import Containers from './Containers';
import Total from './Components/Total';
import LoadingWrapper from './LoadingWrapper/LoadingWrapper';
import * as CONSTS from './shared/constants';
import { sleep, fetchWithSleep } from './shared/utils';

export default function App(props) {

  const { activePage, setActivePage, userInfos, updateUserInfos, curUsername, 
    updateCurrentUsername, searchTerm, error, setError, loadingStatus, setLoadingStatus } = props;
  const user = userInfos[curUsername];
  const [loading, setLoading] = useState(false);
  let output = undefined;

  async function fetchInfo(username) {
    try {
      let beforeMillis = (new Date()).getTime();
      setLoadingStatus("Fetching user info...");
      const info = await fetchWithSleep(fetchMALUser)(username);
      setLoadingStatus("Fetching anime list...");
      const animelist = await fetchWithSleep(fetchMALUserAnimelist)(username, info.anime_stats.total_entries);
      setLoadingStatus("Fetching manga list...");
      const mangalist = await fetchWithSleep(fetchMALUserMangalist)(username, info.manga_stats.total_entries);
      let afterMillis = (new Date()).getTime();
      //console.log(`Elapsed: ${afterMillis - beforeMillis} ms`)
      return {info, animelist, mangalist};
    }
    catch(err) {    
      return null;
    }   
  }

  async function fetchMALUser(username) {
    TC.assert(TC.isString(username), "MALApp::fetchMALUser() - invalid username, must be a string!");
    const requestUrl = `${CONSTS.BASE_API_URL}${CONSTS.PATH_USER}${username}`;
    const respJson = await makeRequestGetJson(requestUrl);
    //console.log(respJson);
    return respJson;
  }

  async function fetchMALUserAnimelist(username, listSize) {
    TC.assert(TC.isString(username), "MALApp::fetchMALUserAnimelist() - invalid username, must be a string!");
    let curPage = 1;
    let fetched = 0;
    let animeList = [];
    while(fetched < listSize) {
      const requestUrl = `${CONSTS.BASE_API_URL}${CONSTS.PATH_USER}${username}/${CONSTS.PATH_ANIMELIST}/${curPage++}`;
      const respJson = await fetchWithSleep(makeRequestGetJson)(requestUrl);
      animeList = animeList.concat(respJson.anime);
      fetched += CONSTS.ENTRIES_ON_LIST_PAGE;
      //console.log(respJson);
    }
    return animeList;
  }

  async function fetchMALUserMangalist(username, listSize) {
    TC.assert(TC.isString(username), "MALApp::fetchMALUserMangalist() - invalid username, must be a string!");
    let curPage = 1;
    let fetched = 0;
    let mangaList = [];
    while(fetched < listSize) {
      const requestUrl = `${CONSTS.BASE_API_URL}${CONSTS.PATH_USER}${username}/${CONSTS.PATH_MANGALIST}/${curPage++}`;
      const respJson = await fetchWithSleep(makeRequestGetJson)(requestUrl);
      mangaList = mangaList.concat(respJson.manga);
      fetched += CONSTS.ENTRIES_ON_LIST_PAGE;
      //console.log(respJson);
    }
    return mangaList;
  }

  /*
    sets 'error' both if response is not ok(but tries again if 429),
    and on throw
  */
  async function makeRequestGetJson(url) {
    const { setError } = props;
    let attempt = 0;
    let response = undefined;
    while(attempt < CONSTS.MAX_FETCH_ATTEMPTS) {
      response = await fetch(url); 
      // if 429, trying to reconnect
      if(response.status === 429) {
        //console.log(`429: attempt ${attempt + 1}, sleeping...`);
        await sleep(CONSTS.API_SLEEP_INTERVAL);
        ++attempt;
        continue;
      }
      else break;
    }
    setError({
      isError: !response.ok,
      status: response.status,
      statusText: response.statusText,
    });
    const respJson = await response.json();
    return respJson;
  }

  function onSearchChange(event) {
    const { updateSearchTerm } = props;
    updateSearchTerm(event.target.value);
  }

  async function onSearchSubmit(event) {
    // already loading
    if(loading) return;
    const newUsername = searchTerm.trim();
    updateCurrentUsername(newUsername);
    // setting STATS as active page
    setActivePage(CONSTS.PAGES.STATS);
    // if cached we do not need to fetch
    if (userInfos[newUsername]) {
      setError({
        isError: false,
        status: 200,
        statusText: "OK",
      })
    } else {
      setLoading(true);
      const newUserInfo = await fetchInfo(newUsername);
      if(newUserInfo) {
        const { info, animelist, mangalist } = newUserInfo;
        updateUserInfos({
          ...userInfos,
          [newUsername]: (!info || !animelist || !mangalist) ? null : {info, animelist, mangalist}
        })
      }
      setLoading(false);
    }
  }

  const pages = <Containers.PagesContainer className={`${CONSTS.APP_CLASS_PREFIX}pages`}></Containers.PagesContainer>;
    // normal workflow
    if(user && !loading && !error.isError) {
      switch(activePage) {
      case CONSTS.PAGES.STATS:
        output = <div>{pages}
          <Total user={user}></Total></div>
        break;
      case CONSTS.PAGES.ANIME:
        output = <div>{pages}<Components.AnimeList 
          items={user.animelist}
          classPrefix={`${CONSTS.APP_CLASS_PREFIX}`}>
        </Components.AnimeList></div>;
        break;
      case CONSTS.PAGES.MANGA:
        output = <div>{pages}<Components.MangaList
          items={user.mangalist}
          classPrefix={`${CONSTS.APP_CLASS_PREFIX}`}>
        </Components.MangaList></div>;
        break;
      default:
        throw new Error("App::render() - invalid 'activePage'")
      }
    }
    else if(error.isError) {
      output = <Components.Error
        className={`${CONSTS.APP_CLASS_PREFIX}error`}
        classPrefix={`${CONSTS.APP_CLASS_PREFIX}error`}
        error={error}
      />
    }
    else output = null;
    return (
      <LoadingWrapper classPrefix="loader" loading={loading} loadingText={loadingStatus}>
        <div className={`${CONSTS.APP_CLASS_PREFIX}`}>
          <Components.Search 
            value={searchTerm}
            onChange={onSearchChange}
            // preventing default here, because osSearchSubmit is async, and page will be refreshed if we not do this here
            onSubmit={(event) => { event.preventDefault(); onSearchSubmit(event)}}
          />
          <div className={`${CONSTS.APP_CLASS_PREFIX}main`}>
            {output}
            {/*modal*/}
          </div>
        </div>
      </LoadingWrapper>
    );
}