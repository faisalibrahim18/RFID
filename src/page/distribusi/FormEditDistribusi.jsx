import React, { useEffect } from "react";
import EditDistribusi from "../../component/distribusi/EditDistribusi";
import Layout from "../../component/layouts/Layout";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormEditDistribusi = () => {
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
    <Layout>
      {/* Main */}
      <EditDistribusi />
      {/* Close Main */}
    </Layout>
  );
};

export default FormEditDistribusi;
