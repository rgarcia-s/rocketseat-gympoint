import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  border: none;
  border-radius: 4px;
  background: #ee4d64;
  padding: 8px 16px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background: ${darken(0.05, '#ee4d64')};
    border: none;

    a {
    }
  }
`;
