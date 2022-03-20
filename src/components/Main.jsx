import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import App from './App';
import FlexGroup from './common/FlexGroup';
import Landing from './Landing';
import Login from './Login';
import Logo from './Logo';
import Portal from './Portal';
import NavBar from './NavBar';
import SignUp from './SignUp';
import {
  COLOR_LIGHT_GRAY,
  COLOR_WHITE,
} from '../constants';

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
        <div>
          hi
        </div>
        <div>
          header
        </div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<App />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <div>
          footer
        </div>
      </Container>
    </Background>
  );
}

const Background = styled(FlexGroup)`
  background-color: ${COLOR_WHITE};
  margin-left: 10vw;
  margin-right: 10vw;
  width: 80vw;
`;

const Container = styled(FlexGroup)`
  
`;

const Header = styled(FlexGroup)`
  align-items: center;
  border-bottom: 2px solid ${COLOR_LIGHT_GRAY};
  height: 60px;
  justify-content: space-between;
`;

export default Main;
