import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 100%;

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    div {
      display: flex;
    }

    h1 {
      font-size: 24px;
      color: #444;
    }
  }
`;

export const Content = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 4px;

  display: flex;
  flex-direction: column;

  div {
    display: flex;
    flex-direction: column;
  }

  span {
    font-size: 14px;
    line-height: 16px;
    font-weight: bold;
    margin-bottom: 8px;
    color: #444;
  }

  .async-select {
    height: 45px;
    border-radius: 4px;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    margin-top: 8px;
  }

  .select {
    height: 45px;
    border-radius: 4px;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    padding-left: 15px;
    background-color: #fff;
    margin-top: 8px;
    font-size: 16px;
  }

  input {
    width: 200px;
    height: 45px;
    border-radius: 4px;
    border: solid 1px #dddddd;
    background-color: ${props => (props.available ? '#9999' : '#ffff')};
    padding: 0 15px;
    margin-right: 16px;
  }

  div#form-row {
    flex-direction: row;

    select {
      margin-right: 15px;
      margin-bottom: 0;
    }

    span {
      display: flex;
      flex-direction: column;
      flex: 1;

      input {
        margin: 8px 15px 0 0;
      }

      &:last-child {
        input {
          margin-right: 0px;
        }
      }
    }
  }
`;
