import React, { useEffect } from "react";
import EditRs from "../../component/rumahsakit/EditRs";
import Layout from "../../component/layouts/Layout";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormEditRs = () => {
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
      <EditRs />
      {/* Close Main */}
    </Layout>
  );
};

export default FormEditRs;