import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'normalize.css';
import { createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import './firebase';
import firebase from 'firebase/compat/app';
import store from './store';
import './index.css';
import App from './components/App';
import Landing from './components/Landing';
import Portal from './components/Portal';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Todos from './components/Todos';

const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
};

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
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/app" element={<App />} />
            <Route path="/portal" element={<Portal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/todos" element={<Todos />} />
          </Routes>
        </BrowserRouter>
      </ReactReduxFirebaseProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);
