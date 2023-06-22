import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Layout from "../../component/layouts/Layout";
import EditLaporan1 from "../../component/User_Laundry/laporan/EditLaporan";
import { checkTokenExpiration } from "../../utils/token";

const EditLaporan = () => {
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
    <>
      <Layout>
        {/* Main */}
        <EditLaporan1 />
        {/* Close Main */}
      </Layout>
    </>
  );
};

export default EditLaporan;
