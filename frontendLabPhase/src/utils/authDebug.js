// Utilitaire pour déboguer l'authentification
export const authDebug = {
  // Vérifier l'état du localStorage
  checkLocalStorage() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    console.log('🔍 Debug localStorage:');
    console.log('Token:', token ? 'Présent' : 'Absent');
    console.log('User:', user ? JSON.parse(user) : 'Absent');
    
    return { token, user: user ? JSON.parse(user) : null };
  },

  // Vérifier si l'utilisateur a le bon rôle
  checkUserRole() {
    const { user } = this.checkLocalStorage();
    if (user) {
      console.log('👤 Rôle utilisateur:', user.role);
      console.log('✅ Est admin:', user.role === 'admin');
    }
    return user?.role === 'admin';
  },

  // Corriger le localStorage si nécessaire
  fixLocalStorage() {
    const { token, user } = this.checkLocalStorage();
    
    if (token && !user) {
      console.log('⚠️ Token présent mais utilisateur manquant');
      localStorage.removeItem('token');
      return false;
    }
    
    if (user && !token) {
      console.log('⚠️ Utilisateur présent mais token manquant');
      localStorage.removeItem('user');
      return false;
    }
    
    if (user && user.role !== 'admin') {
      console.log('⚠️ Utilisateur présent mais pas admin');
    }
    
    return true;
  },

  // Nettoyer le localStorage
  clearLocalStorage() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('🧹 localStorage nettoyé');
  }
};

// Fonction pour exécuter le debug
export const runAuthDebug = () => {
  console.log('🚀 Démarrage du debug d\'authentification...');
  authDebug.checkLocalStorage();
  authDebug.checkUserRole();
  authDebug.fixLocalStorage();
}; 