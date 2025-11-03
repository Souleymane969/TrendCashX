async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      alert("Wallet connecté : " + account);
      // Exemple de redirection :
      // window.location.href = "dashboard.html";
    } catch (error) {
      console.error("Erreur de connexion au wallet :", error);
      alert("Connexion refusée !");
    }
  } else {
    alert("MetaMask non détecté ! Installez-le depuis metamask.io");
  }
}
