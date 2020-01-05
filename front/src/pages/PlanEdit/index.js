import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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

export default function PlanEdit({ match }) {
  const [plan, setPlan] = useState({});
  const { id } = match.params;

  useEffect(() => {
    const loadPlan = async () => {
      const response = await api.get('/plans', { params: { id } });

      setPlan(response.data[0]);
    };

    loadPlan();
  }, []); //eslint-disable-line

  async function handleSubmit({ title, planDuration, planPrice }) {
    await api.put(`plans/${id}`, {
      title,
      duration: planDuration,
      price: planPrice,
    });

    history.push('/plans');
  }

  function handleTitleChange(e) {
    setPlan({ ...plan, title: e.target.value });
  }

  function handleDurationChange(e) {
    setPlan({ ...plan, duration: e.target.value });
  }

  function handlePriceChange(e) {
    setPlan({ ...plan, price: e.target.value });
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <header>
          <h1>Edição de plano</h1>
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
            <Input
              name="title"
              value={plan.title}
              type="text"
              onChange={handleTitleChange}
            />
          </div>
          <div id="form-row">
            <span>
              DURAÇÃO (em meses)
              <Input
                name="planDuration"
                type="number"
                value={plan.duration}
                onChange={handleDurationChange}
                min={1}
              />
            </span>

            <span>
              PREÇO MENSAL (R$)
              <Input
                name="planPrice"
                type="number"
                value={plan.price}
                onChange={handlePriceChange}
                min={0}
              />
            </span>
            <span>
              PREÇO TOTAL
              <Input
                name="total"
                value={plan.price * plan.duration}
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

PlanEdit.propTypes = {
  match: PropTypes.object.isRequired, //eslint-disable-line
};
