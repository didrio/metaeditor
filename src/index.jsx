import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { initializeApp, firebase } from 'firebase/app';
import { createStore } from 'redux';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import 'normalize.css';
import 'firebase/auth';
import 'firebase/firestore';
import rootReducer from './store';
import './index.css';
import App from './components/App';
import Landing from './components/Landing';
import Portal from './components/Portal';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import SignUp from './components/SignUp';
import Todos from './components/Todos';

const firebaseConfig = {
  apiKey: 'AIzaSyA4uJKuATnIzamdqjO2x-WYnq3gQsvzBfU',
  authDomain: 'mymetadata-380af.firebaseapp.com',
  projectId: 'mymetadata-380af',
  storageBucket: 'mymetadata-380af.appspot.com',
  messagingSenderId: '1033893387654',
  appId: '1:1033893387654:web:7d6d6ec0bb22858173e007',
  measurementId: 'G-Q4BM0L9E1E',
};

initializeApp(firebaseConfig);
firebase.firestore();

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

const initialState = {};
const store = createStore(rootReducer, initialState);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <ReactReduxFirebaseProvider {...rrfProps}>
        <BrowserRouter>
          <Switch>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<App />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <PrivateRoute path="/todos">
              <Todos />
            </PrivateRoute>
          </Switch>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);
