import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { MdCheck, MdKeyboardArrowLeft } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from './styles';

import ConfirmButton from '~/objects/ConfirmButton';
import BackButton from '~/objects/BackButton';

export default function StudentEdit({ match }) {
  const [student, setStudent] = useState({});
  const { id } = match.params;

  useEffect(() => {
    const loadStudent = async () => {
      const response = await api.get('/students', { params: { id } });

      setStudent(response.data[0]);
    };

    loadStudent();
  }, []); //eslint-disable-line

  function handleNameChange(e) {
    setStudent({ ...student, name: e.target.value });
  }
  function handleEmailChange(e) {
    setStudent({ ...student, email: e.target.value });
  }
  function handleAgeChange(e) {
    setStudent({ ...student, age: e.target.value });
  }
  function handleWeightChange(e) {
    setStudent({ ...student, weight: e.target.value });
  }
  function handleHeightChange(e) {
    setStudent({ ...student, height: e.target.value });
  }

  async function handleSubmit({ name, email, age, height, weight }) {
    await api.put(`students/${id}`, {
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
      <Form onSubmit={handleSubmit}>
        <header>
          <h1>Edição de aluno</h1>
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
            <Input
              name="name"
              value={student.name}
              type="text"
              placeholder="Seu nome completo"
              onChange={handleNameChange}
            />
          </div>
          <div>
            <span>ENDEREÇO DE E-MAIL</span>
            <Input
              name="email"
              value={student.email}
              type="text"
              placeholder="exemplo@email.com"
              onChange={handleEmailChange}
            />
          </div>
          <div id="form-row">
            <span>
              IDADE
              <Input
                name="age"
                value={student.age}
                type="number"
                onChange={handleAgeChange}
              />
            </span>

            <span>
              PESO (kg)
              <Input
                name="weight"
                type="number"
                step="0.1"
                min={0}
                placeholder="Em kg ex: 75.7"
                value={student.weight}
                onChange={handleWeightChange}
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
                value={student.height}
                onChange={handleHeightChange}
              />
            </span>
          </div>
        </Content>
      </Form>
    </Container>
  );
}

StudentEdit.propTypes = {
  match: PropTypes.object.isRequired, //eslint-disable-line
};
