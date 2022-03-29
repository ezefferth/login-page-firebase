
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";



const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "login-page-portfolio.firebaseapp.com",
  projectId: "login-page-portfolio",
  storageBucket: "login-page-portfolio.appspot.com",
  messagingSenderId: "30360534217",
  appId: "1:30360534217:web:0d1437a30380717d412118",
  measurementId: "G-QHV2MRHWPR"
};

const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);


export default app;