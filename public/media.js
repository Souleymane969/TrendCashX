// ===============================
//  media.js - TrendCashX NFT Media
// ===============================

const mediaItems = [
  {
    id: 1,
    title: "🌅 Beach Memories",
    type: "image",
    src: "https://ipfs.io/ipfs/QmExampleBeachImage",
    metadata: "https://ipfs.io/ipfs/QmMetadata1"
  },
  {
    id: 2,
    title: "🎧 Tara – Le Single Original",
    type: "audio",
    src: "https://ipfs.io/ipfs/QmExampleAudioFile",
    metadata: "https://ipfs.io/ipfs/QmMetadata2"
  },
  {
    id: 3,
    title: "🎬 Clip NFT TrendCashX",
    type: "video",
    src: "https://ipfs.io/ipfs/QmExampleVideoFile",
    metadata: "https://ipfs.io/ipfs/QmMetadata3"
  }
];

async function connectWallet() {
  await initWeb3();
  if (userAccount) {
    document.getElementById('walletAddress').innerText = userAccount;
    loadMediaGallery();
  }
}

// Charger la galerie média
function loadMediaGallery() {
  const gallery = document.getElementById('mediaGallery');
  gallery.innerHTML = "";

  mediaItems.forEach(item => {
    const card = document.createElement("div");
    card.className = "media-card";

    let mediaElement;
    if (item.type === "image") {
      mediaElement = `<img src="${item.src}" alt="${item.title}" width="200">`;
    } else if (item.type === "audio") {
      mediaElement = `<audio controls src="${item.src}"></audio>`;
    } else if (item.type === "video") {
      mediaElement = `<video controls width="250"><source src="${item.src}" type="video/mp4"></video>`;
    }

    card.innerHTML = `
      <h3>${item.title}</h3>
      ${mediaElement}
      <button onclick="mintMediaNFT('${item.metadata}')">🪄 Minter en NFT</button>
    `;

    gallery.appendChild(card);
  });
}

// Fonction de mint NFT
async function mintMediaNFT(metadataURL) {
  if (!contract || !userAccount) return alert("Connecte ton wallet avant de minter.");

  try {
    const tx = await contract.methods.mintNFT(metadataURL).send({
      from: userAccount,
      value: web3.utils.toWei('0.01', 'ether')
    });
    console.log("✅ NFT minté :", tx);
    alert("🎉 Ce média a été transformé en NFT !");
  } catch (error) {
    console.error("❌ Échec du mint :", error);
    alert("Erreur lors du mint du média.");
  }
}
