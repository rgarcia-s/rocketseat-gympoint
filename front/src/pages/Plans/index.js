import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { MdArrowBack, MdArrowForward, MdAdd } from 'react-icons/md';
import api from '~/services/api';

import { Container, Content } from './styles';
import ConfirmButton from '~/objects/ConfirmButton';

export default function Plans() {
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadPlans = async () => {
      const response = await api.get('plans', {
        params: { page },
      });
      setPlans(response.data);
    };

    loadPlans();
  }, [page]); //eslint-disable-line

  function handleAddPage() {
    setPage(page + 1);
  }

  function handleSubPage() {
    setPage(page - 1);
  }

  async function handleDelete(id, title) {
    // eslint-disable-next-line
    const confirmation = confirm(
      `Pressione OK para confirmar que deseja excluir o plano ${title}?`
    );

    if (confirmation) {
      await api.delete(`/plans/${id}`);

      toast.success(`Plano ${title} excluído com sucesso`);

      const response = await api.get('plans', {
        params: { page },
      });
      setPlans(response.data);
    }
  }

  return (
    <Container>
      <header>
        <h1>Gerenciando planos</h1>
        <div>
          <Link to="/plans/register">
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
              <th>PLANO</th>
              <th className="centered">DURAÇÃO</th>
              <th className="centered">VALOR MENSAL</th>
            </tr>
            {plans.map(plan => (
              <tr key={plan.id}>
                <td>{plan.title}</td>
                <td className="centered">{plan.duration} mês(es)</td>
                <td className="centered">R${plan.price}</td>
                <td>
                  <button type="button" className="edit">
                    <Link to={`/plans/${plan.id}/edit`}>editar</Link>
                  </button>

                  <button
                    type="button"
                    className="erase"
                    onClick={() => handleDelete(plan.id, plan.title)}
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
          {plans.length === 10 ? (
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
