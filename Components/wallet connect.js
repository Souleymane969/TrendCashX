import React, { useState } from "react";
import { ethers } from "ethers";

const WalletConnect = () => {
  const [account, setAccount] = useState(null);

  // Fonction pour connecter le wallet
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setAccount(address);
      } catch (error) {
        console.error("Erreur connexion Metamask:", error);
      }
    } else {
      alert("Metamask non détecté. Installe-le d’abord sur ton navigateur !");
    }
  };

  return (
    <div className="wallet-connect p-4 bg-gray-900 text-white rounded-2xl shadow-lg text-center">
      <h2 className="text-lg font-semibold mb-3">Connexion Wallet</h2>
      {account ? (
        <p className="text-green-400">
          ✅ Connecté : {account.substring(0, 6)}...{account.slice(-4)}
        </p>
      ) : (
        <button
          onClick={connectWallet}
          className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-xl transition"
        >
          Connecter Metamask
        </button>
      )}
    </div>
  );
};

export default WalletConnect;
