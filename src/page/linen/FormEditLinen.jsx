import React, { useEffect } from "react";
import EditLinen from "../../component/linen/EditLinen";
import Layout from "../../component/layouts/Layout";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormEditLinen = () => {
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
      <EditLinen />
      {/* Close Main */}
    </Layout>
  );
};

export default FormEditLinen;
