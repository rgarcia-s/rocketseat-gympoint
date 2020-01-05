import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function BackButton({ type, icon, content }) {
  return (
    <Container type={type}>
      {icon}
      {content}
    </Container>
  );
}

BackButton.propTypes = {
  icon: PropTypes.element.isRequired,
  content: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
