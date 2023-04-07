import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function RouterLink({
  className,
  children,
  to,
}) {
  return (
    <Container
      className={className}
    >
      <Link
        to={to}
      >
        {children}
      </Link>
    </Container>
  );
}

RouterLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
};

RouterLink.defaultProps = {
  className: '',
};

const Container = styled.span`
  & > a {
    color: #a70003;;
    font-size: 20px;
    letter-spacing: -1px;
    font-weight: 700;
  }
`;

export default RouterLink;
