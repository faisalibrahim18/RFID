import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const BarComponent = ({ selectedHospital }) => {
  const [barData, setBarData] = useState(null);
  const [hospitalOptions, setHospitalOptions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_KEY;
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/api/v1/rfid/hospital`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data.data;
      // console.log(response.data.data);

      if (data && data.length > 0) {
        const labels = data.map((item) => item.name);
        const datasets = data.map((item) => ({
          label: item.name,
          data: [item.stock],
          backgroundColor: item.stock >= 0 ? 'rgba(75, 192, 192, 0.6)' : 'rgba(192, 75, 75, 0.6)',
          hoverBackgroundColor: item.stock >= 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(192, 75, 75, 1)',
        }));

        const barChartData = {
          labels: labels,
          datasets: datasets,
        };
        setBarData(barChartData);
        setHospitalOptions(data);
      } else {
        setBarData(null);
        setHospitalOptions([]);
        console.log('No Data Available');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredData = barData !== null && selectedHospital
    ? barData.datasets.filter((dataset) => dataset.label === selectedHospital)
    : barData && barData.datasets || [];

  const filteredBarData = {
    ...barData,
    datasets: filteredData,
  };

  return (
    <div>
      <div>
        {filteredBarData !== null ? (
          <Bar
            data={filteredBarData}
            options={{
              indexAxis: 'x',
              scales: {
                x: {
                  beginAtZero: true,
                  grid: {
                    drawBorder: false,
                    drawTicks: true,
                  },
                  ticks: {
                    display: false,
                  },
                },
                y: {
                  beginAtZero: true,
                  grid: {
                    drawBorder: false,
                    drawTicks: false,
                  },
                },
              },
            }}
          />
        ) : (
          <p>No Data Chart Available</p>
        )}
      </div>
    </div>
  );
};

export default BarComponent;





BarComponent.jsx