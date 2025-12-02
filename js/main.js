/**
 * Description: Gestion des interactions utilisateur
 */

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  console.log('🐾 Provence Animaux - Site chargé avec succès')

  initFilters()
  initSearchBar()
  initSmoothScroll()
  initProductCards()
  initCarousels()
})

// ==========================================
// CAROUSEL NAVIGATION (NEW)
// ==========================================

/**
 * Initialise la navigation des carousels avec les flèches
 */
function initCarousels() {
  const carousels = document.querySelectorAll('.carousel-wrapper')

  carousels.forEach((wrapper) => {
    const container = wrapper.querySelector('.carousel-container')
    const prevBtn = wrapper.querySelector('.prev-btn')
    const nextBtn = wrapper.querySelector('.next-btn')

    if (!container || !prevBtn || !nextBtn) return

    // Largeur de défilement (Largeur carte + gap)
    const scrollAmount = 300

    prevBtn.addEventListener('click', () => {
      container.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth',
      })
    })

    nextBtn.addEventListener('click', () => {
      container.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      })
    })
  })
}

// ==========================================
// FILTER FUNCTIONALITY
// ==========================================

/**
 * Initialise le système de filtres de produits
 */
function initFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn')
  const productCards = document.querySelectorAll('.product-card[data-category]')

  if (filterButtons.length === 0) {
    console.warn('Aucun bouton de filtre trouvé')
    return
  }

  filterButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const filter = this.getAttribute('data-filter')

      // Mise à jour de l'état actif des boutons
      filterButtons.forEach((btn) => btn.classList.remove('active'))
      this.classList.add('active')

      // Filtrage des produits
      filterProducts(filter, productCards)

      console.log(`Filtre appliqué : ${filter}`)
    })
  })
}

/**
 * Filtre les produits selon la catégorie sélectionnée
 * @param {string} filter - Catégorie à filtrer
 * @param {NodeList} products - Liste des produits
 */
function filterProducts(filter, products) {
  products.forEach((card) => {
    const categories = card.getAttribute('data-category')

    // Si "tous" ou si la catégorie correspond
    if (filter === 'tous' || (categories && categories.includes(filter))) {
      card.style.display = 'block'
      card.classList.add('fade-in')
    } else {
      card.style.display = 'none'
    }
  })
}

// ==========================================
// SEARCH BAR FUNCTIONALITY
// ==========================================

/**
 * Initialise la barre de recherche
 */
function initSearchBar() {
  const searchInput = document.getElementById('searchInput')
  const searchButton = document.querySelector('.search-bar button')

  if (!searchInput || !searchButton) return

  // Recherche au clic sur le bouton
  searchButton.addEventListener('click', (e) => {
    e.preventDefault()
    performSearch(searchInput.value)
  })

  // Recherche à la touche Entrée
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      performSearch(searchInput.value)
    }
  })
}

/**
 * Effectue une recherche
 * @param {string} query - Terme de recherche
 */
function performSearch(query) {
  if (!query.trim()) {
    // Animation shake si vide
    const input = document.getElementById('searchInput')
    input.style.border = '2px solid red'
    setTimeout(() => (input.style.border = 'none'), 500)
    return
  }

  console.log(`🔍 Recherche : "${query}"`)
  showNotification(`Recherche en cours : "${query}"...`)
}

// ==========================================
// SMOOTH SCROLL
// ==========================================

/**
 * Active le défilement fluide pour les ancres
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]')

  links.forEach((link) => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href')

      // Ignore les liens vides
      if (targetId === '#' || !targetId) return

      const targetElement = document.querySelector(targetId)

      if (targetElement) {
        e.preventDefault()

        // Calcul de l'offset pour le header fixe
        const headerHeight = document.querySelector('header').offsetHeight
        const targetPosition = targetElement.offsetTop - headerHeight - 20

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        })
      }
    })
  })
}

// ==========================================
// PRODUCT CARDS INTERACTIONS
// ==========================================

/**
 * Gère les interactions avec les cartes produits
 */
function initProductCards() {
  const addButtons = document.querySelectorAll('.product-card .btn')

  addButtons.forEach((button) => {
    button.addEventListener('click', function () {
      const card = this.closest('.product-card')
      const productTitle =
        card.querySelector('.prod-title')?.textContent || 'Produit'
      const productPrice =
        card.querySelector('.prod-price')?.textContent || 'N/A'

      addToCart(productTitle, productPrice)
    })
  })
}

/**
 * Ajoute un produit au panier (simulation)
 * @param {string} title - Nom du produit
 * @param {string} price - Prix du produit
 */
function addToCart(title, price) {
  console.log(`✅ Produit ajouté : ${title} - ${price}`)

  // Animation de feedback
  showNotification(`"${title}" ajouté au panier !`)
}

// ==========================================
// NOTIFICATIONS
// ==========================================

/**
 * Affiche une notification temporaire
 * @param {string} message - Message à afficher
 */
function showNotification(message) {
  // Supprimer les notifs existantes pour éviter l'empilement
  const existingNotif = document.querySelector('.notification-toast')
  if (existingNotif) existingNotif.remove()

  // Création de l'élément de notification
  const notification = document.createElement('div')
  notification.className = 'notification-toast'
  notification.textContent = message
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease-out;
        display: flex;
        align-items: center;
    `

  // Ajout d'une icône
  const icon = document.createElement('i')
  icon.className = 'fas fa-check-circle'
  icon.style.marginRight = '10px'
  notification.prepend(icon)

  document.body.appendChild(notification)

  // Suppression après 3 secondes
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease-out'
    setTimeout(() => notification.remove(), 300)
  }, 3000)
}

// Ajout des animations CSS dynamiquement si pas déjà présentes
if (!document.getElementById('js-animations')) {
  const style = document.createElement('style')
  style.id = 'js-animations'
  style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(400px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(400px); opacity: 0; }
        }
    `
  document.head.appendChild(style)
}

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Debounce function pour optimiser les événements fréquents
 */
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}
