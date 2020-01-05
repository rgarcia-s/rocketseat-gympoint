import React from 'react';
import { TouchableOpacity } from 'react-native';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import {
  Container,
  OrderContainer,
  OrderTitle,
  Title,
  Time,
  OrderContent,
  Wait,
} from './styles';
import Header from '~/components/Header';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Order({ navigation }) {
  const order = navigation.getParam('order');

  function handleDate(date) {
    return formatRelative(parseISO(date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }

  let answerTime;

  const questionTime = handleDate(order.createdAt);
  if (order.answer !== null) {
    answerTime = handleDate(order.answer_at);
  }

  return (
    <>
      <Header />
      <Container>
        <OrderContainer>
          <OrderTitle>
            <Title>PERGUNTA</Title>
            <Time>{questionTime}</Time>
          </OrderTitle>

          <OrderContent>{order.question}</OrderContent>

          {order.answer === null ? (
            <Wait>Por favor, aguarde a resposta da academia</Wait>
          ) : (
            <>
              <OrderTitle>
                <Title>RESPOSTA</Title>
                <Time>{answerTime}</Time>
              </OrderTitle>
              <OrderContent>{order.answer}</OrderContent>
            </>
          )}
        </OrderContainer>
      </Container>
    </>
  );
}

Order.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HelpOrders');
      }}>
      <Icon name="chevron-left" size={24} color="#ee4e62" />
    </TouchableOpacity>
  ),
});
