// Import des fonctions Firebase
import { linkWalletToFirebase, saveNFTtoFirebase } from './firebase.js';

// Exemple d’ID utilisateur (si déjà connecté via Firebase Auth)
const userId = localStorage.getItem("userId");

// Lors de la connexion au wallet :
async function initWeb3() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);

      const accounts = await web3.eth.getAccounts();
      userAccount = accounts[0];
      console.log("✅ Wallet connecté :", userAccount);

      // 🔗 Lier à Firebase
      if (userId) await linkWalletToFirebase(userId, userAccount);

      contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      document.getElementById('walletAddress').innerText = userAccount;

    } catch (error) {
      console.error("⚠️ Connexion MetaMask échouée :", error);
    }
  } else {
    alert("🚫 MetaMask non détecté. Installe-le pour continuer !");
  }
}

// Lors du mint NFT :
async function mintNFT(metadataURL) {
  if (!contract || !userAccount) return alert("Connecte ton wallet d'abord.");

  try {
    const tx = await contract.methods.mintNFT(metadataURL).send({
      from: userAccount,
      value: web3.utils.toWei('0.01', 'ether')
    });

    console.log("✅ NFT minté avec succès :", tx);

    // 🔥 Enregistrer le NFT dans Firebase
    if (userId) {
      const nftId = tx.events?.Transfer?.returnValues?.tokenId || Date.now();
      await saveNFTtoFirebase(userId, nftId, metadataURL);
    }

    alert("🎉 NFT créé et sauvegardé !");
  } catch (error) {
    console.error("❌ Échec du mint :", error);
    alert("Erreur lors du mint du NFT.");
  }
}
