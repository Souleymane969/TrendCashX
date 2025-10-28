import React, { useState } from "react";

function Mint() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  const mintNFT = () => {
    alert(`NFT "${name}" créé avec succès 🎨`);
  };

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h2 className="text-3xl font-bold text-yellow-300 mb-6">Créer ton propre NFT</h2>
      <input
        type="text"
        placeholder="Nom du NFT"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-3 rounded-lg text-green-900 mb-4 w-80"
      />
      <input
        type="text"
        placeholder="Lien de l’image (ou IPFS)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        className="p-3 rounded-lg text-green-900 mb-6 w-80"
      />
      <button
        onClick={mintNFT}
        className="bg-yellow-400 text-green-900 px-6 py-2 rounded-lg font-bold hover:bg-yellow-300 transition"
      >
        Minter NFT
      </button>
    </div>
  );
}

export default Mint;
