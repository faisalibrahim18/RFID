import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Layout from "../../component/layouts/Layout";
import Permintaan1 from "../../component/User_Laundry/permintaan/Permintaan";
import { checkTokenExpiration } from "../../utils/token";

const Permintaan = () => {
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
      <Permintaan1 />
      {/* Close Main */}
    </Layout>
  );
};

export default Permintaan;
