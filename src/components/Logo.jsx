import styled from 'styled-components';
import RouterLink from './common/RouterLink';
import { COLOR_BLACK } from '../constants';

function Logo() {
  return (
    <Container
      to="/"
    >
      My Meta Data
    </Container>
  );
}

const Container = styled(RouterLink)`
  & > a {
    color: ${COLOR_BLACK};
    letter-spacing: -1px;
    font-size: 25px;
    font-weight: bold;
    text-decoration: none;
  }
`;

export default Logo;
