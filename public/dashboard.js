import { firebaseAuth, firebaseDB } from "./firebase.js";
import {
  onAuthStateChanged,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// Références DOM
const welcomeText = document.getElementById("welcome-text");
const userEmail = document.getElementById("user-email");
const userPhoto = document.getElementById("user-photo");
const userName = document.getElementById("user-name");
const userCountry = document.getElementById("user-country");
const userCity = document.getElementById("user-city");

const editProfileForm = document.getElementById("edit-profile-form");
const editName = document.getElementById("edit-name");
const editCountry = document.getElementById("edit-country");
const editCity = document.getElementById("edit-city");
const uploadPhotoInput = document.getElementById("upload-photo");
const previewPhoto = document.getElementById("preview-photo");

const loginCount = document.getElementById("login-count");
const lastLogin = document.getElementById("last-login");

const logoutButton = document.getElementById("logout-button");

// Surveiller l'état de l'utilisateur
onAuthStateChanged(firebaseAuth, async (user) => {
  if (user) {
    const uid = user.uid;

    // Affichage de base
    welcomeText.textContent = `Bienvenue user.displayName || "Utilisateur"`;
    userEmail.textContent = user.email;

    if (user.photoURL) 
      userPhoto.src = user.photoURL;
      userPhoto.classList.remove("hidden");
    

    // Récupérer données Firestore
    const userDocRef = doc(firebaseDB, "users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) 
      const data = userDocSnap.data();
      userName.textContent = `Nom :{data.name || "Non défini"}`;
      userCountry.textContent = `Pays : data.country || "Non défini"`;
      userCity.textContent = `Ville :{data.city || "Non défini"}`;

      loginCount.textContent = data.loginCount || 1;
      lastLogin.textContent = data.lastLogin?.toDate().toLocaleString() || "-";
    } else {
      // Création initiale
 await setDoc(userDocRef, {
        name: "",
        country: "",
        city: "",
        loginCount: 1,
        lastLogin: serverTimestamp(),
      });
    }

    // Mise à jour du login count et date
    await updateDoc(userDocRef, {
      loginCount: (userDocSnap.data()?.loginCount || 0) + 1,
      lastLogin: serverTimestamp(),
    });

  } else {
    // Rediriger vers login
    window.location.href = "index.html";
  }
});

// Mise à jour du profil
editProfileForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = firebaseAuth.currentUser;

  if (user) {
    const uid = user.uid;
    const userDocRef = doc(firebaseDB, "users", uid);

    await updateDoc(userDocRef, {
      name: editName.value,
      country: editCountry.value,
      city: editCity.value,
    });

    if (editName.value) {
      await updateProfile(user, {
        displayName: editName.value,
      });
    }

    alert("Profil mis à jour !");
    location.reload();
  }
});

// Upload de photo
uploadPhotoInput.addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = async () => {
    const dataURL = reader.result;
    previewPhoto.src = dataURL;

    const user = firebaseAuth.currentUser;
    if (user) {
 await updateProfile(user, {
        photoURL: dataURL,
      });
      alert("Photo mise à jour !");
      location.reload();
    }
  };

const editForm = document.getElementById("edit-profile-form");
const updateMessage = document.getElementById("update-message");

if (editForm) {
 editForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const user = firebaseAuth.currentUser;
    if (!user) return;

    const uid = user.uid;
    const docRef = doc(firebaseDB, "Saadia_users", uid);

    const updatedData = {
      nom: document.getElementById("edit-name").value,
      prenom: document.getElementById("edit-firstname").value,
      age: parseInt(document.getElementById("edit-age").value),
      pays: document.getElementById("edit-country").value,
      ville: document.getElementById("edit-city").value,
      photo: document.getElementById("edit-photo").value,
    };

    try {
      await setDoc(docRef, updatedData, { merge: true });
      updateMessage.innerText = "Profil mis à jour avec succès !";
      updateMessage.style.color = "green";
    } catch (error) {
      console.error("Erreur de mise à jour :", error);
      updateMessage.innerText = "Erreur lors de la mise à jour.";
      updateMessage.style.color = "red";
    }
  });
} 

  if (file) reader.readAsDataURL(file);
});

// Déconnexion
logoutButton.addEventListener("click", async () => {
  await signOut(firebaseAuth);
  window.location.href = "index.html";
});
