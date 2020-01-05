import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { Container, Input, SendButton } from './styles';
import Header from '~/components/Header';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

export default function NewOrder({ navigation }) {
  const [question, setQuestion] = useState('');
  const id = useSelector(state => state.auth.id);

  async function handleSubmit() {
    await api.post(`students/${id}/help-orders`, { question });

    navigation.navigate('HelpOrders');
  }

  return (
    <>
      <Header />
      <Container>
        <Input
          textAlignVertical="top"
          placeholder="Inclua seu pedido de auxílio"
          maxLength={255}
          multiline={true}
          value={question}
          onChangeText={setQuestion}
        />

        <SendButton onPress={handleSubmit}>Enviar Pedido</SendButton>
      </Container>
    </>
  );
}

NewOrder.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('HelpOrders');
      }}>
      <Icon name="chevron-left" size={24} color="#ee4e62" />
    </TouchableOpacity>
  ),
});
