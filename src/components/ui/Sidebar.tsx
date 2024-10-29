import { useAuth } from "../../context/AuthContext";
import NavItem from "./NavItem";
import sidebarImage from "../../assets/images/sidebar-background.svg";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navItems = [
    {
      name: "Inicio",
      href: "/",
    },
    {
      name: "Transferir",
      href: "/transferir",
    },
    {
      name: "Recargar",
      href: "/recargar",
    },
    {
      name: "Intercambiar",
      href: "/intercambiar",
    },
    {
      name: "Perfil",
      href: "/perfil",
    },
    {
      name: "Ayuda",
      href: "/ayuda",
    },
  ];

  const { clearAuthData } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    clearAuthData();
    navigate("/");
  };

  return (
    <nav className="sidebar">
      <ul>
        {navItems.map((item) => (
          <NavItem key={item.name} href={item.href}>
            {item.name}
          </NavItem>
        ))}
      </ul>
      <button className="subtitle2" onClick={logout}>
        Cerrar sesión
      </button>
      <div className="sidebar__image">
        <img src={sidebarImage} alt="Imagen sidebar" />
      </div>
    </nav>
  );
}
