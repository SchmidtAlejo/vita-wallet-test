import { useState } from "react";
import { BackIcon } from "../../assets/icons";
import { useAuth } from "../../context/AuthContext";
import { ExchangePost, ExchangeRates } from "./exchange.interface";
import { postExchange } from "./exchange.service";
import ModalExchangeSuccessful from "./ModalExchangeSuccessful";

export default function SecondPart({
  body,
  exchangeRates,
  setIsInFirstPart,
  amountExit,
}: {
  body: ExchangePost;
  exchangeRates: ExchangeRates | null;
  setIsInFirstPart: React.Dispatch<React.SetStateAction<boolean>>;
  amountExit: number;
}) {
  const { getCredentials } = useAuth();
  const [isModalActive, setIsModalActive] = useState(false);

  const handleClick = () => {
    postExchange(getCredentials(), body).then((res) => {
      if (res) {
        setIsModalActive(true);
      }
    });
  };

  return (
    <>
      <div className="exchange__back" onClick={() => setIsInFirstPart(true)}>
        <BackIcon />
      </div>
      <h2 className="subtitle">Resumen de transacción</h2>
      <div className="exchange__summary">
        <div className="exchange__summary__item">
          <p className="caption1">Monto a intercambiar</p>
          <p className="others amount-entry">
            $ {body.amount_sent} {body.currency_received.toUpperCase()}
          </p>
        </div>
        <div className="exchange__summary__item">
          <p className="caption1">Tasa de cambio</p>
          <p className="others">
            1 {body.currency_sent.toUpperCase()} ={" "}
            {exchangeRates?.prices[body.currency_sent][body.currency_received]}{" "}
            {body.currency_received.toUpperCase()}
          </p>
        </div>
        <div className="exchange__summary__item">
          <p className="caption1">Total a recibir</p>
          <p className="others">
            {amountExit} {body.currency_sent.toUpperCase()}
          </p>
        </div>
      </div>
      <div className="exchange__summary__buttons">
        <button
          className="button-outline"
          onClick={() => setIsInFirstPart(true)}
        >
          Atrás
        </button>
        <button className="button-solid" onClick={handleClick}>
          Intercambiar
        </button>
      </div>
      {isModalActive && <ModalExchangeSuccessful />}
    </>
  );
}
