import { useEffect } from 'react';
import { useFirebase } from 'react-redux-firebase';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Login() {
  const user = useAuth();
  const firebase = useFirebase();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/portal');
    }
  }, [user, navigate]);

  const signInWithGoogle = () => {
    firebase
      .login({
        provider: 'google',
        type: 'popup',
      })
      .then(() => {
        navigate('/app');
      });
  };

  if (user) {
    return null;
  }

  return (
    <div>
      <h1>Sign In</h1>
      <button
        onClick={(event) => {
          event.preventDefault();
          signInWithGoogle();
        }}
        type="submit"
      >
        Sign In with Google
      </button>
    </div>
  );
}

export default Login;
