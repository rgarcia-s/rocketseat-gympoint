import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
  padding: 0 20px;
`;

export const OrderContainer = styled.View`
  background: #fff;
  margin: 22px 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  padding-bottom: 0;
`;

export const OrderTitle = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-weight: bold;
  color: #444;
`;

export const Time = styled.Text`
  color: #666;
`;

export const OrderContent = styled.Text`
  color: #444;
  line-height: 26px;
  margin-top: 16px;
  margin-bottom: 20px;
`;

export const Wait = styled.Text`
  margin-bottom: 20px;
  color: #ee4e62;
  font-weight: bold;
  font-size: 14px;
`;
