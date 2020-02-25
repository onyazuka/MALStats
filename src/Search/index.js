import React, { useRef } from 'react';
import PropTypes from 'prop-types';

/*
  Component that sets up search filters for some other components.
  Essential props:  
    setFilters - function that updates some filters
    filterSettings - see proptypes
    allowedKeys - if set, filters will be refreshed only if some of keys listed in this array is pressed,
      else updates filters on each key press
  SetFilters sets array as :
    filterFunc
    descriptor
*/
export default function Search(props) {

  const { classPrefix, setFilters, filterSettings, allowedKeys, render, id, placeholder } = props;
  const filterInput = useRef([]);

  function handleKeyPress(event) {
    // return key pressed
    if(!allowedKeys || allowedKeys.includes(event.keyCode)) {
      setFilters(makeFilters());
    }
  }

  function makeFilters() {
    return filterSettings.map(filterSetting => {
      let filterFunc = undefined;
      let value = filterInput.current.value;
      switch(filterSetting.rule) {
      case "includes":
        filterFunc = (item) => item.includes(value);
        break;
      case "equals":
        filterFunc = (item) => item === value;
        break;
      default:
        throw new Error("Search() - unknown filter rule");
      }
      return {
        descriptor: filterSetting.descriptor,
        filterFunc,
        relationToNext: filterSetting.relationToNext,
      };
    });
  }

  return (
    render ? render : 
      <div className={`${classPrefix} search`}>
        <input 
          type="text" 
          className={`${classPrefix}_form_item form_item`}
          name="filter" 
          id={id ? id : "filter"} 
          placeholder={placeholder ? placeholder : "Search"} 
          onKeyDown={(event) => handleKeyPress(event)}
          ref={filterInput}
        >
        </input>
      </div>
  );
}

Search.propTypes = {
  classPrefix: PropTypes.string,
  setFilters: PropTypes.func.isRequired,
  filterSettings: PropTypes.arrayOf(PropTypes.shape({
    descriptor: PropTypes.string,     // will be redirected to the object and can be used by it for filter identification
    rule: PropTypes.oneOf(["includes", "equals"]).isRequired,   // filtering rule   
    relationToNext: PropTypes.oneOf(["and", "or", undefined]),  // might be used to define connections between filters
  })).isRequired,
  allowedKeys: PropTypes.arrayOf(PropTypes.number),
  render: PropTypes.func,     // may be used for optional rendering
  id: PropTypes.string,
  placeholder: PropTypes.string,
};

Search.defaultProps = {
  classPrefix: "search",
};