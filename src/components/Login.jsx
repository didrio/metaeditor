import { useFirebase } from 'react-redux-firebase';
import { useHistory } from 'react-router-dom';

function Login() {
  const firebase = useFirebase();
  const history = useHistory();

  const signInWithGoogle = () => {
    firebase
      .login({
        provider: 'google',
        type: 'popup',
      })
      .then(() => {
        history.push('/app');
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
