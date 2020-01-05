import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
  padding: 0 20px;
`;

export const CheckInButton = styled(Button)`
  margin: 20px 0;
`;

export const CheckInList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const CheckInContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  height: 45px;
  padding: 15px 20px;
`;

export const Title = styled.Text`
  font-weight: bold;
  color: #444;
`;

export const Time = styled.Text`
  color: #666;
`;
