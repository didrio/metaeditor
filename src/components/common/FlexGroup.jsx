import PropTypes from 'prop-types';
import styled from 'styled-components';

const getFlexDirection = ({ vertical }) => (
  vertical ? 'column' : 'row'
);

function FlexGroup({
  children,
  className,
  vertical,
}) {
  return (
    <Container
      className={className}
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
  vertical: PropTypes.bool,
};

FlexGroup.defaultProps = {
  className: '',
  vertical: false,
};

export default FlexGroup;
