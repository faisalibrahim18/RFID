import React, { useEffect } from "react";
import Dashboard from "./Dashboard";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Home = () => {
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
        <Dashboard />
        {/* Close Main */}
      </Layout>
    </>
  );
};

export default Home;
