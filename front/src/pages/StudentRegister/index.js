import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from './styles';

import ConfirmButton from '~/objects/ConfirmButton';
import BackButton from '~/objects/BackButton';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  age: Yup.number().required(),
  weight: Yup.number().required(),
  height: Yup.number().required(),
});

export default function StudentRegister() {
  async function handleSubmit({ name, email, age, height, weight }) {
    await api.post('students', {
      name,
      email,
      age,
      weight,
      height,
    });

    history.push('/students');
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <header>
          <h1>Cadastro de aluno</h1>
          <div>
            <Link to="/students">
              <BackButton
                type="button"
                icon={<MdKeyboardArrowLeft size={20} color="#fff" />}
                content="VOLTAR"
              />
            </Link>
            <ConfirmButton
              type="submit"
              icon={<MdCheck size={20} color="#fff" />}
              content="SALVAR"
            />
          </div>
        </header>
        <Content>
          <div>
            <span>NOME COMPLETO</span>
            <Input name="name" type="text" placeholder="Seu nome completo" />
          </div>
          <div>
            <span>ENDEREÇO DE E-MAIL</span>
            <Input name="email" type="email" placeholder="exemplo@email.com" />
          </div>
          <div id="form-row">
            <span>
              IDADE
              <Input name="age" type="number" />
            </span>

            <span>
              PESO
              <Input
                name="weight"
                type="number"
                step="0.1"
                min={0}
                placeholder="Em kg ex: 75.7"
              />
            </span>
            <span>
              ALTURA
              <Input
                name="height"
                type="number"
                step="0.01"
                min={0}
                max={2.3}
                placeholder="Em metros ex: 1.75"
              />
            </span>
          </div>
        </Content>
      </Form>
    </Container>
  );
}
