// Wait for DOM load
document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  // Firebase references
  const gamesCollection = db.collection('games');
  const contactForm = document.getElementById('contact-form');
  const gamesContainer = document.querySelector('.games');
  const loginForm = document.getElementById('login-form');
  const loginSection = document.getElementById('login-section');
  const adminPanel = document.getElementById('admin-panel');
  const gameForm = document.getElementById('game-form');
  const gamesTableBody = document.getElementById('games-table-body');
  const logoutBtn = document.getElementById('logout-btn');

  // ----- INDEX.HTML LOGIC -----
  if (gamesContainer) {
    // Load games realtime
    gamesCollection.onSnapshot(snapshot => {
      gamesContainer.innerHTML = '';
      snapshot.forEach(doc => {
        const game = doc.data();
        const card = createGameCard(doc.id, game);
        gamesContainer.appendChild(card);
      });
    });

    // Buy button click (simple alert/contact)
    gamesContainer.addEventListener('click', e => {
      if (e.target.classList.contains('buy-btn')) {
        alert('Thanks for your interest! Please contact admin via email or Telegram.');
      }
    });

    // Contact form submit
    if (contactForm) {
      contactForm.addEventListener('submit', e => {
        e.preventDefault();
        alert('Thank you for contacting admin!');
        contactForm.reset();
      });
    }
  }

  // ----- ADMIN.HTML LOGIC -----
  if (loginForm) {
    loginForm.addEventListener('submit', async e => {
      e.preventDefault();
      const email = document.getElementById('admin-email').value;
      const password = document.getElementById('admin-password').value;
      try {
        await auth.signInWithEmailAndPassword(email, password);
        loginSection.style.display = 'none';
        adminPanel.style.display = 'block';
        loadGamesTable();
      } catch (error) {
        alert('Login failed: ' + error.message);
      }
    });

    logoutBtn.addEventListener('click', () => {
      auth.signOut();
      adminPanel.style.display = 'none';
      loginSection.style.display = 'block';
    });

    auth.onAuthStateChanged(user => {
      if (user) {
        loginSection.style.display = 'none';
        adminPanel.style.display = 'block';
        loadGamesTable();
      } else {
        loginSection.style.display = 'block';
        adminPanel.style.display = 'none';
      }
    });

    gameForm.addEventListener('submit', e => {
      e.preventDefault();
      const id = document.getElementById('game-id').value;
      const title = document.getElementById('game-title').value;
      const image = document.getElementById('game-image').value;
      const price = Number(document.getElementById('game-price').value);
      const description = document.getElementById('game-description').value;

      if (id) {
        // Update game
        gamesCollection.doc(id).update({ title, image, price, description });
      } else {
        // Add new game
        gamesCollection.add({ title, image, price, description });
      }
      gameForm.reset();
      document.getElementById('game-id').value = '';
    });

    function loadGamesTable() {
      gamesCollection.onSnapshot(snapshot => {
        gamesTableBody.innerHTML = '';
        snapshot.forEach(doc => {
          const game = doc.data();
          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${game.title}</td>
            <td>$${game.price.toFixed(2)}</td>
            <td>
              <button class="edit-btn" data-id="${doc.id}">Edit</button>
              <button class="delete-btn" data-id="${doc.id}">Delete</button>
            </td>
          `;
          gamesTableBody.appendChild(tr);
        });

        // Add event listeners for edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            gamesCollection.doc(id).get().then(doc => {
              if (doc.exists) {
                const game = doc.data();
                document.getElementById('game-id').value = id;
                document.getElementById('game-title').value = game.title;
                document.getElementById('game-image').value = game.image;
                document.getElementById('game-price').value = game.price;
                document.getElementById('game-description').value = game.description;
              }
            });
          });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            const id = btn.getAttribute('data-id');
            if (confirm('Are you sure you want to delete this game?')) {
              gamesCollection.doc(id).delete();
            }
          });
        });
      });
    }
  }
}

// Helper: Create a game card element for homepage
function createGameCard(id, game) {
  const card = document.createElement('div');
  card.className = 'game-card';
  card.innerHTML = `
    <img src="${game.image}" alt="${game.title}" />
    <div class="game-title">${game.title}</div>
    <div class="game-description">${game.description}</div>
    <div class="game-price">$${game.price.toFixed(2)}</div>
    <button class="buy-btn" data-id="${id}">Buy</button>
  `;
  return card;
}
