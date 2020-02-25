import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Error(props) {
  const { className, classPrefix, error } = props;
  return <div className={`${className}`}>
    <div className={`${classPrefix}_container`}>
      <img alt="Sorry" src="/images/sorry.png"></img>
      <h3>Sorry, I have tried my best, but</h3>
      <p>Error {error.status} has occured:</p>
      <p>{error.statusText}</p>
    </div>
  </div>
};

Error.propTypes = {
  className: PropTypes.string.isRequired,
  classPrefix: PropTypes.string.isRequired,
  error: PropTypes.shape({
    isError: PropTypes.bool,
    status: PropTypes.number,
    statusText: PropTypes.string,
  }).isRequired,
}

const StyledError = styled(Error)`
  & div[class$="container"] {
    text-align: center;
  }

  & h3, & p  {
    font-family: Helvetica sans-serif;
  }
`;

export default StyledError;
