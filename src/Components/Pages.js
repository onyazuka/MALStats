import React, { useState } from 'react';
import * as CONSTS from "../shared/constants";
import styled, {ThemeProvider} from 'styled-components';
import PropTypes from 'prop-types';

const StyledPagesCont = styled.div`
    display: flex;
    flex-direction: column;
`

const StyledPagesPart = styled.div`
    width: 50px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    margin: 5px 0;
    border: 2px solid black;
    padding: 5px 5px;
    color: ${props => props.theme.color};
    background-color: ${props => props.theme.bcgColor};
    border-radius: 3px;
    font-family: "Arial";
`

StyledPagesPart.defaultProps = {
    theme: {
        color: "black",
        bcgColor: "white",
    }
}

const activeTheme = {
    color: "white",
    bcgColor: "black",
}

export default function Pages(props) {

  const { className, activePage, setActivePage } = props; 

  /*
      makes page with 'pageId' active
  */
  function onPageClick(pageId) {
      setActivePage(pageId);
  }

  /*
      If page is active, wraps it in active theme.
  */
  function pageThemeWrapper(pagesPart, pageId) {
      if(!Object.values(CONSTS.PAGES).includes(pageId)) throw new Error("Pages::pageThemeWrapper() - invalid pageId")
      if(pageId === activePage) {
          return <ThemeProvider theme={activeTheme} >
              {pagesPart}
          </ThemeProvider>
      }
      else return pagesPart;
  }

  return (
      <StyledPagesCont className={className}>
          {
          pageThemeWrapper(<StyledPagesPart 
              className={`${className}_page`} 
              id={`${className}_page_stats`}
              onClick = {() => onPageClick(CONSTS.PAGES.STATS)}
          >
              <span>Stats</span>
          </StyledPagesPart>, CONSTS.PAGES.STATS)
          }
          {
          pageThemeWrapper(<StyledPagesPart 
              className={`${className}_page`}
              id={`${className}_page_animeList`}
              onClick = {() => onPageClick(CONSTS.PAGES.ANIME)}
          >
              <span>Anime</span>
          </StyledPagesPart>, CONSTS.PAGES.ANIME)
          }
          {
          pageThemeWrapper(<StyledPagesPart 
              className={`${className}_page`}
              id={`${className}_page_mangaList`}
              onClick = {() => onPageClick(CONSTS.PAGES.MANGA)}
          >
              <span>Manga</span>
          </StyledPagesPart>, CONSTS.PAGES.MANGA)
          }
      </StyledPagesCont>
  )
    
}

Pages.propTypes = {
    className: PropTypes.string,
    activePage: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    setActivePage: PropTypes.func.isRequired,
};