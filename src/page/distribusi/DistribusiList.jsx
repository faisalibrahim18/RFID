import React, { useEffect } from "react";
import Distribusi from "../../component/distribusi/Distribusi";
import Layout from "../../component/layouts/Layout";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const DistribusiList = () => {
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
    <div className="scroll-smooth hover:scroll-auto">
      <Layout>
        {/* Main */}
        <Distribusi />
        {/* Close Main */}
      </Layout>
    </div>
  );
};

export default DistribusiList;