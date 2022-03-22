import styled from 'styled-components';
import PropTypes from 'prop-types';
import { COLOR_DARK_GRAY } from '../../constants';

const getSize = ({ size }) => `${size}px`;

function LoadingAnimation({ size }) {
  return (
    <Container
      size={size}
    >
      <div />
      <div />
      <div />
      <div />
    </Container>
  );
}

const Container = styled.div`
  display: inline-block;
  position: relative;
  width: ${getSize};
  height: ${getSize};

  & div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${getSize};
    height: ${getSize};
    border: 2px solid ${COLOR_DARK_GRAY};
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${COLOR_DARK_GRAY} transparent transparent transparent;
  }

  & div:nth-child(1) {
    animation-delay: -0.45s;
  }

  & div:nth-child(2) {
    animation-delay: -0.3s;
  }

  & div:nth-child(3) {
    animation-delay: -0.15s;
  }

  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

LoadingAnimation.propTypes = {
  size: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
};

LoadingAnimation.defaultProps = {
  size: 20,
};

export default LoadingAnimation;
