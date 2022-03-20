import { useState, useEffect, useCallback } from 'react';
import { useFirebase } from 'react-redux-firebase';
import isEmpty from 'lodash/isEmpty';
import TextInput from './common/TextInput';
import Button from './common/Button';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const firebase = useFirebase();

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
  };

  const handleSignUp = useCallback(() => {
    firebase
      .createUser({
        email, password,
      }, {
        codes: [],
      });
  }, [email, firebase, password]);

  const handleKeyDown = useCallback(({ code }) => {
    if (code === 13 && !isEmpty(email) && !isEmpty(password)) {
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

  return (
    <div>
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
