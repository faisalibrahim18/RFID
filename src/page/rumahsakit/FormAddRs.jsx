import React, { useEffect } from "react";
import AddRs from "../../component/rumahsakit/AddRs";
import Layout from "../../component/layouts/Layout";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FormAddRs = () => {
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
      <AddRs />
      {/* Close Main */}
    </Layout>
  );
};

export default FormAddRs;
