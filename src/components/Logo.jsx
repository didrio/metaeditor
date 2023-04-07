import styled from 'styled-components';
import RouterLink from './common/RouterLink';
import { COLOR_BLACK } from '../constants';
import header from '../images/header-340-60.png';

function Logo() {
  return (
    <Container
      to="/"
    >
      <HeaderLogo src={header} alt="header" />
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

const HeaderLogo = styled.img`
  width: 340px;
  height: 60px;
`;

export default Logo;
