import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Layout from "../../../component/layouts/Layout";
import Laporan from "../../../component/super_admin/Laporan/Laporan";

const Laporan2 = () => {
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
      <Laporan />
      {/* Close Main */}
    </Layout>
  );
};
export default Laporan2;
