import React, { useEffect } from "react";
import Layout from "../../component/layouts/Layout";
import Invoice1 from "../../component/invoice/Invoice";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { checkTokenExpiration } from "../../utils/token";

const Invoice = () => {
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
        <Invoice1/>
        {/* Close Main */}
      </Layout>
    );
  };
export default Invoice