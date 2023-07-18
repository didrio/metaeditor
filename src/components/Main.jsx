import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Admin from './Admin';
import App from './App';
import FlexGroup from './common/FlexGroup';
import Landing from './Landing';
import Login from './Login';
import Logo from './Logo';
import Profile from './Profile';
import NavBar from './NavBar';
import SignUp from './SignUp';
import Footer from './Footer';
import Publishers from './Publishers';
import FAQ from './FAQ';

function Main() {
  return (
    <Background
      vertical
    >
      <Container
        vertical
      >
        <Header>
          <Logo />
          <NavBar />
        </Header>
        <Body
          vertical
        >
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/app" element={<App />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/publishers" element={<Publishers />} />
            <Route path="/faq" element={<FAQ />} />
          </Routes>
        </Body>
        <Footer />
      </Container>
    </Background>
  );
}

const Background = styled(FlexGroup)`
  align-items: center;
  background-color: #fafafa;
  width: 100vw;
`;

const Container = styled(FlexGroup)`
  align-items: center;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
  box-shadow: 0px 0px 20px 0px lightgray;
  width: 1200px;

  @media (max-width: 1199px) {
    & {
        width: 100vw;
    }
}
`;

const Body = styled(FlexGroup)`
  align-items: center;
  background-color: white;
  width: 100%;
`;

const Header = styled(FlexGroup)`
  align-items: center;
  background-color: white;
  justify-content: space-between;
  padding: 0 50px;
  width: 100%;
  box-sizing: border-box;
`;

export default Main;
