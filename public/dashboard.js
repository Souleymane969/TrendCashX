// ===============================
//  TrendCashX - dashboard.js
// ===============================

// Attendre que Web3.js soit chargé
async function mintNFTFromDashboard() {
  const metadataURL = document.getElementById("metadataUrl").value.trim();

  if (metadataURL === "") {
    alert("⚠️ Entre le lien IPFS du NFT (ex: https://ipfs.io/ipfs/xxxx/metadata.json)");
    return;
  }

  await mintNFT(metadataURL);
  await loadMyNFTs(); // recharge après mint
}

// Charger les NFTs de l'utilisateur connecté
async function loadMyNFTs() {
  const nftContainer = document.getElementById("nftContainer");
  nftContainer.innerHTML = "<p>⏳ Chargement des NFTs...</p>";

  try {
    const nftIds = await getMyNFTs();

    if (!nftIds || nftIds.length === 0) {
      nftContainer.innerHTML = "<p>Aucun NFT trouvé 😢</p>";
      return;
    }

    nftContainer.innerHTML = ""; // reset affichage

    // Pour chaque NFT, on crée une carte visuelle
    for (const id of nftIds) {
      const nftCard = document.createElement("div");
      nftCard.className = "nft-card";
      nftCard.innerHTML = `
        <img src="https://ipfs.io/ipfs/${id}/image.png" alt="NFT #${id}">
        <p><strong>ID :</strong> #${id}</p>
        <p><a href="https://bscscan.com/token/${CONTRACT_ADDRESS}?a=${id}" target="_blank">Voir sur BscScan</a></p>
      `;
      nftContainer.appendChild(nftCard);
    }

    // Total NFTs
    document.getElementById("totalNFTs").innerText = nftIds.length;

  } catch (error) {
    console.error("Erreur de chargement :", error);
    nftContainer.innerHTML = "<p>Erreur lors du chargement des NFTs ❌</p>";
  }
}

// Charger automatiquement après connexion
window.addEventListener("load", async () => {
  setTimeout(loadMyNFTs, 2000); // petit délai pour s'assurer que Web3 est prêt
});
