import React from 'react';
import { Link } from 'react-router-dom';
import * as echarts from 'echarts';

const AdminDashboard = () => {
  // Initialisation du graphique
  React.useEffect(() => {
    const chartDom = document.getElementById('adminBookingChart');
    if (chartDom) {
      const myChart = echarts.init(chartDom);
      const option = {
        title: {
          text: 'Statistiques des Réservations',
          left: 'center'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Réservations', 'Annulations', 'En attente'],
          bottom: 10
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Réservations',
            type: 'line',
            data: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330]
          },
          {
            name: 'Annulations',
            type: 'line',
            data: [20, 32, 21, 34, 10, 30, 20, 12, 11, 24, 30, 20]
          },
          {
            name: 'En attente',
            type: 'line',
            data: [10, 12, 11, 14, 20, 30, 25, 22, 21, 14, 20, 15]
          }
        ]
      };
      myChart.setOption(option);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tableau de Bord Administrateur</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-600 text-4xl mb-4">
            <i className="fas fa-door-open"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">120</h3>
          <p className="text-gray-600">Chambres totales</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-600 text-4xl mb-4">
            <i className="fas fa-calendar-check"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">1,240</h3>
          <p className="text-gray-600">Réservations ce mois</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="text-blue-600 text-4xl mb-4">
            <i className="fas fa-users"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">5,680</h3>
          <p className="text-gray-600">Utilisateurs inscrits</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div id="adminBookingChart" style={{ width: '100%', height: '400px' }}></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/rooms" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-blue-600 text-4xl mb-4">
            <i className="fas fa-bed"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Gérer les Chambres</h3>
          <p className="text-gray-600">Ajouter, modifier ou supprimer des chambres</p>
        </Link>
        <Link to="/admin/bookings" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-blue-600 text-4xl mb-4">
            <i className="fas fa-calendar-alt"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Gérer les Réservations</h3>
          <p className="text-gray-600">Voir et gérer toutes les réservations</p>
        </Link>
        <Link to="/admin/users" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="text-blue-600 text-4xl mb-4">
            <i className="fas fa-user-cog"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Gérer les Utilisateurs</h3>
          <p className="text-gray-600">Gérer les comptes utilisateurs</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;