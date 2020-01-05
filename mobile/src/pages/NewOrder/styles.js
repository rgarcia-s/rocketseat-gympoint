import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background: #f5f5f5;
  padding: 0 20px;
`;

export const Input = styled.TextInput`
  background: #fff;
  height: 230px;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

export const SendButton = styled(Button)`
  margin-top: 20px;
`;
