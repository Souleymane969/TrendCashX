// ===============================
//  admin.js - TrendCashX NFT Admin
// ===============================

const ADMIN_ADDRESS = "0xYOUR_ADMIN_WALLET_HERE"; // Ton adresse MetaMask admin

async function connectAdminWallet() {
  await initWeb3();
  document.getElementById("connectedWallet").innerText = userAccount;

  if (userAccount.toLowerCase() !== ADMIN_ADDRESS.toLowerCase()) {
    alert("🚫 Accès refusé. Tu n'es pas l'administrateur.");
    window.location.href = "login.html";
    return;
  }

  document.getElementById("adminAddress").innerText = ADMIN_ADDRESS;
  alert("✅ Connexion administrateur réussie !");
  refreshStats();
  loadUserList();
}

// Obtenir les statistiques globales
async function refreshStats() {
  const total = await getTotalSupply();
  document.getElementById("totalNFTs").innerText = total;
  const price = await getMintPrice();
  document.getElementById("mintPrice").innerText = price;
}

// Lire le prix du mint depuis le contrat
async function getMintPrice() {
  try {
    const priceWei = await contract.methods.mintPrice().call();
    return web3.utils.fromWei(priceWei, "ether");
  } catch (error) {
    console.error("Erreur lecture du prix :", error);
    return "0";
  }
}

// Modifier le prix du mint
async function updateMintPrice() {
  const newPrice = document.getElementById("newPrice").value;
  if (!newPrice || newPrice <= 0) return alert("Saisis un prix valide.");

  try {
    await contract.methods.setMintPrice(web3.utils.toWei(newPrice, "ether")).send({ from: userAccount });
    alert("✅ Nouveau prix appliqué !");
    refreshStats();
  } catch (error) {
    console.error("Erreur modification prix :", error);
  }
}

// Retirer les fonds du contrat (seul admin)
async function withdrawFunds() {
  try {
    await contract.methods.withdraw().send({ from: userAccount });
    alert("💸 Fonds retirés avec succès !");
  } catch (error) {
    console.error("Erreur retrait fonds :", error);
  }
}

// Charger la liste des utilisateurs et leurs NFTs
async function loadUserList() {
  try {
    // (Cette partie suppose que ton contrat NFT enregistre les propriétaires)
    const total = await getTotalSupply();
    const users = {};

    for (let i = 1; i <= total; i++) {
      const owner = await contract.methods.ownerOf(i).call();
      users[owner] = users[owner] ? users[owner] + 1 : 1;
    }

    let html = "<ul>";
    Object.keys(users).forEach(addr => {
      html += `<li>${addr} → ${users[addr]} NFT(s)</li>`;
    });
    html += "</ul>";

    document.getElementById("userList").innerHTML = html;
  } catch (error) {
    console.error("Erreur chargement utilisateurs :", error);
    document.getElementById("userList").innerText = "Erreur de chargement.";
  }
}
