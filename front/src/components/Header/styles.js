import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  background: #fff;

  display: flex;
  flex-direction: row;
  height: 64px;
  padding: 0 30px;

  align-items: center;
  justify-content: space-between;

  margin-bottom: 30px;

  div.dashboard {
    display: flex;
    align-items: center;

    img {
      margin-right: 15px;
    }

    strong {
      color: #ee4d64;
      font-size: 15px;
      line-height: 32px;
      padding-right: 30px;
      border-right: 1px solid #ddd;
    }

    nav {
      margin-left: 30px;

      a {
        background: none;
        border: none;
        margin-right: 20px;
        font-size: 15px;
        font-weight: bold;
        color: #999;
      }

      .active {
        color: #444;
      }
    }
  }

  div.profile {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    span {
      font-size: 14px;
      line-height: 16px;
      font-weight: bold;
      color: #666;
    }

    button {
      background: none;
      border: none;
      font-size: 12px;
      line-height: 14px;
      margin-top: 2px;
      color: #de3b3b;
    }
  }
`;
