import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { COLOR_BLACK } from '../../constants';

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
    color: ${COLOR_BLACK};
    font-size: 19px;
    letter-spacing: -1px;
  }
`;

export default RouterLink;
