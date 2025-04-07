import { firebaseAuth, firebaseDB } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Références DOM
const welcomeText = document.getElementById("welcome-text");
const userPhoto = document.getElementById("user-photo");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const userCountry = document.getElementById("user-country");
const userCity = document.getElementById("user-city");
const loginCount = document.getElementById("login-count");
const lastLogin = document.getElementById("last-login");
const logoutButton = document.getElementById("logout-button");

// Champs de modification
const editForm = document.getElementById("edit-profile-form");
const updateMessage = document.getElementById("update-message");

// Surveiller l’état de l’utilisateur
onAuthStateChanged(firebaseAuth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  const uid = user.uid;

  // Affichage
  welcomeText.textContent = `Bienvenue user.displayName || "👋"`;
  userEmail.textContent = user.email;

  if (user.photoURL) 
    userPhoto.src = user.photoURL;
    userPhoto.classList.remove("hidden");
  

  // Récupérer données Firestore
  const userRef = doc(firebaseDB, "Saadia_users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) 
    const data = userSnap.data();

    // Sécurité : Rôle admin obligatoire
    if (data.Rôle !== "Admin") 
      alert("Accès refusé. Seul l'administrateur peut accéder à ce tableau de bord.");
      signOut(firebaseAuth);
      window.location.href = "index.html";
      return;
    

    userName.textContent = `Nom :{data.Nom || ""} data.Prénom || ""`;
 userCountry.textContent = `Pays :{data.Pays || ""}`;
    userCity.textContent = `Ville : ${data.Ville || ""}`;
    loginCount.textContent = data.loginCount || 1;
    lastLogin.textContent = data.lastLogin?.toDate().toLocaleString() || "N/A";
  } else {
    // Création initiale
    await setDoc(userRef, {
      Nom: "",
      Prénom: "",
      Âge: 0,
      Pays: "",
      Ville: "",
      PhotoURL: user.photoURL || "",
      Rôle: "Admin",
      loginCount: 1,
      lastLogin: serverTimestamp()
    });
  }

  // Mise à jour du login count
  await setDoc(
    userRef,
    {
      loginCount: (userSnap.data()?.loginCount || 0) + 1,
      lastLogin: serverTimestamp()
    },
    { merge: true }
  );
});

// Bouton de déconnexion
logoutButton.addEventListener("click", async () => {
  await signOut(firebaseAuth);
  window.location.href = "index.html";
});

// Formulaire de modification
if (editForm) {
  editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newName = document.getElementById("edit-name").value;
    const newFirstName = document.getElementById("edit-firstname").value;
    const newAge = parseInt(document.getElementById("edit-age").value);
    const newCountry = document.getElementById("edit-country").value;
const newCity = document.getElementById("edit-city").value;
    const newPhoto = document.getElementById("edit-photo").value;

    const user = firebaseAuth.currentUser;
    if (!user) {
      updateMessage.innerText = "Utilisateur non connecté.";
      updateMessage.style.color = "red";
      return;
    }

    try {
      const userRef = doc(firebaseDB, "Saadia_users", user.uid);
      await setDoc(
        userRef,
        {
          Nom: newName,
          Prénom: newFirstName,
          Âge: newAge,
          Pays: newCountry,
          Ville: newCity,
          PhotoURL: newPhoto
        },
        { merge: true }
      );

      updateMessage.innerText = "Profil mis à jour avec succès ✅";
      updateMessage.style.color = "green";
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      updateMessage.innerText = "Erreur mise à jour ❌";
      updateMessage.style.color = "red";
    }
  });
}
