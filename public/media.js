// Récupérer les éléments du DOM
const likeButtons = document.querySelectorAll('.like-button');
const commentForms = document.querySelectorAll('.comment-form');
const shareButtons = document.querySelectorAll('.share-button');
const commentInputs = document.querySelectorAll('.comment-input');
const commentLists = document.querySelectorAll('.comment-list');

// Fonction pour gérer les likes
likeButtons.forEach((button) => {
    button.addEventListener('click', async (e) => {
        const mediaId = e.target.dataset.mediaId;
        const userId = firebaseAuth.currentUser.uid;
        const mediaRef = doc(firebaseDB, 'media', mediaId);
        const mediaDoc = await getDoc(mediaRef);

        if (mediaDoc.exists()) {
            const data = mediaDoc.data();
            const likes = data.likes || [];

            if (likes.includes(userId)) {
            // L'utilisateur a déjà liké, donc on enlève le like
                await updateDoc(mediaRef, {
                    likes: arrayRemove(userId)
                });
                e.target.classList.remove('liked');
            } else {
                // L'utilisateur n'a pas encore liké, on ajoute un like
                await updateDoc(mediaRef, {
                    likes: arrayUnion(userId)
                });
                e.target.classList.add('liked');
            }
        }
    });
});

// Fonction pour gérer les commentaires
commentForms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const commentInput = e.target.querySelector('.comment-input');
        const commentText = commentInput.value.trim();
        const mediaId = e.target.dataset.mediaId;
        const userId = firebaseAuth.currentUser.uid;

        if (commentText === '') return; // Ne rien faire si le commentaire est vide

        const commentRef = doc(firebaseDB, 'media', mediaId);
        const commentData = {
            userId: userId,
            comment: commentText,
            timestamp: serverTimestamp(),
        };

        // Ajouter un commentaire à Firestore
        await updateDoc(commentRef, {
        comments: arrayUnion(commentData),
        });

        // Vider le champ de commentaire
        commentInput.value = '';
        loadComments(mediaId);
    });
});

// Fonction pour charger les commentaires
async function loadComments(mediaId) {
    const mediaRef = doc(firebaseDB, 'media', mediaId);
    const mediaDoc = await getDoc(mediaRef);

    if (mediaDoc.exists()) {
        const data = mediaDoc.data();
        const comments = data.comments || [];

        const commentList = document.querySelector(`[data-media-id="mediaId"] .comment-list`);
        commentList.innerHTML = ”;

        comments.forEach((comment) => 
            const commentItem = document.createElement('li');
            commentItem.textContent = `{comment.userId}: comment.comment`;
            commentList.appendChild(commentItem);
        );
    

// Fonction pour partager la vidéo
shareButtons.forEach((button) => 
    button.addEventListener('click', (e) => 
        const mediaId = e.target.dataset.mediaId;
        const shareLink = `{window.location.origin}/media/${mediaId}`;
        
        // Utiliser l'API Web Share si elle est disponible
        if (navigator.share) {
            navigator.share({
                title: 'Vidéos à partager',
                text: 'J’ai trouvé une vidéo géniale sur TrendCashX !',
                url: shareLink,
            ).catch((error) => console.error('Erreur de partage', error));
         else 
            // Si l'API Web Share n'est pas disponible, on peut afficher le lien
            alert(`Partagez ce lien :{shareLink}`);
        }
    });
});

// Initialiser la page avec les données (exemple : chargement des médias)
async function loadMedia() {
    const mediaRef = collection(firebaseDB, 'media');
    const mediaQuery = query(mediaRef, orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(mediaQuery);

    querySnapshot.forEach((docSnap) => {
        const mediaData = docSnap.data();
        const mediaId = docSnap.id;

        // Créer un élément pour afficher le média
        const mediaElement = document.createElement('div');
        mediaElement.classList.add('media-item');
        mediaElement.innerHTML = `
            <h3>mediaData.title</h3>
            <video src="{mediaData.videoURL}" controls></video>
            <button class="like-button" data-media-id="mediaId">{mediaData.likes ? mediaData.likes.length : 0} Likes</button>
            <div class="comment-section">
                <ul class="comment-list" data-media-id="${mediaId}"></ul>
 <form class="comment-form" data-media-id="{mediaId}">
                    <input type="text" class="comment-input" placeholder="Ajouter un commentaire" />
                    <button type="submit">Commenter</button>
                </form>
            </div>
            <button class="share-button" data-media-id="${mediaId}">Partager</button>
        `;

        document.getElementById('media-list').appendChild(mediaElement);
        loadComments(mediaId); // Charger les commentaires pour chaque vidéo
    });
}

// Charger les médias au démarrage
loadMedia();
