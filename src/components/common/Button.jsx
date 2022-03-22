import PropTypes from 'prop-types';
import styled from 'styled-components';

function Button({
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
  box-sizing: border-box;
  cursor: pointer;
  height: 35px;
  width: 200px;
`;

Button.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  className: '',
  disabled: false,
};

export default Button;
