const INIT_STATE = {
  items: [],
  filteredItems: [],
  sortOrderAsc: true,
  sortField: "titleRaw",
  pagesShown: 0,
  moreToShow: false,
  filters: [],
};

function makeListReducer(type) {
  return (state = INIT_STATE, action) => {
    // nothing has changed
    if(action.listType != type) return state;
    switch(action.type) {
    case "SET_ITEMS": 
      return ({
        ...state,
        items: action.items,
      });
    case "SET_FILTERED_ITEMS": 
      return ({
        ...state,
        filteredItems: action.items,
      });
    case "SET_SORT_ORDER_ASC": 
      return ({
        ...state,
        sortOrderAsc: action.asc,
      });
    case "SET_SORT_FIELD": 
      return ({
        ...state,
        sortField: action.sortField,
      });
    case "SET_PAGES_SHOWN": 
      return ({
        ...state,
        pagesShown: action.pagesShown,
      });
    case "SET_MORE_TO_SHOW": 
      return ({
        ...state,
        moreToShow: action.moreToShow,
      });
    case "SET_FILTERS":
      return ({
        ...state,
        filters: action.filters,
      });
    default:
      return state;
    };
  };
}

export const animelist = makeListReducer("anime");
export const mangalist = makeListReducer("manga");