import {
  firebaseAuth,
  firebaseDB,
  doc,
  getDoc,
  getDocs,
  collection,
  onAuthStateChanged,
} from "./firebase.js";

// Références DOM
const adminPhoto = document.getElementById("admin-photo");
const totalUsers = document.getElementById("total-users");
const todayUsers = document.getElementById("today-users");
const userTableBody = document.getElementById("user-table-body");

onAuthStateChanged(firebaseAuth, async (user) => {
  if (!user) {
    alert("Accès refusé. Veuillez vous connecter.");
    window.location.href = "index.html";
    return;
  }

  const userDoc = await getDoc(doc(firebaseDB, "Saadia_users", user.uid));
  if (!userDoc.exists() || userDoc.data().Rôle !== "Admin") {
    alert("Accès refusé. Vous n'êtes pas administrateur.");
 window.location.href = "index.html";
    return;
  }

  // Afficher la photo admin
  if (user.photoURL) {
    adminPhoto.src = user.photoURL;
    adminPhoto.classList.remove("hidden");
  }

  // Charger les utilisateurs
  loadUsers();
});

// 📦 Fonction pour charger tous les utilisateurs
async function loadUsers() {
  const usersSnap = await getDocs(collection(firebaseDB, "Saadia_users"));
  const today = new Date().toDateString();
  let total = 0;
  let todayCount = 0;

  userTableBody.innerHTML = ""; // Reset

  usersSnap.forEach((docSnap) => {
    const data = docSnap.data();
    total++;

    const lastLoginDate = data.lastLogin?.toDate().toDateString();
    if (lastLoginDate === today) todayCount++;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><img src="data.PhotoURL || """ alt="photo" width="50" style="border-radius: 50
      <td>{data.Prénom || ""} data.Nom || ""</td>
      <td>{data.email || ""}</td>
      <td>data.Pays || ""</td>
      <td>{data.Ville || ""}</td>
      <td>
        <button class="btn-view" onclick="editUser('${docSnap.id}')">Modifier</button>
      </td>
    `;
    userTableBody.appendChild(tr);
  });

  totalUsers.textContent = total;
  todayUsers.textContent = todayCount;
}

// ✏️ Fonction de modification utilisateur window.editUser = function (userId) 
  alert(`Redirection vers la page de modification de l'utilisateur :{userId}`);
  // Tu peux créer une page dédiée ou une modale plus tard
}


window.exportToPDF = function () {
  const printContents = document.querySelector("table").outerHTML;
  const win = window.open("", "", "height=700,width=900");
  win.document.write("<html><head><title>Liste des Utilisateurs</title></head><body>");
  win.document.write(printContents);
  win.document.write("</body></html>");
  win.document.close();
  win.print();
};

window.exportToExcel = function () {
  const table = document.querySelector("table");
  const html = table.outerHTML;
  const blob = new Blob(["\ufeff", html], { type: "application/vnd.ms-excel" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "utilisateurs_trendcashx.xls";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
