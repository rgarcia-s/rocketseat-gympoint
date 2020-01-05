import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '~/components/Button';
import { Container, Logo, Input } from './styles';
import logo from '~/assets/logo.png';

import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();
  const [id, setId] = useState('');

  function handleSignIn() {
    dispatch(signInRequest(id));
  }

  return (
    <Container>
      <Logo source={logo} />
      <Input
        placeholder="Informe seu ID de cadastro"
        value={id}
        onChangeText={setId}
        returnKeyType="send"
        onSubmitEditing={handleSignIn}
      />
      <Button onPress={handleSignIn}>Entrar no sitema</Button>
    </Container>
  );
}
