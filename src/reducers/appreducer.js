import {PAGES, APP_CLASS_PREFIX} from '../shared/constants';

/*
    searchTerm - current text in search string,
    curUsername - last stable searched user name,
    userInfos = map of user infos, with usernames as keys and infos as values,
        used for caching
        Keys:
          info,
          animelist
    loading - shown if some data is fetching
    loadingStatus - info that will be shown to user, near loading mark
    showInfoPage - show/not show page with information about user
    tabs: tabs components and active tabs in them. It objects like:
      tabComponentsId : activeTab
*/
const INIT_STATE = {
  searchTerm: '',
  curUsername: '',
  userInfos: { },
  loadingStatus: '',
  activePage: PAGES.STATS,
  error: {
      isError: false,
      status: null,
      statusText: null,
  },
  tabs: {
    [`${APP_CLASS_PREFIX}info_animeGenres_tabs`]: "Popularity",
    [`${APP_CLASS_PREFIX}info_mangaGenres_tabs`]: "Popularity",
    [`${APP_CLASS_PREFIX}info_animeStudios_tabs`]: "Popularity",
    [`${APP_CLASS_PREFIX}info_mangaAuthors_tabs`]: "Popularity",
  },
};

const app = (state = INIT_STATE, action) => {
  switch(action.type) {
  case "SET_LOADING_STATUS":
      return ({
          ...state,
          loadingStatus: action.loadingStatus,
      })
  case "UPDATE_USER_INFOS":
      return ({
          ...state,
          userInfos: action.newUserInfos,
      });
  case "UPDATE_SEARCH_TERM":
      return ({
          ...state,
          searchTerm: action.newSearchTerm,
      });
  case "UPDATE_CURRENT_USERNAME":
      return ({
          ...state,
          curUsername: action.newUsername,
      });
  case "SET_ERROR":
      return ({
          ...state,
          error: action.newError,
      });
  case "SET_ACTIVE_PAGE":
      return ({
          ...state,
          activePage: action.pageId,
      });
  case "SET_ACTIVE_TAB_IN_TABS_COMPONENTS":
      return ({
        ...state,
        tabs: {
          ...state.tabs,
          [action.tabsComponentId] : action.tabName, 
        }
      })
  default: 
      return state;
  }
}

export default app;