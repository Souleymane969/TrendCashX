import React from "react";
import NFTCard from "../components/NFTCard";

function NFTs() {
  const nftList = [
    { image: "/nfts/nft1.png", title: "NFT Vert", description: "Symbole de croissance et de prospérité." },
    { image: "/nfts/nft2.png", title: "NFT Jaune", description: "Rayonne la richesse et la joie divine." },
    { image: "/nfts/nft3.png", title: "NFT Mystique", description: "Lumière et sagesse spirituelle." },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 p-10">
      {nftList.map((nft, i) => (
        <NFTCard key={i} {...nft} />
      ))}
    </div>
  );
}

export default NFTs;
