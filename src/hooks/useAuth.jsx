import { useState, useEffect } from 'react';
import { useFirebase } from 'react-redux-firebase';

const useAuth = () => {
  const [authUser, setAuthUser] = useState(null);
  const firebase = useFirebase();
  const auth = firebase.auth();

  useEffect(() => {
    const unlisten = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(false);
      }
    });
    return () => {
      unlisten();
    };
  }, [auth]);

  return authUser;
};

export default useAuth;
