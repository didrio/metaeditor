import PropTypes from 'prop-types';
import styled from 'styled-components';
import isEmpty from 'lodash/isEmpty';

function ErrorMessage({ children }) {
  return (
    isEmpty(children) ? null : (
      <Container>
        {children}
      </Container>
    )
  );
}

const Container = styled.span`
  color: red;
  font-size: 12px;
`;

ErrorMessage.propTypes = {
  children: PropTypes.string,
};

ErrorMessage.defaultProps = {
  children: '',
};

export default ErrorMessage;
