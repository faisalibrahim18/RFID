import React, { useEffect } from "react";
import AddKategori from "../../component/kategori/AddKategori";
import Layout from "../../component/layouts/Layout";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormAddKategori = () => {
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
      <AddKategori />
      {/* Close Main */}
    </Layout>
  );
};

export default FormAddKategori;
