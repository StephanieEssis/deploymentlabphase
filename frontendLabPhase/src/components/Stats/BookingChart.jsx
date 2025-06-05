import React, { useEffect } from 'react';
import * as echarts from 'echarts';

const BookingChart = () => {
  useEffect(() => {
    const chartDom = document.getElementById('bookingChart');
    let myChart = null;

    if (chartDom) {
      // Détruire l'instance existante si elle existe
      const existingChart = echarts.getInstanceByDom(chartDom);
      if (existingChart) {
        existingChart.dispose();
      }

      myChart = echarts.init(chartDom);
      const option = {
        animation: false,
        title: {
          text: 'Réservations par Catégorie',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          bottom: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Réservations',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 16,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data: [
              { value: 48, name: 'Standard' },
              { value: 32, name: 'Deluxe' },
              { value: 15, name: 'Suite' },
              { value: 8, name: 'Familiale' },
              { value: 5, name: 'Présidentielle' }
            ]
          }
        ]
      };
      myChart.setOption(option);
    }

    // Nettoyage lors du démontage du composant
    return () => {
      if (myChart) {
        myChart.dispose();
      }
    };
  }, []);

  return <div id="bookingChart" style={{ width: '100%', height: '400px' }}></div>;
};

export default BookingChart; // Export par défaut ajouté