import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase';
import isEmpty from 'lodash/isEmpty';
import styled from 'styled-components';
import TextInput from './common/TextInput';
import Button from './common/Button';
import ErrorMessage from './common/ErrorMessage';
import FlexGroup from './common/FlexGroup';
import { DEFAULT_USER_DATA } from '../constants';
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

  const handleSignUp = useCallback(() => {
    const run = async () => {
      try {
        await firebase.createUser({ email, password }, DEFAULT_USER_DATA);
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
      handleSignUp();
    }
  }, [handleSignUp, email, password]);

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
        Email
      </Label>
      <TextInput
        onChange={handleEmailChange}
        type="email"
        value={email}
      />
      <Spacer />
      <Label>
        Password
      </Label>
      <TextInput
        onChange={handlePasswordChange}
        type="password"
        value={password}
      />
      <Spacer />
      <Button
        onClick={handleSignUp}
      >
        Register
      </Button>
    </Container>
  );
}

const Container = styled(FlexGroup)`
  align-items: center;
  margin-top: 30px;
  padding-left: 25%;
  padding-right: 25%;
`;

const Label = styled(FlexGroup)`
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

const Spacer = styled.div`
  height: 40px;
`;

export default SignUp;
