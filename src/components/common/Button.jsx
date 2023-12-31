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
  width: 150px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 800;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
  7px 7px 20px 0px rgba(0,0,0,.1),
  4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;
  background-color: #a70003;
  background-image: linear-gradient(315deg, #a70003 0%, #e3223c 74%);
  border: none;
  z-index: 1;

  &:after {
    position: absolute;
    content: "";
    width: 100%;
    height: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    border-radius: 5px;
    background-color: #e3223c;
    background-image: linear-gradient(315deg, #e3223c 0%, #a70003 74%);
    box-shadow:
    -7px -7px 20px 0px #fff9,
    -4px -4px 5px 0px #fff9,
    7px 7px 20px 0px #0002,
    4px 4px 5px 0px #0001;
    transition: all 0.2s ease;
  }

  &:enabled:hover {
    color: #fff;
  }

  &:enabled:hover:after {
    top: 0;
    height: 100%;
  }

  &:enabled:active {
    top: 2px;
  }

  &:disabled {
    cursor: auto;
    opacity: .4;
  }
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
