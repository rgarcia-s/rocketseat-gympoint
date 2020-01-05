import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  justify-content: center;

  padding: 0 25px;
  background: #fff;
`;

export const Logo = styled.Image`
  height: 80px;
  width: 123px;

  margin-bottom: 20px;
`;

export const Input = styled.TextInput`
  height: 45px;
  border-radius: 4px;
  border: 1px solid #ddd;

  align-self: stretch;
  margin-bottom: 15px;

  padding-left: 20px;
`;
