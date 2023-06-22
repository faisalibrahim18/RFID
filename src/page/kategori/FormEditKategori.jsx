import React, { useEffect } from "react";
import EditKategori from "../../component/kategori/EditKategori";
import Layout from "../../component/layouts/Layout";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { checkTokenExpiration } from "../../utils/token";

const FormEditKategori = () => {
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
      <EditKategori />
      {/* Close Main */}
    </Layout>
  );
};

export default FormEditKategori;
