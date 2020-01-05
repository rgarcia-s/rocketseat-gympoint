import styled from 'styled-components';

export const Container = styled.div`
  label {
    color: #444;
    font-size: 14px;
    font-weight: bold;
  }
  > div {
    > div {
      > div {
        height: 30px;
        width: 830px;
      }
    }
  }

  span {
    color: #fb6f91;
    align-self: flex-start;
    margin-top: 10px;
    font-weight: bold;
  }
`;
