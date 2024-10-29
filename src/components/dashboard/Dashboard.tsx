import { useAuth } from "../../context/AuthContext";
import vitaLogo from "../../assets/images/vita-logo.svg";
import { getHistory } from "./dashborad.service";
import { useEffect, useState } from "react";
import Balances from "./Balances";
import History from "./History";

export default function Dashboard() {
  const { getCredentials, profile } = useAuth();
  const [history, setHistory] = useState<any>(null);

  useEffect(() => {
    getHistory(getCredentials())
      .then((res) => setHistory(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="dashboard">
      <div className="container">
        <div className="dashboard__header">
          <img src={vitaLogo} alt="Vita logo" className="dashboard__logo" />
          <h2 className="subtitle">
            ¡Hola{" "}
            <span className="dashboard__name subtitle">{profile?.name}!</span>
          </h2>
        </div>
        <div className="dashboard__balances">
          <h3 className="subtitle2">Mis saldos</h3>
          <Balances profile={profile} />
        </div>
        <div className="dashboard__history">
          <h3 className="subtitle2">Historial</h3>
          <History history={history} />
        </div>
      </div>
    </main>
  );
}
