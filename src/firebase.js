import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const config = {
  apiKey: 'AIzaSyA4uJKuATnIzamdqjO2x-WYnq3gQsvzBfU',
  authDomain: 'mymetadata-380af.firebaseapp.com',
  projectId: 'mymetadata-380af',
  storageBucket: 'mymetadata-380af.appspot.com',
  messagingSenderId: '1033893387654',
  appId: '1:1033893387654:web:7d6d6ec0bb22858173e007',
  measurementId: 'G-Q4BM0L9E1E',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
