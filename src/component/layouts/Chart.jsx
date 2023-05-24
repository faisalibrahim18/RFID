import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const Chart = ({ data }) => {
  return (
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
      <BarChart data={data} barSize={40}>
        <XAxis dataKey="dateIn" scale="point" padding={{ left: 30, right: 10 }} />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid strokeDasharray="3 3" />
        <Bar dataKey="amount" fill="#A4BC92" background={{ fill: "#E5F5E5" }} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;
