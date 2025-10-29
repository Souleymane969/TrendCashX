// index.js - Backend Firebase pour TrendCashX NFT Platform

import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Configuration Firebase
const firebaseConfig = {
  apiKey: "TA_CLE_API_ICI",
  authDomain: "trendcashx.firebaseapp.com",
  projectId: "trendcashx",
  storageBucket: "trendcashx.appspot.com",
  messagingSenderId: "XXXXXXX",
  appId: "XXXXXXX",
};

// Initialisation
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// ✅ Route d’accueil
app.get("/", (req, res) => {
  res.send("🚀 TrendCashX NFT Backend is running!");
});

// ✅ Récupération de tous les NFTs
app.get("/api/nfts", async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "nfts"));
    const nfts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(nfts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors de la récupération des NFTs." });
  }
});

// ✅ Ajout d’un nouveau NFT
app.post("/api/mint", async (req, res) => {
  try {
    const { name, image, owner, description } = req.body;
    const docRef = await addDoc(collection(db, "nfts"), {
      name,
      image,
      owner,
      description,
      createdAt: new Date(),
    });
    res.json({ success: true, id: docRef.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur lors du mint du NFT." });
  }
});

// ✅ Profil utilisateur simple
app.get("/api/profile/:wallet", async (req, res) => {
  const wallet = req.params.wallet;
  try {
    const snapshot = await getDocs(collection(db, "nfts"));
    const userNFTs = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(nft => nft.owner === wallet);
    res.json(userNFTs);
  } catch (err) {
    res.status(500).json({ error: "Erreur lors du chargement du profil." });
  }
});

// 🚀 Lancement serveur local
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Serveur TrendCashX NFT actif sur le port ${PORT}`));
