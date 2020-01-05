import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import {
  Container,
  HelpOrderButton,
  HelpOrderList,
  HelpOrderContainer,
  Top,
  Left,
  Answered,
  Time,
  Question,
} from './styles';
import Header from '~/components/Header';
import Icon from 'react-native-vector-icons/MaterialIcons';

function HelpOrders({ isFocused, navigation }) {
  const [helpOrders, setHelpOrders] = useState([]);

  const id = useSelector(state => state.auth.id);

  useEffect(() => {
    async function loadOrders() {
      const response = await api.get(`students/${id}/help-orders`);

      setHelpOrders(response.data);
    }
    if (isFocused) {
      loadOrders();
    }
  }, [id, isFocused]);

  function handleDate(date) {
    return formatRelative(parseISO(date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }

  function handleNewOrder() {
    navigation.navigate('NewOrder');
  }

  function handleOpenOrder(order) {
    navigation.navigate('Order', { order });
  }

  return (
    <>
      <Header />
      <Container>
        <HelpOrderButton onPress={handleNewOrder}>
          Novo pedido de auxílio
        </HelpOrderButton>

        <HelpOrderList
          data={helpOrders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleOpenOrder(item)}>
              <HelpOrderContainer>
                <Top>
                  <Left>
                    <Icon
                      name="check-circle"
                      size={16}
                      color={item.answer === null ? '#ddd' : '#42cb59'}
                    />
                    <Answered answered={item.answer}>
                      {item.answer === null ? 'Sem resposta' : 'Respondido'}
                    </Answered>
                  </Left>
                  <Time>{handleDate(item.createdAt)}</Time>
                </Top>

                <Question numberOfLines={3}>{item.question}</Question>
              </HelpOrderContainer>
            </TouchableOpacity>
          )}
        />
      </Container>
    </>
  );
}

export default withNavigationFocus(HelpOrders);
