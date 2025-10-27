// 🟢 Importation des modules
import express from "express";
import cors from "cors";
import { ethers } from "ethers";

const app = express();
app.use(cors());
app.use(express.json());

// 🌿 Page d’accueil
app.get("/", (req, res) => {
  res.send("Bienvenue sur TrendCashX NFT Platform 💚💛");
});

// 💎 Connexion du wallet Metamask
app.post("/connect-wallet", async (req, res) => {
  try {
    const { address } = req.body;
    if (!address) return res.status(400).json({ error: "Adresse manquante" });
    res.json({ message: `Wallet ${address} connecté avec succès !` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🖼️ Endpoint pour mint un NFT (bientôt relié à un smart contract)
app.post("/mint", async (req, res) => {
  const { name, description, ipfsUrl } = req.body;
  if (!name || !ipfsUrl) {
    return res.status(400).json({ error: "Données NFT incomplètes" });
  }
  res.json({
    message: `NFT '${name}' créé avec succès ! 🌿`,
    metadata: { name, description, image: ipfsUrl },
  });
});

// ⚙️ Lancement du serveur
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`🚀 Serveur NFT actif sur le port ${port}`));
