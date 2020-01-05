import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1380px;
  width: 100%;

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

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

  table {
    width: 100%;

    tr {
      &:first-child {
        td {
          padding-top: 20px;
        }
      }
      th {
        text-align: left;
        font-size: 16px;
        line-height: 19px;
        color: #444;
      }

      td {
        font-size: 16px;
        line-height: 20px;
        color: #666;
        padding: 16px 0;
        border-bottom: 1px solid #ddd;

        &:last-child {
          text-align: right;
        }

        button {
          background: none;
          border: none;
          font-size: 15px;
          margin-left: 13px;
        }

        button.edit {
          a {
            color: #4d85ee;
          }
        }

        button.erase {
          color: #de3b3b;
        }
      }

      .centered {
        text-align: center;
      }

      &:last-child {
        td {
          border: none;
          padding-bottom: 0px;
        }
      }
    }
  }

  div {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 15px;

    span {
      font-size: 14px;
      color: #aaa;
    }

    button {
      background: none;
      border: none;

      &:disabled {
        opacity: 0.3;
        cursor: default;
      }
    }
  }
`;
