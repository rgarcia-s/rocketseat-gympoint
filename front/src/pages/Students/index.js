import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { MdArrowBack, MdArrowForward, MdAdd } from 'react-icons/md';
import api from '~/services/api';

import { Container, Content } from './styles';
import ConfirmButton from '~/objects/ConfirmButton';

export default function Students() {
  const [students, setStudents] = useState([]);
  const [studentSearch, setStudentSearch] = useState('');
  const [page, setPage] = useState(1);

  const loadStudents = async () => {
    const response = await api.get('students', {
      params: { name: studentSearch, page, limit: 10 },
    });
    setStudents(response.data);
  };

  useEffect(() => {
    loadStudents();
  }, [studentSearch, page]); //eslint-disable-line

  function handleChange(e) {
    setStudentSearch(e.target.value);
  }

  function handleAddPage() {
    setPage(page + 1);
  }

  function handleSubPage() {
    setPage(page - 1);
  }

  async function handleDelete(id, name) {
    // eslint-disable-next-line
    const confirmation = confirm(
      `Pressione OK para confirmar que deseja excluir o aluno ${name}?`
    );

    if (confirmation) {
      await api.delete(`/students/${id}`);

      toast.success(`Aluno ${name} excluído com sucesso`);

      const response = await api.get('students', {
        params: { name: studentSearch, page },
      });
      setStudents(response.data);
      loadStudents();
    }
  }

  return (
    <Container>
      <header>
        <h1>Gerenciando alunos</h1>
        <div>
          <Link to="/students/register">
            <ConfirmButton
              type="button"
              icon={<MdAdd size={20} color="#fff" />}
              content="CADASTRAR"
            />
          </Link>
          <input
            type="text"
            placeholder="Buscar aluno"
            onChange={handleChange}
            value={studentSearch}
          />
        </div>
      </header>
      <Content>
        <table>
          <tbody>
            <tr>
              <th>NOME</th>
              <th>E-MAIL</th>
              <th className="centered">IDADE</th>
            </tr>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td className="centered">{student.age}</td>
                <td>
                  <button type="button" className="edit">
                    <Link to={`/students/${student.id}/edit`}>editar</Link>
                  </button>

                  <button
                    type="button"
                    className="erase"
                    onClick={() => handleDelete(student.id, student.name)}
                  >
                    apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          {page === 1 ? (
            <button type="button" disabled onClick={handleSubPage}>
              <MdArrowBack size={28} color="#ee4d64" />
            </button>
          ) : (
            <button type="button" onClick={handleSubPage}>
              <MdArrowBack size={28} color="#ee4d64" />
            </button>
          )}

          <span>PÁGINAS</span>
          {students.length === 10 ? (
            <button type="button" onClick={handleAddPage}>
              <MdArrowForward size={28} color="#ee4d64" />
            </button>
          ) : (
            <button type="button" disabled onClick={handleAddPage}>
              <MdArrowForward size={28} color="#ee4d64" />
            </button>
          )}
        </div>
      </Content>
    </Container>
  );
}
