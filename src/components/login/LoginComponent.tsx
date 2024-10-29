import LoginHero from "../../assets/images/login-image.svg";
import LoginForm from "./LoginForm";

export default function LoginComponent() {
  return (
    <main className="login">
      <div className="container">
        <div style={{ flex: 4 }}>
          <h1 className="title">Iniciar sesión</h1>
          <LoginForm />
        </div>
        <div className="login__hero" style={{ flex: 8 }}>
          <img src={LoginHero} alt="Login Hero" />
        </div>
      </div>
    </main>
  );
}
