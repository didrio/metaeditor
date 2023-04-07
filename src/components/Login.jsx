import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import TextInput from './common/TextInput';
import Button from './common/Button';
import ErrorMessage from './common/ErrorMessage';
import FlexGroup from './common/FlexGroup';
import { getErrorMessage } from '../utils';
import useAuth from '../hooks/useAuth';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const auth = useAuth();
  const navigate = useNavigate();
  const firebase = useFirebase();

  useEffect(() => {
    if (auth) {
      navigate('/profile');
    }
  }, [auth, navigate]);

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleLogin = useCallback(() => {
    const run = async () => {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage(getErrorMessage(error));
      }
      setEmail('');
      setPassword('');
    };
    run();
  }, [email, firebase, password]);

  const handleKeyDown = useCallback(({ code }) => {
    if (code === 'Enter' && !isEmpty(email) && !isEmpty(password)) {
      handleLogin();
    }
  }, [handleLogin, email, password]);

  useEffect(() => {
    if (document) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      if (document) {
        document.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [handleKeyDown]);

  if (auth) {
    return null;
  }

  return (
    <Container
      vertical
    >
      <ErrorMessage>
        {errorMessage}
      </ErrorMessage>
      <Label>
        Enter Email
      </Label>
      <TextInput
        hasBorder
        onChange={handleEmailChange}
        placeholder="you@mymusicmetadata.com"
        type="email"
        value={email}
      />
      <Spacer />
      <Label>
        Enter Password
      </Label>
      <TextInput
        hasBorder
        onChange={handlePasswordChange}
        placeholder="********"
        type="password"
        value={password}
      />
      <Spacer />
      <Button
        onClick={handleLogin}
      >
        Login
      </Button>
    </Container>
  );
}

const Container = styled(FlexGroup)`
  align-items: flex-start;
  justify-content: center;
  margin-top: 30px;
  padding-left: 25%;
  padding-right: 25%;
  height: 700px;
  width: 400px;
`;

const Label = styled(FlexGroup)`
  color: #a70003;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 10px;
  margin-left: 5px;
`;

const Spacer = styled.div`
  height: 35px;
`;

export default SignUp;
