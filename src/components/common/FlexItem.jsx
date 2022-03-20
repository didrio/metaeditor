import PropTypes from 'prop-types';
import styled from 'styled-components';

const getFlexBasis = ({ basis }) => basis;

function FlexItem({
  basis,
  children,
  className,
}) {
  return (
    <Container
      basis={basis}
      className={className}
    >
      {children}
    </Container>
  );
}

const Container = styled.div`
  flex-basis: ${getFlexBasis};
`;

FlexItem.propTypes = {
  basis: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

FlexItem.defaultProps = {
  basis: '1',
  className: '',
};

export default FlexItem;
