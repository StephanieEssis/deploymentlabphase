# Optimisations de Performance - Page d'Accueil

## Problèmes identifiés et solutions

### 1. **Appels API multiples et séquentiels**
**Problème :** La page d'accueil faisait plusieurs appels API en parallèle sans optimisation.

**Solutions :**
- Optimisation des appels API conditionnels
- Mise en cache des données avec le hook `useApiCache`
- Gestion des erreurs avec fallback

### 2. **Pas d'initialisation de l'utilisateur au démarrage**
**Problème :** Le contexte d'authentification ne vérifiait pas automatiquement l'état de connexion.

**Solution :**
- Ajout d'une initialisation automatique dans `AuthContext`
- Vérification du token au démarrage de l'application

### 3. **Images non optimisées**
**Problème :** Images chargées sans lazy loading et sans gestion d'erreur.

**Solutions :**
- Composant `OptimizedImage` avec lazy loading
- Gestion des erreurs d'image avec fallback
- Optimisation de l'image de fond du hero section

### 4. **Pas de skeleton loading**
**Problème :** Expérience utilisateur médiocre pendant le chargement.

**Solution :**
- Composant `SkeletonLoader` pour les différents types de contenu
- Affichage de placeholders pendant le chargement

### 5. **Configuration Vite non optimisée**
**Problème :** Build non optimisé pour la production.

**Solutions :**
- Désactivation des sourcemaps en production
- Configuration des chunks manuels
- Optimisation des dépendances

## Composants créés

### `LoadingSpinner`
- Composant de loading réutilisable
- Différentes tailles disponibles
- Message personnalisable

### `OptimizedImage`
- Lazy loading automatique
- Gestion des erreurs avec fallback
- Animation de chargement
- Transition fluide

### `SkeletonLoader`
- Placeholders animés
- Différents types (room, feature, default)
- Améliore l'expérience utilisateur

### `useApiCache` (Hook)
- Mise en cache des appels API
- Durée de cache configurable (5 minutes)
- Annulation des requêtes en cours
- Gestion des erreurs

## Optimisations techniques

### 1. **Gestion de l'authentification**
```javascript
// AuthContext.jsx
useEffect(() => {
  const initializeAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const userData = await authService.getCurrentUser();
      setUser(userData);
    }
  };
  initializeAuth();
}, []);
```

### 2. **Appels API optimisés**
```javascript
// Home.jsx
const fetchData = async () => {
  // Appel principal pour les chambres
  const roomsResponse = await roomService.getRooms();
  
  // Appels conditionnels en parallèle
  const additionalDataPromises = [];
  if (user) {
    additionalDataPromises.push(bookingService.getUserBookings());
  }
  if (user?.role === 'admin') {
    additionalDataPromises.push(bookingService.getStats());
  }
};
```

### 3. **Configuration Vite optimisée**
```javascript
// vite.config.js
build: {
  sourcemap: false,
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        router: ['react-router-dom'],
        icons: ['@fortawesome/react-fontawesome'],
        utils: ['axios']
      }
    }
  }
}
```

## Résultats attendus

1. **Temps de chargement réduit** : Les appels API sont optimisés et mis en cache
2. **Meilleure UX** : Skeleton loaders et transitions fluides
3. **Images optimisées** : Lazy loading et gestion d'erreur
4. **Build plus rapide** : Configuration Vite optimisée
5. **Moins de requêtes** : Cache et appels conditionnels

## Utilisation

### Pour ajouter le lazy loading à une image :
```javascript
import OptimizedImage from '../components/OptimizedImage';

<OptimizedImage
  src={imageUrl}
  alt="Description"
  className="w-full h-48 object-cover"
/>
```

### Pour utiliser le skeleton loader :
```javascript
import SkeletonLoader from '../components/SkeletonLoader';

{loading ? (
  <SkeletonLoader type="room" />
) : (
  // Contenu réel
)}
```

### Pour utiliser le hook de cache :
```javascript
import { useApiCache } from '../hooks/useApiCache';

const { data, loading, error } = useApiCache(
  'rooms',
  () => roomService.getRooms(),
  [user]
);
``` 