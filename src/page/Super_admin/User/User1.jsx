import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Layout from "../../../component/layouts/Layout";
import User from "../../../component/super_admin/User/User";
import { checkTokenExpiration } from "../../../utils/token";

const User1 = () => {
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
      <User />
      {/* Close Main */}
    </Layout>
  );
};

export default User1;
