import { PAGES } from  '../shared/constants'

let curId = 0;

export const setLoadingStatus = loadingStatus => ({
    type: "SET_LOADING_STATUS",
    id: curId++,
    loadingStatus,
})

export const updateUserInfos = newUserInfos => ({
    type: "UPDATE_USER_INFOS",
    id: curId++,
    newUserInfos,
});

export const updateSearchTerm = newSearchTerm => ({
    type: "UPDATE_SEARCH_TERM",
    id: curId++,
    newSearchTerm,
});

export const updateCurrentUsername = newUsername => ({
    type: "UPDATE_CURRENT_USERNAME",
    id: curId++,
    newUsername,
});

/*
    With this we can also unset errors.
*/
export const setError = newError => ({
    type: "SET_ERROR",
    id: curId++,
    newError,
});

export const setActivePage = pageId => {
    if(!(Object.values(PAGES).includes(pageId))) throw new Error("setActivePage() - 'pageId' not in PAGES");
    return {
        type: "SET_ACTIVE_PAGE",
        id: curId++,
        pageId,
    };
};

export const switchModalWindow = on => ({
    type: "SWITCH_MODAL_WINDOW",
    id: curId++,
    on,
});

export const setModalContents = contents => ({
    type: "SET_MODAL_CONTENTS",
    id: curId++,
    contents,
});

export const setActiveTabInTabsComponents = (tabsComponentId, tabName) => ({
    type: "SET_ACTIVE_TAB_IN_TABS_COMPONENTS",
    id: curId++,
    tabsComponentId,
    tabName,
});


// -------------------- lists

export const setListItems = (items, listType) => ({
    type: "SET_ITEMS",
    id: curId++,
    items,
    listType,
});

export const setListFilteredItems = (items, listType) => ({
    type: "SET_FILTERED_ITEMS",
    id: curId++,
    items,
    listType,
});

export const setListSortOrderAsc = (asc, listType) => ({
    type: "SET_SORT_ORDER_ASC",
    id: curId++,
    asc,
    listType,
});

export const setListSortField = (sortField, listType) => ({
    type: "SET_SORT_FIELD",
    id: curId++,
    sortField,
    listType,
});

export const setListPagesShown = (pagesShown, listType) => ({
    type: "SET_PAGES_SHOWN",
    id: curId++,
    pagesShown,
    listType,
});

export const setListMoreToShow = (moreToShow, listType) => ({
    type: "SET_MORE_TO_SHOW",
    id: curId++,
    moreToShow,
    listType,
});

export const setFilters = (filters, listType) => ({
    type: "SET_FILTERS",
    id: curId++,
    filters,
    listType,
});
