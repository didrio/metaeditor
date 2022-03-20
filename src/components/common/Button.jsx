import PropTypes from 'prop-types';
import styled from 'styled-components';

function Button({
  children,
  disabled,
  onClick,
}) {
  return (
    <Container
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Container>
  );
}

const Container = styled.button`
  background-color: skyblue;
`;

Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
