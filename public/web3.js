// ===============================
//  Web3.js - TrendCashX NFT System
// ===============================

// Adresse du contrat NFT (à remplacer par la tienne)
const CONTRACT_ADDRESS = "0x1234567890abcdef1234567890abcdef12345678"; 

// ABI du contrat (extrait principal)
const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "tokenURI", "type": "string" }
    ],
    "name": "mintNFT",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }],
    "name": "walletOfOwner",
    "outputs": [{ "internalType": "uint256[]", "name": "", "type": "uint256[]" }],
    "stateMutability": "view",
    "type": "function"
  }
];

// Déclaration globale
let web3;
let contract;
let userAccount;

// Initialisation Web3 et MetaMask
async function initWeb3() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      web3 = new Web3(window.ethereum);

      const accounts = await web3.eth.getAccounts();
      userAccount = accounts[0];
      console.log("✅ Wallet connecté :", userAccount);

      contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
      console.log("✅ Contrat NFT chargé :", CONTRACT_ADDRESS);

      document.getElementById('walletAddress').innerText = userAccount;

    } catch (error) {
      console.error("⚠️ Connexion MetaMask échouée :", error);
    }
  } else {
    alert("🚫 MetaMask non détecté. Installe-le pour continuer !");
  }
}

// Fonction de mint NFT
async function mintNFT(metadataURL) {
  if (!contract || !userAccount) return alert("Connecte ton wallet d'abord.");

  try {
    const tx = await contract.methods.mintNFT(metadataURL).send({
      from: userAccount,
      value: web3.utils.toWei('0.01', 'ether') // prix du mint si nécessaire
    });
    console.log("✅ NFT minté avec succès :", tx);
    alert("🎉 NFT créé avec succès !");
  } catch (error) {
    console.error("❌ Échec du mint :", error);
    alert("Erreur lors du mint du NFT.");
  }
}

// Obtenir la liste des NFTs de l’utilisateur
async function getMyNFTs() {
  if (!contract || !userAccount) return alert("Connecte ton wallet.");

  try {
    const nftIds = await contract.methods.walletOfOwner(userAccount).call();
    console.log("📦 Tes NFTs :", nftIds);
    return nftIds;
  } catch (error) {
    console.error("Erreur lors du chargement des NFTs :", error);
  }
}

// Obtenir le total de NFTs mintés
async function getTotalSupply() {
  if (!contract) return;
  try {
    const total = await contract.methods.totalSupply().call();
    console.log("🔢 Total NFTs :", total);
    return total;
  } catch (error) {
    console.error("Erreur totalSupply :", error);
  }
}

// Exécution au chargement
window.addEventListener('load', initWeb3);
