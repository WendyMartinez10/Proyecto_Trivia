import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  GithubAuthProvider
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWpn6YeRz-TMWfJlgJ9CruuYndFiFd_yE",
  authDomain: "brainquiz-87571.firebaseapp.com",
  projectId: "brainquiz-87571",
  storageBucket: "brainquiz-87571.firebasestorage.app",
  messagingSenderId: "429274850022",
  appId: "1:429274850022:web:4b2b430beac473613bd127"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider =
  new GoogleAuthProvider();

export const githubProvider =
  new GithubAuthProvider();