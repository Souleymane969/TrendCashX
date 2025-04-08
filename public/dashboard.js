import { firebaseAuth, firebaseDB } from "./firebase.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { doc, getDoc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

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

const editProfileForm = document.getElementById("edit-profile-form");
const updateMessage = document.getElementById("update-message");
// Surveiller l'état de l'utilisateur
onAuthStateChanged(firebaseAuth, async (user) => {
  if (user) {
    const uid = user.uid;
    
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-storage.js";

// Références DOM
const profilePicInput = document.getElementById("profile-pic");
const uploadBtn = document.getElementById("upload-btn");
const uploadMessage = document.getElementById("upload-message");
const preview = document.getElementById("preview");

profilePicInput.addEventListener("change", () => {
  const file = profilePicInput.files[0];
 if (file) {
    preview.src = URL.createObjectURL(file);
    preview.style.display = "block";
  }
});

uploadBtn.addEventListener("click", async () => {
  const file = profilePicInput.files[0];
  if (!file) {
    uploadMessage.textContent = "Veuillez sélectionner une image.";
    uploadMessage.style.color = "red";
    return;
  }

  // Vérification taille (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    uploadMessage.textContent = "Image trop lourde (max 2 Mo)";
    uploadMessage.style.color = "red";
    return;
  }

  const user = firebaseAuth.currentUser;
  if (!user) return;

  const fileRef = ref(firebaseStorage, `profile_photos/user.uid/{file.name}`);

  try {
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);

    // Met à jour Firestore
    const userRef = doc(firebaseDB, "Saadia_users", user.uid);
    await setDoc(userRef, { PhotoURL: url }, { merge: true });

    uploadMessage.textContent = "Image téléchargée avec succès !";
    uploadMessage.style.color = "green";
  } catch (err) {
    console.error("Erreur d’upload :", err);
    uploadMessage.textContent = "Erreur lors de l'upload.";
    uploadMessage.style.color = "red";
  }
});
    
    // Affichage de base
    welcomeText.textContent = `Bienvenue, user.displayName || "Utilisateur"¡;
    userEmail.textContent = user.email;

    if (user.photoURL) 
      userPhoto.src = user.photoURL;
      userPhoto.classList.remove("hidden");

    // Récupérer données Firestore
    const userDocRef = doc(firebaseDB, "Saadia_users", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) 
      const data = userDocSnap.data();

      // 🔐 Sécurité avancée : accès réservé aux admins
      if (data.Rôle !== "Admin") 
        alert("⛔ Accès refusé : vous n'avez pas les droits pour accéder au tableau de bord.");
        window.location.href = "index.html";
        return;
      
      userName.textContent = `Nom :{data.Nom || ""} data.Prénom || ""`;
      userCountry.textContent = `Pays :{data.Pays || ""}`;
      userCity.textContent = `Ville : ${data.Ville || ""}`;
      loginCount.textContent = data.loginCount;
      lastLogin.textContent = data.lastLogin?.toDate().toLocaleString() || "Aucune";
    } else {
      // Création initiale du document utilisateur
      await setDoc(userDocRef, {
        Nom: "",
        Prénom: "",
        Pays: "",
        Ville: "",
        Âge: 0,
        PhotoURL: "",
        Rôle: "Utilisateur",
        loginCount: 1,
        lastLogin: serverTimestamp(),
      });
    }

    // Mise à jour du login count
    await setDoc(userDocRef, {
      loginCount: userDocSnap.exists() ? (userDocSnap.data().loginCount || 0) + 1 : 1,
      lastLogin: serverTimestamp(),
    }, { merge: true });

  } else {
    window.location.href = "index.html";
  }
});

// 🔄 Mettre à jour le profil (formulaire)
if (editProfileForm) {
  editProfileForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const newName = document.getElementById("edit-name").value;
    const newFirstName = document.getElementById("edit-firstname").value;
    const newAge = parseInt(document.getElementById("edit-age").value);
    const newCountry = document.getElementById("edit-country").value;
    const newCity = document.getElementById("edit-city").value;
    const newPhoto = document.getElementById("edit-photo").value;

    const user = firebaseAuth.currentUser;
    if (!user) {
      updateMessage.innerText = "Utilisateur non authentifié.";
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

      updateMessage.innerText = "Profil mis à jour avec succès.";
      updateMessage.style.color = "green";
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      updateMessage.innerText = "Erreur de mise à jour.";
      updateMessage.style.color = "red";
    }
  });
}

// 🔓 Déconnexion
if (logoutButton) {
  logoutButton.addEventListener("click", async () => {
    await signOut(firebaseAuth);
    window.location.href = "index.html";
  });
}
