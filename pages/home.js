import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-6">
      <h1 className="text-5xl font-bold text-yellow-300 mb-4">Bienvenue sur TrendCashX NFT 🌍</h1>
      <p className="text-lg text-green-100 mb-8 max-w-2xl">
        Crée, collectionne et échange des NFTs sur notre plateforme décentralisée,
        inspirée par l’énergie verte et la richesse partagée.
      </p>
      <Link
        to="/nfts"
        className="bg-yellow-400 text-green-900 font-bold px-6 py-3 rounded-lg hover:bg-yellow-300 transition"
      >
        Explorer les NFTs
      </Link>
    </div>
  );
}

export default Home;
