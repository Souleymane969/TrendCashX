import React, { useState } from "react";
import { ethers } from "ethers";

function WalletConnect() {
  const [account, setAccount] = useState("");

  async function connectWallet() {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
    } else {
      alert("Installez MetaMask !");
    }
  }

  return (
    <button
      onClick={connectWallet}
      className="bg-yellow-500 text-green-900 px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition"
    >
      {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connecter Wallet"}
    </button>
  );
}

export default WalletConnect;
