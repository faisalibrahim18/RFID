import React, { useEffect } from "react";
import EditInventory from "../../component/inventory/EditInventory";
import Layout from "../../component/layouts/Layout";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormEditInventory = () => {
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
      <EditInventory />
      {/* Close Main */}
    </Layout>
  );
};

export default FormEditInventory;
