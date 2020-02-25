import React, { useState, useEffect, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { sortItems, filterItems, paginateItems } from './common'; 

/*
  Simple table with header sorting support.
  Props:
    paginationSize - if 0, pagination is disabled!
*/
export default function Table(props) {
  const { className, paginationSize, defaultSortField, headersMap, defaultItems, filters,
    items, changeItems, filteredItems, changeFilteredItems, sortOrderAsc, setSortOrderAsc,
    sortField, setSortField, pagesShown, setPagesShown, moreToShow, setMoreToShow } = props;

  function changeSortField(field) {
    setSortOrderAsc(field === sortField ? !sortOrderAsc : true);
    setSortField(field);
  }

  useLayoutEffect(() => {
    setPagesShown(pagesShown ? pagesShown : 1); 
  }, [className, paginationSize]);

  useLayoutEffect(() => {
    setSortField(sortField); 
    setSortOrderAsc(sortOrderAsc);
  }, [className, defaultSortField]);

  useLayoutEffect(() => {  
    changeFilteredItems(filterItems(defaultItems, filters));
  }, [className, defaultItems, headersMap, filters]);

  // sort and filter when something changed
  useLayoutEffect(() => { 
    const itemsToShow = paginationSize ? paginationSize * pagesShown : filteredItems.length;
    changeItems(paginateItems(sortItems(filteredItems, sortField, sortOrderAsc), itemsToShow));
    setMoreToShow(itemsToShow < filteredItems.length);
  }, 
  [filteredItems, sortField, sortOrderAsc, pagesShown]);

  const moreButton = paginationSize && moreToShow ? 
    <div 
      className={`${className}-show-more table-show-more button-primary`}
      onClick={() => { setPagesShown(pagesShown + 1) }}
    >
    ...
    </div> : 
    null;

  return (
    <>
      <table className={className}>
          <thead>
            <tr className={`${className}-row-header table-row-header`}>
              { headersMap.map((header, index) => 
                <th 
                  {...header.attributes}
                  // here we just changing sort field, sorting itself is done after state updated by useEffect()
                  onClick={ header.sortable ? () => { changeSortField(header.sortField); } : null}
                  key={index}
                >
                  { header.sortField === sortField ? sortOrderAsc ? "▾" : "▴" : null /* sort mark */ }    
                  { header.contents }
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            { items.map((item, index) => 
              <tr className={`${className}-row table-row`} key={index}>
                {
                  headersMap.map((header, index) => {
                    return <td
                      {...item[header.field].attributes}
                      key={index}
                    > 
                      {item[header.field].contents}
                    </td>
                  })
                }
              </tr>
            )}
          </tbody>
        </table>
        {moreButton}
      </>
  );
}

Table.propTypes = {
  className: PropTypes.string.isRequired,
  paginationSize: PropTypes.number,
  defaultSortField: PropTypes.string,
  headersMap: PropTypes.arrayOf(PropTypes.shape({
    // contents: any
    attributes: PropTypes.object,
    field: PropTypes.string.isRequired,
    sortable: PropTypes.bool.isRequired,
    sortField: PropTypes.string,
  })).isRequired,
  defaultItems: PropTypes.array.isRequired,
  filters: PropTypes.object,
};

Table.defaultProps = {
  className: "",
  paginationSize: 0,
  filters: {},
};