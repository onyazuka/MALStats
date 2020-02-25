import styled, { keyframes } from 'styled-components';

export const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const CentralizedContainer  = styled.div`
  text-align: center;
`

export const StyledUList = styled.ul`
  font-size: .9em;
  color: #666;
  text-align: center;
  list-style: none;

  li {
    display: inline-block;
    margin-right: 25px;
  }
`