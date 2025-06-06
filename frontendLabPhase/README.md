# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.






# Projet de Réservation d'Hôtel

Ce projet est une application web complète de réservation d'hôtel, composée d'un backend Node.js et d'un frontend React.

## Structure du Projet

Le projet est divisé en deux parties principales :

### Backend (`hotel-booking-backend/`)
- API RESTful construite avec Node.js et Express.js
- Structure MVC (Models, Views, Controllers)
- Base de données MongoDB avec Mongoose
- Gestion des uploads de fichiers
- Système d'authentification avec JWT et bcryptjs
- Middlewares de sécurité (CORS, etc.)

### Frontend (`frontendLabPhase/`)
- Application React moderne (v19.1.0)
- Construite avec Vite (v6.3.5)
- Styling avec Tailwind CSS (v3.4.17)
- Interface utilisateur responsive avec FontAwesome
- Visualisation de données avec ECharts
- Gestion des routes avec React Router DOM (v7.6.1)

## Prérequis

- Node.js (version recommandée : 18.x ou supérieure)
- MongoDB
- npm ou yarn

## Installation

### Backend

```bash
cd hotel-booking-backend
npm install
```

Les dépendances principales du backend incluent :
- express (v5.1.0)
- mongoose (v8.15.1)
- bcryptjs (v3.0.2)
- jsonwebtoken (v9.0.2)
- cors (v2.8.5)
- dotenv (v16.5.0)

### Frontend

```bash
cd frontendLabPhase
npm install
```

Les dépendances principales du frontend incluent :
- react (v19.1.0)
- react-dom (v19.1.0)
- react-router-dom (v7.6.1)
- axios (v1.9.0)
- echarts (v5.6.0)
- @fortawesome/react-fontawesome (v0.2.2)

## Configuration

1. Créez un fichier `.env` dans le dossier `hotel-booking-backend` avec les variables suivantes :
```
PORT=5000
MONGODB_URI=votre_uri_mongodb
JWT_SECRET=votre_secret_jwt
```

## Démarrage

### Backend

```bash
cd hotel-booking-backend
# Pour le développement (avec hot-reload)
npm run dev

# Pour la production
npm start
```

### Frontend

```bash
cd frontendLabPhase
# Pour le développement
npm run dev

# Pour la production
npm run build
npm run preview
```

## Fonctionnalités

### Backend
- API RESTful complète
- Authentification sécurisée avec JWT
- Gestion des utilisateurs
- Gestion des réservations
- Upload et gestion des fichiers
- Validation des données
- Middlewares de sécurité

### Frontend
- Interface utilisateur moderne et responsive
- Navigation fluide avec React Router
- Visualisation de données avec ECharts
- Intégration d'icônes avec FontAwesome
- Gestion des formulaires
- Appels API avec Axios
- Design system avec Tailwind CSS

## Scripts Disponibles

### Backend
- `npm run dev` : Démarre le serveur en mode développement avec hot-reload
- `npm start` : Démarre le serveur en mode production
- `npm test` : Lance les tests (à configurer)

### Frontend
- `npm run dev` : Démarre le serveur de développement
- `npm run build` : Crée une version de production
- `npm run preview` : Prévisualise la version de production
- `npm run lint` : Lance le linter ESLint

## Contribution

1. Fork le projet
2. Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails. 