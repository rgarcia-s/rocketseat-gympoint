import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { utcToZonedTime } from 'date-fns-tz';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  MdArrowBack,
  MdArrowForward,
  MdCheckCircle,
  MdAdd,
} from 'react-icons/md';
import api from '~/services/api';

import { Container, Content } from './styles';
import ConfirmButton from '~/objects/ConfirmButton';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);
  const [page, setPage] = useState(1);

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    const loadEnrollments = async () => {
      const response = await api.get('enrollments', {
        params: { page },
      });
      setEnrollments(response.data);
    };

    loadEnrollments();
  }, [page]); //eslint-disable-line

  function handleAddPage() {
    setPage(page + 1);
  }

  function handleSubPage() {
    setPage(page - 1);
  }

  async function handleDelete(id, name) {
    // eslint-disable-next-line
    const confirmation = confirm(
      `Pressione OK para confirmar que deseja excluir a matrícula do aluno ${name}?`
    );

    if (confirmation) {
      await api.delete(`/enrollments/${id}`);

      toast.success(`Matrícula do aluno ${name} excluída com sucesso`);

      const response = await api.get('enrollments', {
        params: { page },
      });
      setEnrollments(response.data);
    }
  }
  return (
    <Container>
      <header>
        <h1>Gerenciando matrículas</h1>
        <div>
          <Link to="/enrollments/register">
            <ConfirmButton
              type="button"
              icon={<MdAdd size={20} color="#fff" />}
              content="CADASTRAR"
            />
          </Link>
        </div>
      </header>
      <Content>
        <table>
          <tbody>
            <tr>
              <th>ALUNO</th>
              <th className="centered">PLANO</th>
              <th className="centered">INÍCIO</th>
              <th className="centered">TÉRMINO</th>
              <th className="centered">ATIVA</th>
            </tr>
            {enrollments.map(enrollment => (
              <tr key={enrollment.id}>
                <td>{enrollment.student.name}</td>
                <td className="centered">{enrollment.plan.title}</td>
                <td className="centered">
                  {// Data aparece incorreta devido ao fim do horário de verão.
                  // Datas após a data prevista para o horário de verão aparecem corretamente.
                  format(
                    utcToZonedTime(parseISO(enrollment.start_date), timezone),
                    "d 'de' MMMM 'de' yyy",
                    {
                      locale: pt,
                    }
                  )}
                </td>
                <td className="centered">
                  {format(
                    utcToZonedTime(parseISO(enrollment.end_date), timezone),
                    "d 'de' MMMM 'de' yyy",
                    {
                      locale: pt,
                    }
                  )}
                </td>
                <td className="centered">
                  <MdCheckCircle
                    size={20}
                    color={enrollment.active ? '#42cb49' : '#ddd'}
                  />
                </td>
                <td>
                  <button type="button" className="edit">
                    <Link to={`/enrollments/${enrollment.id}/edit`}>
                      editar
                    </Link>
                  </button>

                  <button
                    type="button"
                    className="erase"
                    onClick={() =>
                      handleDelete(enrollment.id, enrollment.student.name)
                    }
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
          {enrollments.length === 10 ? (
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
