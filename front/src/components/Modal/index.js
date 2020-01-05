import React from 'react';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';
import { CustomModal, Container, Header } from './styles';

export default function Modal({ children, title, isShow, onClose }) {
  return (
    <CustomModal isShow={isShow}>
      <Container>
        <Header>
          <strong>{title}</strong>
          <MdClose size={24} color="#666" onClick={onClose} />
        </Header>
        <div>{children}</div>
      </Container>
    </CustomModal>
  );
}

Modal.defaultProps = {
  title: '',

  isShow: false,
};

Modal.propTypes = {
  children: PropTypes.oneOfType([ //eslint-disable-line
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]),
  title: PropTypes.string,
  isShow: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
};
