import { connect } from 'react-redux';
import { setListItems, setListFilteredItems, setListSortOrderAsc, setListSortField, setListPagesShown, setListMoreToShow } from '../actions';
import Table from '../Table/Table';


export function makeTableContainer(type) {
  const stateVal = type === "anime" ? "animelist" : "mangalist";
  return connect(
    state => ({
      items: state[stateVal].items,
      filteredItems: state[stateVal].filteredItems,
      sortOrderAsc: state[stateVal].sortOrderAsc,
      sortField: state[stateVal].sortField,
      pagesShown: state[stateVal].pagesShown,
      moreToShow: state[stateVal].moreToShow,
      filters: state[stateVal].filters,
    }),
    dispatch => ({
      changeItems: items => dispatch(setListItems(items, type)),
      changeFilteredItems: items => dispatch(setListFilteredItems(items, type)),
      setSortOrderAsc: asc => dispatch(setListSortOrderAsc(asc, type)),
      setSortField: sortField => dispatch(setListSortField(sortField, type)),
      setPagesShown: pagesShown => dispatch(setListPagesShown(pagesShown, type)),
      setMoreToShow: moreToShow => dispatch(setListMoreToShow(moreToShow, type)),
    })
  )(Table);
}

export const AnimeTableContainer = makeTableContainer("anime");
export const MangaTableContainer = makeTableContainer("manga");