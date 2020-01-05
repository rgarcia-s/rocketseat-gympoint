import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  width: 100%;
  max-width: 360px;
  background: #fff;
  border-radius: 4px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 50px 30px;

  img {
    margin-bottom: 12px;
  }

  h1 {
    font-size: 30px;
    line-height: 35px;
    color: #ee4d64;
    margin-bottom: 30px;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;

    strong {
      margin-bottom: 8px;
      font-size: 14px;
      line-height: 16px;
      font-weight: bold;
      color: #444;
    }

    input {
      height: 45px;
      padding-left: 15px;
      border-radius: 4px;
      border: 1px solid #ddd;
      margin-bottom: 20px;

      &::placeholder {
        font-size: 16px;
        line-height: 19px;
        color: #999;
      }
    }

    span {
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
      color: #f44;
    }

    button {
      background: #ee4d64;
      border: none;
      border-radius: 4px;
      height: 45px;

      color: #fff;
      font-weight: bold;
      font-size: 16px;
      line-height: 19px;

      &:hover {
        background: ${darken(0.08, '#ee4d64')};
      }
    }
  }
`;
