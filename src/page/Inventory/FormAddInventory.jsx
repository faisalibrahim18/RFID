import React, { useEffect } from "react";
import AddInventory from "../../component/inventory/AddInventory";
import Layout from "../../component/layouts/Layout";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormAddInventory = () => {
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
      <AddInventory />
      {/* Close Main */}
    </Layout>
  );
};

export default FormAddInventory;
