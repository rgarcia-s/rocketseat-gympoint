import React, { useState } from 'react';
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
  title: Yup.string().required(),
  planDuration: Yup.number()
    .integer()
    .required(),
  planPrice: Yup.number()
    .integer()
    .required(),
});

export default function PlanRegister() {
  const [duration, setDuration] = useState('');
  const [price, setPrice] = useState('');

  async function handleSubmit({ title, planDuration, planPrice }) {
    await api.post('plans', {
      title,
      duration: planDuration,
      price: planPrice,
    });

    history.push('/plans');
  }

  function handleDurationChange(e) {
    setDuration(e.target.value);
  }

  function handlePriceChange(e) {
    setPrice(e.target.value);
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <header>
          <h1>Cadastro de plano</h1>
          <div>
            <Link to="/plans">
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
            <span>NOME DO PLANO</span>
            <Input name="title" type="text" />
          </div>
          <div id="form-row">
            <span>
              DURAÇÃO (em meses)
              <Input
                name="planDuration"
                type="number"
                onChange={handleDurationChange}
                min={1}
              />
            </span>

            <span>
              PREÇO MENSAL (R$)
              <Input
                name="planPrice"
                type="number"
                onChange={handlePriceChange}
                min={0}
              />
            </span>
            <span>
              PREÇO TOTAL
              <Input
                name="total"
                value={price * duration}
                type="number"
                readOnly
                className="plan-total"
              />
            </span>
          </div>
        </Content>
      </Form>
    </Container>
  );
}
