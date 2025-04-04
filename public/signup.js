import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, TwitterAuthProvider, OAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

const auth = firebaseAuth; // Récupère Firebase Auth depuis firebase.js

// Fonction d'inscription par email
document.getElementById("signupForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            document.getElementById("statusMessage").innerText = " Inscription réussie !";
            console.log("Utilisateur inscrit :", userCredential.user);
        })
        .catch((error) => {
            document.getElementById("statusMessage").innerText = " Erreur : " + error.message;
            console.error("Erreur :", error.message);
        });
});

// Fonction d'inscription avec Google
document.getElementById("googleSignup").addEventListener("click", function() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
 document.getElementById("statusMessage").innerText = " Connecté avec Google !";
            console.log("Google :", result.user);
        })
        .catch((error) => {
            console.error("Erreur Google :", error.message);
        });
});

// Fonction d'inscription avec Facebook
document.getElementById("facebookSignup").addEventListener("click", function() {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            document.getElementById("statusMessage").innerText = " Connecté avec Facebook !";
            console.log("Facebook :", result.user);
        })
        .catch((error) => {
            console.error("Erreur Facebook :", error.message);
        });
});

// Fonction d'inscription avec Twitter
document.getElementById("twitterSignup").addEventListener("click", function() {
    const provider = new TwitterAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            document.getElementById("statusMessage").innerText = " Connecté avec Twitter !";
            console.log("Twitter :", result.user);
        })
        .catch((error) => {
            console.error("Erreur Twitter :", error.message);
        });
});

// Fonction d'inscription avec Microsoft
 document.getElementById("microsoftSignup").addEventListener("click", function() {
    const provider = new OAuthProvider('microsoft.com');
    signInWithPopup(auth, provider)
        .then((result) => {
            document.getElementById("statusMessage").innerText = " Connecté avec Microsoft !";
            console.log("Microsoft :", result.user);
        })
        .catch((error) => {
            console.error("Erreur Microsoft :", error.message);
        });
});
