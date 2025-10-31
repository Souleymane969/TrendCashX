// --- Configuration Firebase ---
const firebaseConfig = {
  apiKey: "TA_CLE_API_ICI",
  authDomain: "trendcashx.firebaseapp.com",
  projectId: "trendcashx",
  storageBucket: "trendcashx.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef12345"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// --- Connexion Web2 avec Firebase Auth ---
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    await auth.signInWithEmailAndPassword(email, password);
    alert("✅ Connexion réussie via Firebase !");
    window.location.href = "index.html";
  } catch (error) {
    alert("❌ Erreur de connexion : " + error.message);
  }
});

// --- Connexion Web3 (MetaMask) ---
document.getElementById('connectWallet').addEventListener('click', async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      localStorage.setItem('wallet', account);
      alert(`✅ Wallet connecté : ${account}`);
      window.location.href = "index.html";
    } catch (err) {
      alert("❌ Connexion MetaMask refusée.");
    }
  } else {
    alert("🦊 MetaMask n'est pas installé !");
  }
});
