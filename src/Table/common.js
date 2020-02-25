
/*
  Preconditions:
    items[item] should have contents field
*/
export function sortItems(items, sortField, asc=true) {
  // if sortField is not specified, doing nothing
  if (!sortField) return items;
  const itemsCopy = [...items];
  // sorting by 'sortField'
  itemsCopy.sort((item1, item2) => {
    if (item1[sortField].contents < item2[sortField].contents) return asc ? -1 : 1;
    else if (item1[sortField].contents > item2[sortField].contents) return asc ? 1 : -1;
    else return 0;
  });
  return itemsCopy;
}

/*
  Preconditions:
    items[item] should have contents field
    filters[filter] should have 'descriptor' field and 'filterFunc' field, may have 'relationToNext' field
*/
export function filterItems(items, filters) {
  if(!filters || filters.length === 0) return items;
  let filteredItems = [];
  // default relation is 'and'
  let relationToThis = undefined;
  Object.keys(filters).forEach((key, outerIndex) => 
    {
      filters[key].forEach((filt, innerIndex) => {
        // in this case we just need to apply first filter with 'or' rule
        if(outerIndex === 0 && innerIndex === 0) {
          filteredItems = items.filter(item => filt.filterFunc(item[key].contents));
        }
        else {
          switch(relationToThis) {
            case "and":
              filteredItems = filteredItems.filter(item => filt.filterFunc(item[key].contents));
              break;
            case "or":
              // concat only if not this item is already included in the output array
              filteredItems = filteredItems.concat(items.filter(item => filt.filterFunc(item[key].contents) && !(filteredItems.includes(item))));
              break;
            default:
              throw new Error("filterItems() - unknown relation");
          }
        }
        relationToThis = filters[key].relationToNext ? filters[key].relationToNext : "and";
      });
    }
  );
  return filteredItems;
}

export function paginateItems(items, howMany) {
  return items.slice(0, howMany);
}