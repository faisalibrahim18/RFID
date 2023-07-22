import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import "chart.js/auto";

const DoughnutComponent = ({ selectedHospital }) => {
  const [chartData, setChartData] = useState(null);

  const flattenStatus = (status) => {
    if (typeof status === "object" && status !== null) {
      return Object.values(status).flatMap(flattenStatus);
    }
    return [status];
  };

  const fetchChartData = async (hospitalId) => {
    try {
      const token = localStorage.getItem("token");
      let url = "http://localhost:9000/api/v1/rfid/distribusi";

      if (hospitalId !== "all") {
        url += `/${hospitalId}`;
      }

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      let allStatuses = [];
      if (Array.isArray(response.data.data)) {
        // For the case of multiple hospitals, response.data.data is an array
        allStatuses = response.data.data.map((item) => item.status.status);
        // console.log("datal", allStatuses);
      } else {
        // For the case of a single hospital, response.data.data is an object
        allStatuses.push(response.data.data.status.status);
        console.log("dataaa", allStatuses);
      }

      //   console.log("Fetched Data:", allStatuses);

      const statusCount = {};
      const allNestedStatuses = allStatuses.flatMap(flattenStatus);

      allNestedStatuses.forEach((status) => {
        if (typeof status === "string" && status !== "status") {
          if (status in statusCount) {
            statusCount[status] += 1;
          } else {
            statusCount[status] = 1;
          }
        }
      });

      const labels = Object.keys(statusCount);
      const counts = labels.map((status) => statusCount[status] || 0);

      const colors = Array.from(
        { length: labels.length },
        () =>
          `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, 0.6)`
      );

      const newChartData = {
        labels: labels,
        datasets: [
          {
            data: counts,
            backgroundColor: colors,
            hoverBackgroundColor: colors,
          },
        ],
      };
      console.log("New Chart Data:", newChartData);
      setChartData(newChartData);
    } catch (error) {
      console.error("Error:", error);
      setChartData(null);
    }
  };

  useEffect(() => {
    fetchChartData(selectedHospital);
  }, [selectedHospital]);

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            if (label) {
              const value = context.raw || 0;
              return `${label}: ${value}`;
            }
            return null;
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div>
      {chartData !== null ? (
        <Doughnut data={chartData} options={chartOptions} />
      ) : (
        <p>No Data Chart Available</p>
      )}
    </div>
  );
};

export default DoughnutComponent;
