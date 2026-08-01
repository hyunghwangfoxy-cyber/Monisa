import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyAuCyFk9ls3qLGlVn_5oF_q-s4qYD63QZ4",
  authDomain: "monisa-elearning.firebaseapp.com",
  projectId: "monisa-elearning",
  storageBucket: "monisa-elearning.firebasestorage.app",
  messagingSenderId: "948630421605",
  appId: "1:948630421605:web:d43e724bdd3a53723bc68c"

};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;