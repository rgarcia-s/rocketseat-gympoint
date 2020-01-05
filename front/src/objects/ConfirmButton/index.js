import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function ConfirmButton({ type, icon, content }) {
  return (
    <Container type={type}>
      {icon}
      {content}
    </Container>
  );
}

ConfirmButton.propTypes = {
  icon: PropTypes.element,
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

ConfirmButton.defaultProps = {
  icon: null,
};
