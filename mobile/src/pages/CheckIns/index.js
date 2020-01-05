import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { parseISO, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import {
  Container,
  CheckInButton,
  CheckInList,
  CheckInContainer,
  Title,
  Time,
} from './styles';
import Header from '~/components/Header';

export default function CheckIns() {
  const [checkins, setCheckins] = useState([]);

  const id = useSelector(state => state.auth.id);

  async function loadCheckins() {
    const response = await api.get(`students/${id}/checkins`);

    let array = [];
    let count = response.data.length;

    response.data.forEach(item =>
      array.push({ checkin: item, count: count-- }),
    );

    setCheckins(array);
  }

  useEffect(() => {
    loadCheckins();
  }, []); //eslint-disable-line

  function handleDate(date) {
    return formatRelative(parseISO(date), new Date(), {
      locale: pt,
      addSuffix: true,
    });
  }

  async function handleCheckin() {
    try {
      await api.post(`students/${id}/checkins`);

      loadCheckins();
    } catch (error) {
      Alert.alert('Falha no Check-in', 'Limite de chek-ins atingido.');
    }
  }

  return (
    <>
      <Header />
      <Container>
        <CheckInButton onPress={handleCheckin}>Novo check-in</CheckInButton>

        <CheckInList
          data={checkins}
          keyExtractor={item => item.checkin._id}
          renderItem={({ item }) => (
            <CheckInContainer>
              <Title>Check-in #{item.count} </Title>
              <Time>{handleDate(item.checkin.createdAt)}</Time>
            </CheckInContainer>
          )}
        />
      </Container>
    </>
  );
}

CheckIns.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="check" size={20} color={tintColor} />
  ),
};
