import React, { useState, useEffect, useRef } from 'react';
import { MangaTableContainer } from '../Containers/TableContainer';
import { MangaFiltersContainer } from '../Containers/FilterContainer';

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

export default function MangaList(props) {
  const { items, filters, classPrefix } = props;
  const [tableItems, setTableItems] = useState(createTableItems(items));
  function createTableItems(items) {
    if(!items) return [];
    return (items.map((manga) => {
      return {
        // only showing preview if component is previewable
        image: {
          contents: <a href={manga.url}><img src={manga.image_url} className={`${classPrefix}_contents_image`}></img></a>,
        },
        title: { 
          contents: <a href={manga.url}>{manga.title}</a>,
        },
        titleRaw: {
          contents: manga.title,
        },
        type: {
          contents: manga.type,
        },
        progress: {
          contents: `${manga.read_chapters}/${manga.total_chapters}`,
        },
        progress_numeric: {
          contents: manga.read_chapters === 0 && manga.total_chapters === 0 ? 0 : manga.read_chapters / manga.total_chapters,
        },
        score: {
          contents: manga.score,
        },
      };
    }));
  }

  useEffect(() => {
    setTableItems(createTableItems(items));
  }, [items]);

  return (
    <div className="list_container">
      <MangaFiltersContainer
        classPrefix={`${classPrefix}manga_filters`}
        types={["Doujinhsi", "Manga", "One-shot", "Manhwa"]}
      >
      </MangaFiltersContainer>
      <MangaTableContainer 
        className={`${classPrefix}manga_list table`}
        defaultSortField="titleRaw"
        headersMap={headers}
        defaultItems={tableItems}
        filters={filters}
        paginationSize={50}
      >
      </MangaTableContainer>
    </div>
  );
}