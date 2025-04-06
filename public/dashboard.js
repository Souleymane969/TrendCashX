import { firebaseAuth, firebaseDB } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Références DOM
const welcomeText = document.getElementById("welcome-text");
const userPhoto = document.getElementById("user-photo");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const userCountry = document.getElementById("user-country");
const userCity = document.getElementById("user-city");
const logoutButton = document.getElementById("logout-button");

// Surveiller l'état de l'utilisateur
onAuthStateChanged(firebaseAuth, async (user) => {
  if (user) {
    const uid = user.uid;

    // Affichage basique
    welcomeText.textContent = `Bienvenue, ${user.displayName || "Utilisateur"}`;
    userEmail.textContent = user.email;

    if (user.photoURL) {
      userPhoto.src = user.photoURL;
      userPhoto.classList.remove("hidden");
    }
 // Récupérer données Firestore (profil)
    const docRef = doc(firebaseDB, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      userName.textContent = data.name || "-";
      userCountry.textContent = data.country || "-";
      userCity.textContent = data.city || "-";
    } else {
      console.warn("Profil utilisateur non trouvé.");
    }

  } else {
    // Rediriger si non connecté
    window.location.href = "index.html";
  }
});

// Déconnexion
logoutButton.addEventListener("click", async () => {
  try {
    await signOut(firebaseAuth);
    window.location.href = "index.html";
  } catch (error) {
    console.error("Erreur de déconnexion :", error.message);
  }
});
