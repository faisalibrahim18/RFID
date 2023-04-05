import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./component/login/Login";
import Register from "./component/Register/Register";
import Landing from "./component/landingpage/Landing";
import Home from "./component/layouts/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
