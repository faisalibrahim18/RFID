import React, { useEffect } from "react";
import AddDistribusi from "../../component/distribusi/AddDistribusi";
import Layout from "../../component/layouts/Layout";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { checkTokenExpiration } from "../../utils/token";

const FormAddDistribusi = () => {
  const navigate = useNavigate();
  useEffect(() => {
    checkTokenExpiration();
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire({
        icon: "Warning",
        text: "Anda harus Login Terlebih dahulu!",
      });
      navigate("/login");
    }
  });
  return (
    <Layout>
      {/* Main */}
      <AddDistribusi />
      {/* Close Main */}
    </Layout>
  );
};

export default FormAddDistribusi;
