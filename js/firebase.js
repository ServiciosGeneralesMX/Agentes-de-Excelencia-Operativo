// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
const firebaseConfig = {
  // Paste your firebase config here
    apiKey: "AIzaSyCJu5AFtATruWMJouaP9LB4lrbIv2tAOgY",
    authDomain: "agentes-de-excelencia.firebaseapp.com",
    databaseURL: "https://agentes-de-excelencia-default-rtdb.firebaseio.com",
    projectId: "agentes-de-excelencia",
    storageBucket: "agentes-de-excelencia.appspot.com",
    messagingSenderId: "1013460803165",
    appId: "1:1013460803165:web:f7a3a5789a2d47e816b7b4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
//const analytics = getAnalytics(app);

