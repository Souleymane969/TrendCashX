import React from "react";
import { Link } from "react-router-dom";
import WalletConnect from "./WalletConnect";

function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-green-800 shadow-md">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Logo" className="h-10 w-10 rounded-full" />
        <h1 className="font-bold text-xl text-yellow-400">TrendCashX NFTs</h1>
      </div>
      <div className="flex space-x-6">
        <Link to="/" className="hover:text-yellow-300">Accueil</Link>
        <Link to="/nfts" className="hover:text-yellow-300">NFTs</Link>
        <Link to="/mint" className="hover:text-yellow-300">Créer</Link>
        <Link to="/profile" className="hover:text-yellow-300">Profil</Link>
      </div>
      <WalletConnect />
    </nav>
  );
}

export default Navbar;
