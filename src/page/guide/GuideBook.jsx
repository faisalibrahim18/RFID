import React, { useEffect } from "react";
import GuideBook1 from "../../component/guide/GuideBook";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { checkTokenExpiration } from "../../utils/token";
import Layout from "../../component/layouts/Layout";
const GuideBook = () => {
    const navigate = useNavigate();
    useEffect(() => {
      checkTokenExpiration();
      const token = localStorage.getItem("token");
      if (!token) {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
        Toast.fire({
          icon: "warning",
          text: "Anda harus Login Terlebih dahulu!",
        });
        navigate("/login");
      }
    });
    return (
      <Layout>
        {/* Main */}
        <GuideBook1/>
        {/* Close Main */}
      </Layout>
    );
  };
export default GuideBook