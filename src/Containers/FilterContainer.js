import { connect } from 'react-redux';
import { setFilters } from '../actions';
import Filter from '../Components/Filter';

export function makeFilterContainer(type) {
  const stateVal = type === "anime" ? "animelist" : "mangalist";
  return connect(
    state => ({
      title: state[stateVal].filters.titleRaw,
      type: state[stateVal].filters.type,
      score: state[stateVal].filters.score,
    }),
    dispatch => ({
      setFilters: filters => dispatch(setFilters(filters, type)),
    })
  )(Filter);
}

export const AnimeFiltersContainer = makeFilterContainer("anime");
export const MangaFiltersContainer = makeFilterContainer("manga");