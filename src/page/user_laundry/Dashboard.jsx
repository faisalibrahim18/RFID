import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Layout from "../../component/layouts/Layout";
import Dashboard1 from "../../component/User_Laundry/dashboard/Dashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "warning",
        text: "Anda harus Login Terlebih dahulu!",
      });
      navigate("/login");
    }
  });
  return (
    <>
      <Layout>
        {/* Main */}
        <Dashboard1 />
        {/* Close Main */}
      </Layout>
    </>
  );
};

export default Dashboard;
