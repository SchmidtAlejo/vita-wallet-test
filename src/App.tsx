import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./main.css";
import { useAuth } from "./context/AuthContext";
import LoginComponent from "./components/login/LoginComponent";
import Sidebar from "./components/ui/Sidebar";
import Exchange from "./components/exchange/Exchange";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const { uid } = useAuth();

  return (
    <BrowserRouter>
      {uid === null ? (
        <Routes>
          <Route path="/*" element={<LoginComponent />} />
        </Routes>
      ) : (
        <div style={{ display: "flex" }}>
          <Sidebar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/intercambiar" element={<Exchange />} />
          </Routes>
        </div>
      )}
    </BrowserRouter>
  );
}

export default App;
