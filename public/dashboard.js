// --- Imports Firebase ---
import {
  firebaseAuth,
  firebaseDB,
  firebaseStorage
} from './firebase.js';

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

// --- RÉFÉRENCES DOM ---
const welcomeText = document.getElementById("welcome-text");
const userPhoto = document.getElementById("user-photo");
const userName = document.getElementById("user-name");
const userEmail = document.getElementById("user-email");
const userCountry = document.getElementById("user-country");
const userCity = document.getElementById("user-city");
const loginCount = document.getElementById("login-count");
const lastLogin = document.getElementById("last-login");
const logoutButton = document.getElementById("logout-button");

// Modification
const editProfileForm = document.getElementById("edit-profile-form");
const updateMessage = document.getElementById("update-message");

// Upload photo
const uploadInput = document.getElementById("profile-pic-input");
const uploadBtn = document.getElementById("upload-btn");
const uploadMessage = document.getElementById("upload-message");

// --- AUTHENTIFICATION ---
onAuthStateChanged(firebaseAuth, async (user) => {
  if (user) {
    const uid = user.uid;
    welcomeText.textContent = `Bienvenue, user.displayName || "utilisateur" 👋`;
    userEmail.textContent = user.email;

    if (user.photoURL) 
      userPhoto.src = user.photoURL;
      userPhoto.classList.remove("hidden");
    

    const userDocRef = doc(firebaseDB, "Saadia_users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) 
      const data = userDocSnap.data();
      userName.textContent = `Nom :{data.Nom}`;
      userCountry.textContent = `Pays : data.Pays`;
      userCity.textContent = `Ville :{data.Ville}`;
      loginCount.textContent = data.loginCount;
      lastLogin.textContent = new Date(data.lastLogin?.seconds * 1000).toLocaleString();
    } else {
      await setDoc(userDocRef, {
        name: "",
        country: "",
        city: "",
        loginCount: 1,
        lastLogin: serverTimestamp(),
      });
    }
  } else {
    window.location.href = "index.html";
  }
});

// --- LOGOUT ---
if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    await signOut(firebaseAuth);
    window.location.href = "index.html";
  });
}

// --- MISE À JOUR DU PROFIL ---
if (editProfileForm) {
  editProfileForm.addEventListener("submit", async (e) => {
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
      await setDoc(userRef, {
        Nom: newName,
        Prénom: newFirstName,
        Âge: newAge,
        Pays: newCountry,
        Ville: newCity,
        PhotoURL: newPhoto
      }, { merge: true });

      updateMessage.innerText = "Profil mis à jour avec succès ✅";
      updateMessage.style.color = "green";
    } catch (error) {
      console.error("Erreur mise à jour :", error);
      updateMessage.innerText = "Erreur lors de la mise à jour ❌";
      updateMessage.style.color = "red";
    }
  });
}

// --- UPLOAD PHOTO ---
if (uploadBtn) {
  uploadBtn.addEventListener("click", async () => {
    const file = uploadInput.files[0];
    if (!file) {
      uploadMessage.innerText = "Aucun fichier sélectionné.";
      return;
    }

    const user = firebaseAuth.currentUser;
    if (!user) {
      uploadMessage.innerText = "Utilisateur non connecté.";
      return;
    }

    try {
      const storageRef = ref(firebaseStorage, `profile_pics/${user.uid}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      // Mettre à jour l'utilisateur
      await setDoc(doc(firebaseDB, "Saadia_users", user.uid), {
        PhotoURL: downloadURL
      }, { merge: true });

      // Affichage immédiat
      userPhoto.src = downloadURL;
      userPhoto.classList.remove("hidden");

      uploadMessage.innerText = "Photo téléchargée ✅";
 uploadMessage.style.color = "green";
    } catch (err) {
      console.error("Erreur upload :", err);
      uploadMessage.innerText = "Échec du téléversement ❌";
      uploadMessage.style.color = "red";
    }
  });
}
