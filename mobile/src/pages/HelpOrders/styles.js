import styled from 'styled-components/native';
import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  background: #f5f5f5;
  padding: 0 20px;
`;

export const Header = styled.View`
  height: 45px;
  background: #fff;
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image`
  width: 116px;
  height: 18px;
`;

export const HelpOrderButton = styled(Button)`
  margin: 20px 0;
`;

export const HelpOrderList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const HelpOrderContainer = styled.View`
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
  padding: 20px;
`;

export const Top = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const Left = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Answered = styled.Text`
  margin-left: 8px;
  font-size: 14px;
  font-weight: bold;
  color: ${props => (props.answered !== null ? '#42cb59' : '#999')};
`;

export const Time = styled.Text`
  color: #666;
`;

export const Question = styled.Text`
  font-size: 14px;
  line-height: 26px;
  color: #444;
`;
