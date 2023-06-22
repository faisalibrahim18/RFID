import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Layout from "../../component/layouts/Layout";
import Laporan1 from "../../component/User_Laundry/laporan/Laporan";
import { checkTokenExpiration } from "../../utils/token";

const Laporan = () => {
  const navigate = useNavigate();
  useEffect(() => {
    checkTokenExpiration();
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
      <Laporan1 />
      {/* Close Main */}
    </Layout>
  );
};

export default Laporan;
