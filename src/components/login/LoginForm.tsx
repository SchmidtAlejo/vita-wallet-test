import { useState } from "react";
import {
  HidePasswordIcon,
  ShowPasswordIcon,
  SuccessIcon,
} from "../../assets/icons";
import { validateEmail } from "../../utils/utils";
import { loginRequest } from "./login.interface";
import { login } from "./login.service";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
  const [userForm, setUserForm] = useState<loginRequest>({
    email: "prospecto@vitawallet.io",
    password: "Vita.1212",
  });
  const [passwordVisibility, setPasswordVisibility] = useState(false);

  const { setAuthData } = useAuth();

  const validateUserForm = () => {
    return userForm.email === "" || userForm.password === "";
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({
      ...userForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateUserForm()) return;

    const response = await login(userForm);

    if (response === null) return;

    setAuthData(response);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label className="caption" htmlFor="email">
          Correo electrónico
        </label>
        <div style={{ position: "relative" }}>
          <input
            type="email"
            name="email"
            placeholder="juan@gmail.com"
            onChange={handleChange}
            value={userForm.email}
          />
          <div
            style={{
              position: "absolute",
              right: "16px",
              top: "50%",
              translate: "0 -50%",
              height: "24px",
              display: `${validateEmail(userForm.email) ? "block" : "none"}`,
            }}
          >
            <SuccessIcon />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
        <label className="caption" htmlFor="email">
          Contraseña
        </label>
        <div style={{ position: "relative" }}>
          <input
            type={passwordVisibility ? "text" : "password"}
            name="password"
            placeholder="Escribe tu contraseña"
            onChange={handleChange}
            value={userForm.password}
          />
          <div
            style={{
              position: "absolute",
              cursor: "pointer",
              right: "16px",
              top: "50%",
              translate: "0 -50%",
              height: "24px",
              userSelect: "none",
            }}
          >
            {passwordVisibility ? (
              <div onClick={() => setPasswordVisibility(false)}>
                <ShowPasswordIcon />
              </div>
            ) : (
              <div onClick={() => setPasswordVisibility(true)}>
                <HidePasswordIcon />
              </div>
            )}
          </div>
        </div>
        <a href="#" className="caption2">
          ¿Olvidaste tu contraseña?
        </a>
        <button
          className={`${
            validateUserForm() ? "button-disable" : "button-solid"
          }`}
          type="submit"
        >
          Iniciar sesión
        </button>
      </div>
    </form>
  );
}
