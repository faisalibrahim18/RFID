import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/login/Login";
import Register from "./component/Register/Register";
import Landing from "./component/landingpage/Landing";
import Home from "./component/layouts/Home";
import UserList from "./page/User/UserList";
import FormUserAdd from "./page/User/FormUserAdd";
import FormEditUser from "./page/User/FormEditUser";
import RsList from "./page/rumahsakit/RsList";
import FormAddRs from "./page/rumahsakit/FormAddRs";
import FormEditRs from "./page/rumahsakit/FormEditRs";
import LinenList from "./page/linen/LinenList";
import FormAddLinen from "./page/linen/FormAddLinen";
import FormEditLinen from "./page/linen/FormEditLinen";
import DistribusiList from "./page/distribusi/DistribusiList";
import FormAddDistribusi from "./page/distribusi/FormAddDistribusi";
import FormEditDistribusi from "./page/distribusi/FormEditDistribusi";
import KategoriList from "./page/kategori/KategoriList";
import FormEditKategori from "./page/kategori/FormEditKategori";
import FormAddKategori from "./page/kategori/FormAddKategori";
import InventoryList from "./page/Inventory/InventoryList";
import FormAddInventory from "./page/Inventory/FormAddInventory";
import FormEditInventory from "./page/Inventory/FormEditInventory";
import LaporanList from "./page/laporan/LaporanList";
import Trackingview from "./page/tracking/Trackingview";
import Dashboard from "./page/user_laundry/Dashboard";
import Laporan from "./page/user_laundry/Laporan";
import Permintaan from "./page/user_laundry/Permintaan";
import EditLaporan from "./page/user_laundry/EditLaporan";
import Permintaan1 from "./page/user_pabrik/Permintaan1";
import Laporan1 from "./page/user_pabrik/Laporan1";
import Permintaan2 from "./page/delivery/Permintaan2";
import Laporan2 from "./page/Super_admin/Laporan/Laporan2";
import Peminjaman1 from "./page/Super_admin/Peminjaman/Peminjaman1";
import User1 from "./page/Super_admin/User/User1";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<Home />} />
          <Route exact path="/users" element={<UserList />} />
          <Route exact path="/users/add" element={<FormUserAdd />} />
          <Route exact path="/users/edit/:id" element={<FormEditUser />} />
          <Route exact path="/rumah_sakit" element={<RsList />} />
          <Route exact path="/rumah_sakit/add" element={<FormAddRs />} />
          <Route exact path="/rumah_sakit/edit/:id" element={<FormEditRs />} />
          <Route exact path="/linen" element={<LinenList />} />
          <Route exact path="/linen/add" element={<FormAddLinen />} />
          <Route exact path="/linen/edit/:id" element={<FormEditLinen />} />
          <Route exact path="/distribusi" element={<DistribusiList />} />
          <Route exact path="/distribusi/add" element={<FormAddDistribusi />} />
          <Route exact path="/distribusi/edit/:id" element={<FormEditDistribusi />} />
          <Route exact path="/kategori" element={<KategoriList />} />
          <Route exact path="/kategori/add" element={<FormAddKategori />} />
          <Route exact path="/kategori/edit/:id" element={<FormEditKategori />} />
          <Route exact path="/inventory" element={<InventoryList />} />
          <Route exact path="/inventory/add" element={<FormAddInventory />} />
          <Route exact path="/inventory/edit/:id" element={<FormEditInventory />} />
          <Route exact path="/laporan" element={<LaporanList />} />
          <Route exact path="/tracking" element={<Trackingview />} />

          {/* user_Laundry route */}
          <Route exact path="/dashboardLaundry" element={<Dashboard />} />
          <Route exact path="/laporanL" element={<Laporan />} />
          <Route exact path="/laporanL/edit/:id" element={<EditLaporan />} />
          <Route exact path="/permintaan" element={<Permintaan />} />

          {/* user_pabrik route */}
          <Route exact path="/permintaanP" element={<Permintaan1 />} />
          <Route exact path="/laporanP" element={<Laporan1 />} />

          {/* delivery */}
          <Route exact path="/permintaanD" element={<Permintaan2 />} />

          {/* Super admin */}
          <Route exact path="/laporanS" element={<Laporan2 />} />
          <Route exact path="/peminjaman" element={<Peminjaman1 />} />
          <Route exact path="/userS" element={<User1 />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
