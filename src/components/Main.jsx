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
import { COLOR_LIGHT_GRAY } from '../constants';

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
          </Routes>
        </Body>
      </Container>
    </Background>
  );
}

const Background = styled(FlexGroup)`
  margin-left: 10vw;
  margin-right: 10vw;
  height: 100%;
  width: 80vw;
  flex-grow: 1;
`;

const Container = styled(FlexGroup)`
  justify-content: space-betweek;
  height: 100%;
`;

const Body = styled(FlexGroup)`
  box-sizing: border-box;
  padding: 30px;
  width: 100%;
`;

const Header = styled(FlexGroup)`
  align-items: center;
  border-bottom: 2px solid ${COLOR_LIGHT_GRAY};
  height: 60px;
  justify-content: space-between;
`;

export default Main;
