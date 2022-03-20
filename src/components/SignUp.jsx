import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from 'react-redux-firebase';
import isEmpty from 'lodash/isEmpty';
import TextInput from './common/TextInput';
import Button from './common/Button';
import ErrorMessage from './common/ErrorMessage';
import { DEFAULT_USER_DATA } from '../constants';
import { getErrorMessage } from '../utils';
import useAuth from '../hooks/useAuth';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const user = useAuth();
  const navigate = useNavigate();
  const firebase = useFirebase();

  useEffect(() => {
    if (user) {
      navigate('/portal');
    }
  }, [user, navigate]);

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

  if (user) {
    return null;
  }

  return (
    <div>
      <ErrorMessage>
        {errorMessage}
      </ErrorMessage>
      <TextInput
        onChange={handleEmailChange}
        type="email"
        value={email}
      />
      <TextInput
        onChange={handlePasswordChange}
        type="password"
        value={password}
      />
      <Button
        onClick={handleSignUp}
      >
        Register
      </Button>
    </div>
  );
}

export default SignUp;
