import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.button`
  display: flex;
  align-items: center;
  height: 36px;
  border: none;
  border-radius: 4px;
  background: #ccc;
  padding: 8px 16px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  margin-right: 16px;

  svg {
    margin-right: 8px;
  }

  &:hover {
    background: ${darken(0.05, '#ccc')};
    border: none;

    a {
    }
  }
`;
