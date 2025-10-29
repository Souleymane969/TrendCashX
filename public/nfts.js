// ===============================
//  TrendCashX - nfts.js
// ===============================
window.addEventListener("load", async () => {
  await initWeb3();
  const nftIds = await getMyNFTs();
  const container = document.getElementById("nftContainer");

  if (!nftIds || nftIds.length === 0) {
    container.innerHTML = "<p>Aucun NFT trouvé 😢</p>";
    return;
  }

  nftIds.forEach(id => {
    const card = document.createElement("div");
    card.className = "nft-card";
    card.innerHTML = `
      <img src="https://ipfs.io/ipfs/${id}/image.png" alt="NFT #${id}">
      <p>ID : #${id}</p>
    `;
    container.appendChild(card);
  });
});
