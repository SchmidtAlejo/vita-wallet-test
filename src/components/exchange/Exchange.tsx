import { useEffect, useState } from "react";
import FirstPart from "./FirstPart";
import { ExchangePost, ExchangeRates } from "./exchange.interface";
import { profile } from "../dashboard/dashboard.interface";
import { useAuth } from "../../context/AuthContext";
import { getPrices } from "./exchange.service";
import { getProfile } from "../dashboard/dashborad.service";
import SecondPart from "./SecondPart";

export default function Exchange() {
  const [isInFirstPart, setIsInFirstPart] = useState(true);
  const [amountExit, setAmountExit] = useState(0);
  const [body, setBody] = useState<ExchangePost>({
    amount_sent: 0,
    currency_sent: "",
    currency_received: "",
  });

  const { getCredentials } = useAuth();
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(
    null
  );
  const [profile, setProfile] = useState<profile | null>(null);

  useEffect(() => {
    getPrices(getCredentials())
      .then((data) => {
        setExchangeRates(data);
      })
      .catch((error) => console.error(error));

    getProfile(getCredentials())
      .then((res) => setProfile(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="exchange">
      <div className="container">
        {isInFirstPart ? (
          <FirstPart
            exchangeRates={exchangeRates}
            profile={profile}
            setBody={setBody}
            setIsInFirstPart={setIsInFirstPart}
            setAmountExit={setAmountExit}
          />
        ) : (
          <SecondPart
            setIsInFirstPart={setIsInFirstPart}
            body={body}
            exchangeRates={exchangeRates}
            amountExit={amountExit}
          />
        )}
      </div>
    </main>
  );
}
