// ===============================
//  firebase.js - TrendCashX (Auth + Wallet)
// ===============================

// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { 
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut 
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { 
  getDatabase, ref, set, update, get, child 
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "TON_API_KEY",
  authDomain: "TON_PROJET.firebaseapp.com",
  databaseURL: "https://TON_PROJET.firebaseio.com",
  projectId: "TON_PROJET",
  storageBucket: "TON_PROJET.appspot.com",
  messagingSenderId: "XXXXXXXXXXXX",
  appId: "1:XXXXXXXX:web:XXXXXXXX"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

// ====================================
// 🔐 FONCTIONS AUTHENTIFICATION
// ====================================

// Créer un compte utilisateur
async function registerUser(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Enregistrer dans la DB
    await set(ref(db, 'users/' + user.uid), {
      email: user.email,
      createdAt: new Date().toISOString()
    });

    alert("✅ Compte créé avec succès !");
    return user.uid;
  } catch (error) {
    console.error("Erreur création de compte :", error);
    alert("Erreur : " + error.message);
  }
}

// Connexion utilisateur
async function loginUser(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    alert("👋 Bienvenue " + user.email);
    localStorage.setItem("userId", user.uid);
    return user.uid;
  } catch (error) {
    alert("Erreur de connexion : " + error.message);
  }
}

// Déconnexion
function logoutUser() {
  signOut(auth);
  localStorage.removeItem("userId");
  alert("🚪 Déconnecté !");
}

// ====================================
// 🔗 LIAISON WALLET
// ====================================

async function linkWalletToFirebase(userId, walletAddress) {
  if (!userId || !walletAddress) return;
  try {
    const userRef = ref(db, 'users/' + userId);
    await update(userRef, { walletAddress });
    console.log("✅ Wallet lié :", walletAddress);
  } catch (error) {
    console.error("Erreur liaison wallet :", error);
  }
}

// ====================================
// 💾 ENREGISTREMENT DES NFTs
// ====================================

async function saveNFTtoFirebase(userId, nftId, metadataURL) {
  if (!userId || !nftId) return;
  try {
    const nftRef = ref(db, `users/${userId}/nfts/${nftId}`);
    await set(nftRef, {
      id: nftId,
      metadata: metadataURL,
      timestamp: new Date().toISOString()
    });
    console.log("🎨 NFT sauvegardé :", nftId);
  } catch (error) {
    console.error("Erreur sauvegarde NFT :", error);
  }
}

export { 
  registerUser, loginUser, logoutUser, 
  linkWalletToFirebase, saveNFTtoFirebase 
};
