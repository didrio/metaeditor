import PropTypes from 'prop-types';
import styled from 'styled-components';
import noop from 'lodash/noop';

const getFlexDirection = ({ vertical }) => (
  vertical ? 'column' : 'row'
);

function FlexGroup({
  children,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  vertical,
}) {
  const handleClick = () => {
    onClick();
  };

  const handleMouseEnter = () => {
    onMouseEnter();
  };

  const handleMouseLeave = () => {
    onMouseLeave();
  };

  return (
    <Container
      className={className}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      vertical={vertical}
    >
      {children}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: ${getFlexDirection};
`;

FlexGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  onMouseEnter: PropTypes.func,
  onMouseLeave: PropTypes.func,
  vertical: PropTypes.bool,
};

FlexGroup.defaultProps = {
  className: '',
  onClick: noop,
  onMouseEnter: noop,
  onMouseLeave: noop,
  vertical: false,
};

export default FlexGroup;
