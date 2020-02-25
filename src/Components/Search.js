import React from 'react';
import styled from 'styled-components';
import * as CONSTS from './../shared/constants';
import {CentralizedContainer} from './../shared/styles';

const StyledInput = styled.input`
  min-width: 70%;
`;

const Search = ({onChange, onSubmit, text}) =>
  (
    <CentralizedContainer className={`${CONSTS.APP_CLASS_PREFIX}search_container`}>
    <form onSubmit={onSubmit} className={`${CONSTS.APP_CLASS_PREFIX}search_container_form`}>
      <StyledInput 
        type="text" 
        value={text}
        onChange={onChange}  
        placeholder="Enter MAL username..."
      >
      </StyledInput>
    </form>
    </CentralizedContainer>
  );

export default Search;