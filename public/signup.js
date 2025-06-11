// signup.js
document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Compte créé avec succès !");
      // Redirection ou action après inscription
    })
    .catch((error) => {
      alert("Erreur : " + error.message);
    });
});
