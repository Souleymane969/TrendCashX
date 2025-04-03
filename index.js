javascript
//  Importation des modules Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

//  Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCG1Pn09Ugf0gxGknitJTdZCcI70YbhSEk",
    authDomain: "trendcashx.firebaseapp.com",
    projectId: "trendcashx",
    storageBucket: "trendcashx.firebasestorage.app",
    messagingSenderId: "198131315912",
    appId: "1:198131315912:web:d533275cf1c4849f74a1fd",
    measurementId: "G-B0SN3CN30Z"
};

//  Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

console.log("Firebase chargé avec succès !");

//  Exportation des modules (si besoin)
export { auth, db };
