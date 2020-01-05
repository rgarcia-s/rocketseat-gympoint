import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Container } from './styles';
import logo from '~/assets/gympointSmall.svg';

import { store } from '~/store';
import { signOut } from '~/store/modules/auth/actions';

export default function Header() {
  const dispatch = useDispatch();
  const { name } = store.getState().user.profile;

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <div className="dashboard">
        <img src={logo} alt="Gympoint" />
        <strong>GYMPOINT</strong>
        <nav>
          <NavLink activeClassName="active" to="/students">
            ALUNOS
          </NavLink>
          <NavLink activeClassName="active" to="/plans">
            PLANOS
          </NavLink>
          <NavLink activeClassName="active" to="/enrollments">
            MATRÍCULAS
          </NavLink>
          <NavLink activeClassName="active" to="/help-orders">
            PEDIDOS DE AUXÍLIO
          </NavLink>
        </nav>
      </div>

      <div className="profile">
        <span>{name}</span>
        <button type="button" onClick={handleSignOut}>
          sair do sistema
        </button>
      </div>
    </Container>
  );
}
