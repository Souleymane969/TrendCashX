import { firebaseDB, firebaseAuth } from "./firebase.js";
import {
  collection,
  getDocs,
  doc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";
import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";

import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-firestore.js";
import { firebaseAuth, firebaseDB } from "./firebase.js";

// --- Protection automatique ---
onAuthStateChanged(firebaseAuth, async (user) => {
  if (user) {
    const userRef = doc(firebaseDB, "Saadia_users", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data(); const role = data.Rôle?.trim().toLowerCase();

      if (role !== "admin") {
        alert("⛔ Accès interdit. Cette page est réservée aux administrateurs.");
        window.location.href = "index.html";
      }
    } else {
      alert("⚠️ Profil introuvable. Redirection...");
      window.location.href = "index.html";
    }
  } else {
    alert("🔐 Vous devez être connecté pour accéder à cette page.");
    window.location.href = "index.html";
  }
});

// Références DOM
const userTableBody = document.getElementById("user-table-body");
const totalUsers = document.getElementById("total-users");
const todayUsers = document.getElementById("today-users");

// Fonction de formatage de date
function isToday(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

// Authentification admin
onAuthStateChanged(firebaseAuth, async (user) => {
  if (!user) {
    window.location.href = "index.html"; // Rediriger si pas connecté
  } else {
    // Charger les données
 await loadUsers();
  }
});

// Charger tous les utilisateurs depuis Firestore
async function loadUsers() {
  const usersCol = collection(firebaseDB, "users");
  const userSnapshot = await getDocs(usersCol);
  const userList = userSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  let todayCount = 0;
  userTableBody.innerHTML = "";

  userList.forEach((user) => {
    const row = document.createElement("tr");

    if (isToday(user.createdAt)) {
      todayCount++;
    }

    row.innerHTML = `
      <td>user.name || "Non défini"</td>
      <td>{user.email || "—"}</td>
      <td>user.country || "—"</td>
      <td>{user.city || "—"}</td>
      <td class="actions">
        <button onclick="deleteUser('${user.id}')">Supprimer</button>
      </td>
    `;

    userTableBody.appendChild(row);
  });

  totalUsers.textContent = userList.length;
  todayUsers.textContent = todayCount;
}

// Supprimer un utilisateur
window.deleteUser = async function (userId) {
  if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
    await deleteDoc(doc(firebaseDB, "users", userId));
    alert("Utilisateur supprimé !");
    await loadUsers(); // Recharger la liste
  }
};
