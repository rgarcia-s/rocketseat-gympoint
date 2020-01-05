import React, { useState, useEffect, useRef } from 'react';
import { Form } from '@rocketseat/unform';

import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import api from '~/services/api';

import { Container, Content, InputText, Question } from './styles';
import ConfirmButton from '~/objects/ConfirmButton';
import Modal from '~/components/Modal';

export default function HelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [order, setOrder] = useState('');
  const answerInput = useRef(null);
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(1);

  const loadHelpOrders = async () => {
    const response = await api.get('help-orders');
    setHelpOrders(response.data);
  };

  useEffect(() => {
    loadHelpOrders();
  }, []); //eslint-disable-line

  function showModal(id, question) {
    setOrder({
      id,
      question,
    });
    setVisible(!visible);
  }

  async function handleSubmit({ answer }) {
    await api.put(`help-orders/${order.id}/answer`, {
      answer,
    });

    answerInput.current = '';
    setVisible(!visible);
    loadHelpOrders();
  }

  function handleAddPage() {
    setPage(page + 1);
  }

  function handleSubPage() {
    setPage(page - 1);
  }

  return (
    <Container>
      <header>
        <h1>Pedidos de auxílio</h1>
      </header>
      <Content>
        <table>
          <tbody>
            <tr>
              <th>ALUNO</th>
            </tr>
            {helpOrders.map(helpOrder => (
              <tr key={helpOrder.id}>
                <td>{helpOrder.student.name}</td>

                <td>
                  <button
                    type="button"
                    onClick={() => showModal(helpOrder.id, helpOrder.question)}
                  >
                    responder
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
          {helpOrders.length === 10 ? (
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
      <Modal
        title="PERGUNTA DO ALUNO"
        isShow={visible}
        onClose={() => setVisible(!visible)}
      >
        <Question>{order.question}</Question>

        <Form onSubmit={handleSubmit}>
          <strong>SUA RESPOSTA</strong>
          <InputText multiline name="answer" value={answerInput.current} />
          <ConfirmButton type="submit" content="Responder Aluno" />
        </Form>
      </Modal>
    </Container>
  );
}
