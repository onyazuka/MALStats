import React, { useState, useRef } from 'react';
import useClickedOutside from '../Hooks/useClickedOutside';

export default function Filter(props) {
  const { setFilters, title, type, types, score, classPrefix } = props;
  const formRef = useRef(undefined);
  const containerRef = useRef(undefined);
  const [shown, setShown] = useState(false);
  useClickedOutside(containerRef, () => {
    setShown(false);
  });

  function onFiltersSubmit() {
    if (!formRef || !formRef.current) return;
    let cur = formRef.current;
    let filters = {};
    if(cur) filters["titleRaw"] = (
      [{
        filterFunc: (value) => value.toLowerCase().includes(cur.title.value.toLowerCase()),
        value: cur.title.value,
      }]
    );
    if(cur && cur.type.value) filters["type"] = (
      [{
        descriptor: "type",
        filterFunc: (value) => value === cur.type.value,
        value: cur.type.value,
      }]
    );
    if(cur && (cur.scoreMin.value !== undefined && cur.scoreMin.value !== "")) filters["score"] = (
      [{
        descriptor: "score",
        filterFunc: (value) =>  value >= parseInt(cur.scoreMin.value),
        value: cur.scoreMin.value,
      }]
    );
    else filters["score"] = (
      [{
        descriptor: "score",
        filterFunc: () => true,
      }]
    );
    if(cur && (cur.scoreMax.value !== undefined && cur.scoreMax.value !== "")) filters["score"].push({
      descriptor: "score",
      filterFunc: (value) => value <= parseInt(cur.scoreMax.value),
      value: cur.scoreMax.value,
    });
    else filters["score"].push({
      descriptor: "score",
      filterFunc: () => true,
    });
    setFilters(filters);
  }

  const filterContents = shown ? 
    <form 
        onSubmit={(event) => { event.preventDefault(); onFiltersSubmit(); }}
        ref={formRef}
        className={`${classPrefix}_form`}
      >
        <div className={`${classPrefix}_title`}>
          <input 
              name="title"
              placeholder="Filter by title..."
              type="text"
              defaultValue={title ? title[0].value : ""}
              style={{width: '200px', boxSizing: 'border-box'}}
              autoComplete="off"
          >
          </input>
        </div>

        <div id={`${classPrefix}_type`}>
            <select 
                name="type" 
                style={{width: '200px', boxSizing: 'border-box'}}
                defaultValue={type ? type[0].value : ""}
            >
                <option name="type_empty" value="">Filter by type</option>
                {types.map((type, index) => {
                  return <option key={index} name={type} value={type}>{type.capitalize()}</option>
                })}
            </select>
        </div>
        
        <div className={`${classPrefix}_scoreMin`}>
            <input 
                name="scoreMin"
                placeholder="Score from"
                type="text"
                pattern="[0-9]|10"
                defaultValue={score ? score[0].value : ""}
                style={{width: '200px', boxSizing: 'border-box'}}
                autoComplete="off"
            >
            </input>
        </div>
        <div className={`${classPrefix}_scoreMax`}>
            <input 
                name="scoreMax"
                placeholder="Score to"
                type="text"
                pattern="[0-9]|10"
                defaultValue={score ? score[1].value : ""}
                style={{width: '200px', boxSizing: 'border-box'}}
                autoComplete="off"
            >
            </input>
        </div>
        <button 
            className={`${classPrefix}_submit`}
            type="submit" 
            style={{width: '100px', boxSizing: 'border-box'}}
        >
            OK
        </button>
      </form> :
    null;

  return (
    <div className={`${classPrefix}_container`} ref={containerRef}>
      <div
        className={`${classPrefix}_toggle button noselect`}
        onClick={ () => setShown(!shown) }
      >
        ⚙
      </div>
      {filterContents}
    </div>
  );
}