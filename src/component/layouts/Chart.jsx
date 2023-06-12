import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Chart = ({ chartData }) => {
  console.log(chartData);
  return (
    <div className="overflow-x-auto overflow-scroll">
      <ResponsiveContainer width={680} height={350}>
        {/* <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="customer.name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart> */}
        <BarChart data={chartData} barSize={40}>
          <XAxis dataKey="" scale="point" padding={{ left: 50, right: 20 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="amount" fill="#A4BC92" background={{ fill: "#E5F5E5" }} />
          {/* <Bar dataKey="dateIn" fill="#A4BC92" background={{ fill: "#E5F5E5" }} /> */}
          <Bar dataKey="customer.name" fill="#A4BC92" background={{ fill: "#E5F5E5" }} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
