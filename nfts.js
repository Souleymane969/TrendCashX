import Image from "next/image";

export default function NFTs() {
  const nftCollection = [
    { id: 1, name: "Trend Pioneer", image: "/nfts/nft1.png", description: "Premier NFT officiel de TrendCashX." },
    { id: 2, name: "Trend Master", image: "/nfts/nft2.png", description: "NFT rare pour les contributeurs actifs." },
    { id: 3, name: "Trend Legend", image: "/nfts/nft3.png", description: "NFT de prestige pour les meilleurs créateurs." }
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🪙 TrendCashX NFT Collection</h1>
      <p style={styles.subtitle}>
        Découvrez, collectionnez et échangez des NFTs uniques liés aux tendances et aux créateurs de la plateforme.
      </p>

      <div style={styles.grid}>
        {nftCollection.map((nft) => (
          <div key={nft.id} style={styles.card}>
            <Image src={nft.image} alt={nft.name} width={200} height={200} style={styles.image} />
            <h3 style={styles.nftName}>{nft.name}</h3>
            <p style={styles.desc}>{nft.description}</p>
            <button style={styles.button}>🔗 Voir sur la blockchain</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    padding: "40px 20px",
    backgroundColor: "#f7f7f7",
    minHeight: "100vh",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#111",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#444",
    fontSize: "1rem",
    marginBottom: "40px",
  },
  grid: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "250px",
    padding: "15px",
  },
  image: {
    borderRadius: "10px",
  },
  nftName: {
    fontWeight: "bold",
    marginTop: "10px",
  },
  desc: {
    fontSize: "0.9rem",
    color: "#555",
  },
  button: {
    backgroundColor: "#0070f3",
    color: "white",
    border: "none",
    borderRadius: "10px",
    padding: "10px 15px",
    marginTop: "10px",
    cursor: "pointer",
  },
};
