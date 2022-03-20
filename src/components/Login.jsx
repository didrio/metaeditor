import { useFirebase } from 'react-redux-firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const firebase = useFirebase();
  const navigate = useNavigate();

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
