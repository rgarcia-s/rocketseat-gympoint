import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { parseISO, addMonths, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Form, Input, Select } from '@rocketseat/unform';
import * as Yup from 'yup';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from './styles';

import SelectInput from '~/objects/SelectInput';
import ConfirmButton from '~/objects/ConfirmButton';
import BackButton from '~/objects/BackButton';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  plan: Yup.string().required(),
  startDate: Yup.date().required(),
});

export default function EnrollmentRegister() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [total, setTotal] = useState({});

  async function loadStudents(name) {
    const response = await api.get('students', { params: { name } });
    const studentsArray = [];

    response.data.map(s => studentsArray.push({ id: s.id, title: s.name }));

    return new Promise(resolve => {
      resolve(studentsArray);
    });
  }

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');

      setPlans(response.data);
    }

    loadPlans();
    loadStudents();
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
    await api.post('enrollments', {
      student: selectedStudent.id,
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

  useEffect(() => {
    console.tron.log(selectedStudent);
  }, [selectedStudent]);

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <header>
          <h1>Cadastro de matrícula</h1>
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
            <SelectInput
              className="async-select"
              placeholder="Digite o nome do aluno..."
              name="name"
              value={selectedStudent}
              onChange={e => setSelectedStudent(e)}
              loadOptions={loadStudents}
            />
          </div>
          <div id="form-row">
            <span>
              PLANO
              <Select
                className="select"
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
