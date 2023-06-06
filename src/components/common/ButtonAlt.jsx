import PropTypes from 'prop-types';
import styled from 'styled-components';

function ButtonAlt({
  className,
  children,
  disabled,
  onClick,
}) {
  return (
    <Container
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Container>
  );
}

const Container = styled.button`
  min-width: 150px;
  height: 35px;
  color: #fff;
  border-radius: 20px;
  font-family: 'Lato', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  border: 4px solid #fff;
  cursor: pointer;
  background: none;
  font-size: 14px;
  text-align: center;
  padding: 0px 30px;

  &:enabled:hover {
    color: #a70003;
    border: 4px solid #a70003;
  }

  &:disabled {
    cursor: auto;
    opacity: .4;
  }
`;

ButtonAlt.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

ButtonAlt.defaultProps = {
  className: '',
  disabled: false,
};

export default ButtonAlt;
