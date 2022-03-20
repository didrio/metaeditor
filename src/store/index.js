import { configureStore } from '@reduxjs/toolkit';
import { actionTypes, firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';
import counterReducer from './slices/counter';

const rootReducer = configureStore({
  reducer: {
    counter: counterReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [actionTypes.LOGIN, actionTypes.AUTH_LINK_ERROR],
    },
  }),
});

export default rootReducer;
