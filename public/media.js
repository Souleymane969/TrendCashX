import {
  firebaseAuth,
  firebaseDB,
  firebaseStorage
} from './firebase.js';

import {
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-storage.js";

import {
  doc,
  setDoc,
  addDoc,
  getDocs,
  getDoc,
  collection,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

// Références DOM
const mediaForm = document.getElementById('media-form');
const mediaFile = document.getElementById('media-file');
const mediaType = document.getElementById('media-type');
const mediaList = document.getElementById('media-list');
const message = document.getElementById('media-message');

// Vérifie si l'utilisateur est connecté
let currentUserUID = null;

onAuthStateChanged(firebaseAuth, (user) => {
  if (user) {
    currentUserUID = user.uid;
    loadUserMedia(); // charger les fichiers de l’utilisateur
 } else {
    window.location.href = "index.html"; // rediriger vers connexion
  }
});

// Envoi du fichier
mediaForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (!mediaFile.files[0] || !mediaType.value || !currentUserUID) {
    message.textContent = "Veuillez remplir tous les champs.";
    message.style.color = "red";
    return;
  }

  const file = mediaFile.files[0];
  const type = mediaType.value;
  const fileRef = ref(firebaseStorage, `uploads/currentUserUID/{Date.now()}-${file.name}`);

  try {
    await uploadBytes(fileRef, file);
    const fileURL = await getDownloadURL(fileRef);

    await addDoc(collection(firebaseDB, "Saadia_media"), {
      userId: currentUserUID,
      type: type,
      fileURL: fileURL,
      timestamp: serverTimestamp(),
      reward: 1
    });

    message.textContent = "Fichier publié avec succès 🎉 +1 point";
    message.style.color = "green";
    loadUserMedia();
  } catch (error) {
    console.error(error);
    message.textContent = "Erreur lors de l’envoi du fichier.";
    message.style.color = "red";
  }
});

// Affichage dynamique des fichiers publiés
async function loadUserMedia() {
  mediaList.innerHTML = "";

  const querySnapshot = await getDocs(collection(firebaseDB, "Saadia_media"));
  const data = docSnap.data();
    const div = document.createElement("div");
    div.className = "media-item";

    if (data.type === "image") 
      div.innerHTML = `<img src="{data.fileURL}" width="200" /><p>+data.reward🪙</p>`;
     else if (data.type === "video") 
      div.innerHTML = `<video width="200" controls><source src="{data.fileURL}" /></video><p>+${data.reward}🪙</p>`;
    }

    mediaList.appendChild(div);
  });
}
