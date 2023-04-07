import styled from 'styled-components';
import FlexGroup from './common/FlexGroup';
import footer from '../images/footer-200-100.png';

function Footer() {
  return (
    <Container>
      <FooterLogo src={footer} alt="header" />
    </Container>
  );
}

const Container = styled(FlexGroup)`
  align-items: center;
  background-color: white;
  justify-content: center;
  height: 150px;
  width: 100%;
`;

const FooterLogo = styled.img`
  width: 200px;
  height: 100px;
`;

export default Footer;
