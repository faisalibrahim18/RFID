import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/login/Login";
import Landing from "./component/landingpage/Landing";
import Home from "./component/layouts/Home";
import UserList from "./page/User/UserList";
import FormUserAdd from "./page/User/FormUserAdd";
import FormEditUser from "./page/User/FormEditUser";
import RsList from "./page/rumahsakit/RsList";
import LinenList from "./page/linen/LinenList";
import DistribusiList from "./page/distribusi/DistribusiList";
import FormEditDistribusi from "./page/distribusi/FormEditDistribusi";
import KategoriList from "./page/kategori/KategoriList";
import InventoryList from "./page/Inventory/InventoryList";
import LaporanList from "./page/laporan/LaporanList";
import Trackingview from "./page/tracking/Trackingview";
import RolePage from "./page/Role/RolePage";
import Invoice from "./page/invoice/Invoice";
import Audit from "./page/audit/Audit";
import Profile from "./page/profile/Profile";
import GuideBook from "./page/guide/GuideBook";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

function App() {
  const [users, setUser] = useState([]);
  const [privilege, setPrivilege] = useState({
    Dashboard: true,
    User: true,
    Log: true,
    Role: true,
    Hospital: true,
    Linen: true,
    Distribusi: true,
    Category: true,
    Inventory: true,
    Report: true,
    Invoice: true,
    Tracking: true,
  });
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_KEY;
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${API_URL}/api/v1/rfid/getUserSignedIn`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const rolePrivileges = response.data.data.role.rolePrivileges;

      // console.log("rolePrivileges:", rolePrivileges);

      const allowValues = rolePrivileges.map((privilege) => privilege.allow);

      // console.log("allowValues:", allowValues);

      // Memperbarui state privilege dengan hasil allowValues
      setPrivilege((prevPrivilege) => ({
        ...prevPrivilege,
        Dashboard: allowValues[0],
        User: allowValues[1],
        Log: allowValues[2],
        Role: allowValues[3],
        Hospital: allowValues[4],
        Linen: allowValues[5],
        Distribusi: allowValues[6],
        Category: allowValues[7],
        Inventory: allowValues[8],
        Report: allowValues[9],
        Invoice: allowValues[10],
        Tracking: allowValues[11],
      }));

      // Mengecek izin akses dan mengambil tindakan yang sesuai
      if (
        allowValues.every((allow, index) => {
          const privilegeName = Object.keys(privilege)[index];
          if (allow) {
            // console.log(`Pengguna diizinkan untuk ${privilegeName}`);
            // Tindakan yang diambil jika izin adalah true
            return true;
          } else {
            // console.log(`Pengguna tidak diizinkan untuk ${privilegeName}`);
            // Tindakan yang diambil jika izin adalah false
            return false;
          }
        })
      ) {
        // console.log("Semua izin diizinkan");
        // Tindakan yang diambil jika semua izin bernilai true
      } else {
        // console.log("Tidak semua izin diizinkan");
        // Tindakan yang diambil jika ada izin yang bernilai false
      }

      // console.log("response data:", response.data.data);
      setUser([response.data.data]);
    } catch (error) {
      console.log("Error:", error.response); // Memperbaiki penanganan kesalahan
    }
  };

  const RedirectWithSwal = () => {
    // Display a swal alert to inform the user they don't have access
    Swal.fire(
      "Akses Ditolak",
      "Anda tidak memiliki akses ke halaman ini.",
      "error"
    ).then(() => {
      // Redirect to the dashboard after the user dismisses the swal alert
      window.location.href = "/dashboard";
    });

    // Return null since we're redirecting using swal, and there's nothing else to render
    return null;
  };
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Home />} />
          {privilege.User ? (
            <Route exact path="/users" element={<UserList />} />
          ) : (
            <Route exact path="/users" element={<RedirectWithSwal />} />
          )}
          {privilege.Role ? (
            <Route exact path="/role" element={<RolePage />} />
          ) : (
            <Route exact path="/role" element={<RedirectWithSwal />} />
          )}
          {privilege.User ? (
            <Route exact path="/users/add" element={<FormUserAdd />} />
          ) : (
            <Route exact path="/users/add" element={<RedirectWithSwal />} />
          )}
          {privilege.User ? (
            <Route exact path="/users/edit/:id" element={<FormEditUser />} />
          ) : (
            <Route
              exact
              path="/users/edit/:id"
              element={<RedirectWithSwal />}
            />
          )}
          {privilege.Hospital ? (
            <Route exact path="/rumah_sakit" element={<RsList />} />
          ) : (
            <Route exact path="/rumah_sakit" element={<RedirectWithSwal />} />
          )}
          {privilege.Linen ? (
            <Route exact path="/linen" element={<LinenList />} />
          ) : (
            <Route exact path="/linen" element={<RedirectWithSwal />} />
          )}

          {privilege.Distribusi ? (
            <Route exact path="/distribusi" element={<DistribusiList />} />
          ) : (
            <Route exact path="/distribusi" element={<RedirectWithSwal />} />
          )}

 
          {privilege.Distribusi ? (
            <Route
              exact
              path="/distribusi/edit/:id"
              element={<FormEditDistribusi />}
            />
          ) : (
            <Route
              exact
              path="/distribusi/edit/:id"
              element={<RedirectWithSwal />}
            />
          )}
          {privilege.Category ? (
            <Route exact path="/kategori" element={<KategoriList />} />
          ) : (
            <Route exact path="/kategori" element={<RedirectWithSwal />} />
          )}


          {privilege.Inventory ? (
            <Route exact path="/inventory" element={<InventoryList />} />
          ) : (
            <Route exact path="/inventory" element={<RedirectWithSwal />} />
          )}
    
          {privilege.Report ? (
            <Route exact path="/laporan" element={<LaporanList />} />
          ) : (
            <Route exact path="/laporan" element={<RedirectWithSwal />} />
          )}
          {privilege.Tracking ? (
            <Route exact path="/tracking" element={<Trackingview />} />
          ) : (
            <Route exact path="/tracking" element={<RedirectWithSwal />} />
          )}
          {privilege.Invoice ? (
            <Route exact path="/invoice" element={<Invoice />} />
          ) : (
            <Route exact path="/invoice" element={<RedirectWithSwal />} />
          )}
          {privilege.Log ? (
            <Route exact path="/audit" element={<Audit />} />
          ) : (
            <Route exact path="/audit" element={<RedirectWithSwal />} />
          )}

          <Route exact path="/profile/:id" element={<Profile />} />
          <Route exact path="/guide_book" element={<GuideBook />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
