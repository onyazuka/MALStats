import React, { useState, useEffect, useRef } from 'react';
import { AnimeTableContainer } from '../Containers/TableContainer';
import { AnimeFiltersContainer } from '../Containers/FilterContainer';

const headers = [
  {
    contents: "", 
    attributes: { className: "table-header", id: "image", }, 
    field: "image", 
    sortable: false,
  },
  { 
    contents: "Title", 
    attributes: { className: "table-header clickable", id: "title", }, 
    field: "title", 
    sortable: true, 
    sortField: "titleRaw",
  },
  { 
    contents: "Type", 
    attributes: { className: "table-header clickable", id: "type", }, 
    field: "type", 
    sortable: true, 
    sortField: "type", 
  },
  { 
    contents: "Progress", 
    attributes: { className: "table-header clickable", id: "progress", }, 
    field: "progress", 
    sortable: true, 
    sortField: "progress_numeric",
  },
  { 
    contents: "Score", 
    attributes: { className: "table-header clickable", id: "score", }, 
    field: "score", 
    sortable: true, 
    sortField: "score",
  },
];

export default function AnimeList(props) {
  const { items, filters, classPrefix } = props;
  const [tableItems, setTableItems] = useState(createTableItems(items));
  function createTableItems(items) {
    if(!items) return [];
    return (items.map((anime) => {
      return {
        // only showing preview if component is previewable
        image: {
          contents: <a href={anime.url}><img src={anime.image_url} className={`${classPrefix}_contents_image`}></img></a>,
        },
        title: { 
          contents: <a href={anime.url}>{anime.title}</a>,
        },
        titleRaw: {
          contents: anime.title,
        },
        type: {
          contents: anime.type,
        },
        progress: {
          contents: `${anime.watched_episodes}/${anime.total_episodes}`,
        },
        progress_numeric: {
          contents: anime.watched_episodes === 0 && anime.total_episodes === 0 ? 0 : anime.watched_episodes / anime.total_episodes,
        },
        score: {
          contents: anime.score,
        },
      };
    }));
  }

  useEffect(() => {
    setTableItems(createTableItems(items));
  }, [items]);

  return (
    <div className="list_container">
      <AnimeFiltersContainer
        classPrefix={`${classPrefix}anime_filters`}
        types={["Movie", "ONA", "OVA", "Special", "TV"]}
      >
      </AnimeFiltersContainer>
      <AnimeTableContainer 
        className={`${classPrefix}anime_list table`}
        defaultSortField="titleRaw"
        headersMap={headers}
        defaultItems={tableItems}
        filters={filters}
        paginationSize={50}
      >
      </AnimeTableContainer>
    </div>
  );
}