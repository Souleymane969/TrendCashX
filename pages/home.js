import React from "react";
import WalletConnect from "../components/WalletConnect";

const Home = () => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">
        🌐 Bienvenue sur TrendCashX NFT
      </h1>
      <WalletConnect />
    </div>
  );
};

export default Home;
