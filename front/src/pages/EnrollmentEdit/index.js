import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { parseISO, addMonths, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from './styles';

import ConfirmButton from '~/objects/ConfirmButton';
import BackButton from '~/objects/BackButton';

const schema = Yup.object().shape({
  startDate: Yup.date().required(),
});

export default function EnrollmentEdit({ match }) {
  const [enrollment, setEnrollment] = useState({});
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [total, setTotal] = useState({});
  const { id } = match.params;

  const loadEnrollment = async () => {
    const response = await api.get('/enrollments', { params: { id } });

    setEnrollment(response.data[0]);
  };

  async function loadPlans() {
    const response = await api.get('plans');

    setPlans(response.data);
  }

  useEffect(() => {
    loadEnrollment();
    loadPlans();
  }, []); //eslint-disable-line

  useEffect(() => {
    if (plans.length > 0) {
      plans.map(p => { //eslint-disable-line
        if (p.id == selectedPlan) { //eslint-disable-line
          return setTotal(p.duration * p.price);
        }
      });
    }
  }, [selectedPlan]); //eslint-disable-line

  async function handleSubmit({ startDate }) {
    await api.put(`enrollments/${id}`, {
      student: enrollment.student_id,
      plan: selectedPlan,
      startDate,
    });

    history.push('/enrollments');
  }

  function handlePlanChange(e) {
    const planId = e.target.value;
    setSelectedPlan(planId);
  }

  useEffect(() => {
    let duration;
    if (plans.length > 0) {
    plans.map(p => { //eslint-disable-line
      if (p.id == selectedPlan) { //eslint-disable-line
          duration = p.duration;
        }
      });
    }

    const formattedDate = format(
      addMonths(date, duration || selectedPlan),
      "dd'/'MM'/'yyyy",
      { locale: pt }
    );
    setEndDate(formattedDate);
  }, [date, selectedPlan]) //eslint-disable-line

  function handleDateChange(e) {
    setDate(parseISO(e.target.value));
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <header>
          <h1>Edição de matrícula</h1>
          <div>
            <Link to="/enrollments">
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
            <span>ALUNO</span>
            <input value={enrollment.student && enrollment.student.name} />
          </div>
          <div id="form-row">
            <span>
              PLANO
              <Select
                name="plan"
                options={plans}
                value={selectedPlan}
                onChange={handlePlanChange}
              />
            </span>

            <span>
              DATA DE INÍCIO
              <Input
                name="startDate"
                type="date"
                placeholder="Escolha a data"
                onChange={handleDateChange}
              />
            </span>

            <span>
              DATA DE TÉRMINO
              <Input
                name="endDate"
                type="text"
                readOnly
                value={endDate}
                className="plan-end"
              />
            </span>

            <span>
              VALOR FINAL
              <Input
                name="total"
                type="number"
                readOnly
                value={total}
                className="plan-total"
              />
            </span>
          </div>
        </Content>
      </Form>
    </Container>
  );
}

EnrollmentEdit.propTypes = {
  match: PropTypes.object.isRequired, //eslint-disable-line
};
