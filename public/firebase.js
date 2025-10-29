// ===============================
//  firebase.js - TrendCashX
// ===============================

// Importation Firebase (v9)
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getDatabase, ref, set, update, get, child } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "TON_API_KEY",
  authDomain: "TON_PROJET.firebaseapp.com",
  databaseURL: "https://TON_PROJET.firebaseio.com",
  projectId: "TON_PROJET",
  storageBucket: "TON_PROJET.appspot.com",
  messagingSenderId: "XXXXXXXXXXXXX",
  appId: "1:XXXXXXXX:web:XXXXXXXX"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// ============================================
// 🔗 Fonction pour lier un compte Firebase à un wallet Web3
// ============================================
async function linkWalletToFirebase(userId, walletAddress) {
  if (!userId || !walletAddress) {
    console.error("Paramètres manquants pour la liaison Firebase <-> Wallet");
    return;
  }

  try {
    const userRef = ref(db, 'users/' + userId);
    await update(userRef, { walletAddress });
    console.log("✅ Wallet lié avec succès :", walletAddress);
  } catch (error) {
    console.error("Erreur lors de la liaison Firebase :", error);
  }
}

// ============================================
// 💾 Enregistrer un NFT minté dans Firebase
// ============================================
async function saveNFTtoFirebase(userId, nftId, metadataURL) {
  if (!userId || !nftId) return;

  try {
    const nftRef = ref(db, `users/${userId}/nfts/${nftId}`);
    await set(nftRef, {
      id: nftId,
      metadata: metadataURL,
      timestamp: new Date().toISOString()
    });
    console.log("🎨 NFT sauvegardé dans Firebase :", nftId);
  } catch (error) {
    console.error("Erreur Firebase (NFT save) :", error);
  }
}

// ============================================
// 📦 Charger les NFTs depuis Firebase
// ============================================
async function getUserNFTsFromFirebase(userId) {
  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `users/${userId}/nfts`));
    if (snapshot.exists()) {
      console.log("📦 NFTs de Firebase :", snapshot.val());
      return snapshot.val();
    } else {
      console.log("Aucun NFT trouvé dans Firebase");
      return {};
    }
  } catch (error) {
    console.error("Erreur lecture Firebase :", error);
  }
}

// Export des fonctions
export { linkWalletToFirebase, saveNFTtoFirebase, getUserNFTsFromFirebase };
