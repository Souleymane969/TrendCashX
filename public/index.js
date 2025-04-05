import { firebaseAuth } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gtatic.com/firebasejs/10.7.1/firebase-auth.js";

// Sélection du formulaire et des champs
const signupForm = document.getElementById("signup-form");
const signupMessage = document.getElementById("signup-message");

// Vérifier si le formulaire existe avant d'ajouter l'écouteur
if (signupForm) {
    signupForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // Empêcher le rechargement de la page

        // Récupération des valeurs des champs
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            // Inscription de l'utilisateur avec Firebase
 const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            const user = userCredential.user;

            // Affichage d'un message de succès
            signupMessage.innerText = "Inscription réussie !";
            signupMessage.style.color = "green";
            console.log("Utilisateur inscrit :", user);
        } catch (error) {
            // Gestion des erreurs
            signupMessage.innerText = `Erreur d'inscription : ${error.message}`;
            signupMessage.style.color = "red";
            console.error("Erreur d'inscription :", error);
        }
    });
} else {
    console.error("Le formulaire d'inscription est introuvable !");
}
