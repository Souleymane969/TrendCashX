// --- CONNEXION CLASSIQUE (Firebase) ---
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    const user = userCredential.user;

    // Récupération des infos utilisateur
    const userDoc = await firebase.firestore().collection("users").doc(user.uid).get();
    const userData = userDoc.data();

    localStorage.setItem("walletAddress", userData.walletAddress || "");
    alert("Connexion réussie ✅");

    window.location.href = "dashboard.html"; // redirige vers ton espace principal
  } catch (error) {
    console.error("Erreur de connexion :", error);
    alert("Erreur : " + error.message);
  }
});


// --- CONNEXION VIA METAMASK ---
async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      const walletAddress = accounts[0];
      document.getElementById("walletStatus").textContent = "Wallet connecté : " + walletAddress;

      localStorage.setItem("walletAddress", walletAddress);

      // Recherche dans la base Firestore si un utilisateur possède ce wallet
      const snapshot = await firebase.firestore()
        .collection("users")
        .where("walletAddress", "==", walletAddress)
        .get();

      if (!snapshot.empty) {
        // Wallet trouvé → connexion automatique
        const userData = snapshot.docs[0].data();
        alert("Connexion réussie via MetaMask ✅ (" + userData.username + ")");
        window.location.href = "dashboard.html";
      } else {
        alert("Aucun compte lié à ce wallet ❌. Crée un compte d'abord.");
      }

    } catch (error) {
      console.error("Erreur MetaMask :", error);
      alert("Connexion MetaMask refusée ❌");
    }
  } else {
    alert("MetaMask non détecté. Installe-le pour te connecter.");
  }
}

document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);
