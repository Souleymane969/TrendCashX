// --- INSCRIPTION CLASSIQUE (Firebase) ---
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    await firebase.firestore().collection("users").doc(user.uid).set({
      username,
      email,
      walletAddress: null,
      createdAt: new Date()
    });

    alert("Inscription réussie ✅");
  } catch (error) {
    console.error("Erreur d’inscription :", error);
    alert("Erreur : " + error.message);
  }
});


// --- CONNEXION WEB3 / METAMASK ---
async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      const walletAddress = accounts[0];
      document.getElementById("walletStatus").textContent = "Wallet connecté : " + walletAddress;

      // Sauvegarder dans localStorage
      localStorage.setItem("walletAddress", walletAddress);

      // Si utilisateur déjà connecté à Firebase, on met à jour son profil
      const user = firebase.auth().currentUser;
      if (user) {
        await firebase.firestore().collection("users").doc(user.uid).update({
          walletAddress
        });
        alert("Wallet lié à ton compte ✅");
      } else {
        alert("Wallet connecté. Connecte-toi pour le lier à ton compte.");
      }

    } catch (error) {
      console.error("Erreur MetaMask :", error);
      alert("Connexion MetaMask refusée ❌");
    }
  } else {
    alert("MetaMask non détecté. Installe l’extension sur ton navigateur.");
  }
}

document.getElementById("connectWalletBtn").addEventListener("click", connectWallet);
