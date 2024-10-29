import { useEffect, useState } from "react";
import {
  CurrencyOption,
  ExchangePost,
  ExchangeRates,
  optionsOfCurrencyString,
} from "./exchange.interface";
import CurrencySelector from "./CurrencySelector";
import {
  BTCIcon,
  BTCIcon2,
  DollarIcon,
  USDCIcon,
  USDTIcon,
  USDTIcon2,
} from "../../assets/icons";
import { profile } from "../dashboard/dashboard.interface";
import { calculateExchangeAmount } from "../../utils/utils";
import { NavLink } from "react-router-dom";

export default function FirstPart({
  exchangeRates,
  profile,
  setBody,
  setIsInFirstPart,
  setAmountExit,
}: {
  profile: profile | null;
  exchangeRates: ExchangeRates | null;
  setBody: React.Dispatch<React.SetStateAction<ExchangePost>>;
  setIsInFirstPart: React.Dispatch<React.SetStateAction<boolean>>;
  setAmountExit: React.Dispatch<React.SetStateAction<number>>;
}) {
  const options = [
    {
      targetCurrency: "usd",
      icon: <DollarIcon />,
    },
    {
      targetCurrency: "btc",
      icon: <BTCIcon />,
    },
    {
      targetCurrency: "usdt",
      icon: <USDTIcon />,
    },
    {
      targetCurrency: "usdc",
      icon: <USDCIcon />,
    },
  ];

  const options2 = [
    {
      targetCurrency: "usd",
      icon: <DollarIcon />,
    },
    {
      targetCurrency: "btc",
      icon: <BTCIcon2 />,
    },
    {
      targetCurrency: "usdt",
      icon: <USDTIcon2 />,
    },
    {
      targetCurrency: "usdc",
      icon: <USDCIcon />,
    },
  ];

  const [currencyExchangeActive, setCurrencyExchangeActive] =
    useState<CurrencyOption>(options[0]);

  const [currencyToBuyActive, setCurrencyToBuyActive] =
    useState<CurrencyOption>(options2[1]);

  const [amount, setAmount] = useState<string | number>("");
  const [filteredOptions, setFilteredOptions] =
    useState<CurrencyOption[]>(options2);

  const [exchangeAmount, setExchangeAmount] = useState<number>(0);

  useEffect(() => {
    setExchangeAmount(
      calculateExchangeAmount(
        exchangeRates,
        currencyExchangeActive.targetCurrency,
        currencyToBuyActive.targetCurrency,
        +amount
      )
    );
  }, [currencyExchangeActive, amount, currencyToBuyActive]);

  useEffect(() => {
    setFilteredOptions(
      options2.filter(
        (option) =>
          option.targetCurrency !== currencyExchangeActive.targetCurrency &&
          option.targetCurrency !== currencyToBuyActive.targetCurrency
      )
    );
  }, [currencyExchangeActive, currencyToBuyActive]);

  const handleNext = () => {
    setBody({
      amount_sent: amount,
      currency_sent: currencyExchangeActive.targetCurrency,
      currency_received: currencyToBuyActive.targetCurrency,
    });
    setIsInFirstPart(false);
    setAmountExit(exchangeAmount);
  };
  return (
    <>
      <h2 className="subtitle">¿Qué deseas intercambiar?</h2>
      <p className="balance others">
        Saldo disponible: ${" "}
        {
          profile?.balances?.[
            currencyExchangeActive.targetCurrency as optionsOfCurrencyString
          ]
        }{" "}
        {currencyExchangeActive.targetCurrency.toUpperCase()}
      </p>
      <div className="exchange__inputs">
        <div>
          <p>Monto a intercambiar</p>
          <div className="exchange__inputs__currency">
            <CurrencySelector
              activeCurrency={currencyExchangeActive}
              currencyOptions={options}
              setCurrencyExchangeActive={setCurrencyExchangeActive}
            />
            <div style={{ position: "relative" }}>
              <input
                type="number"
                inputMode="numeric"
                name="currencyExchange"
                onKeyDown={(e) => e.key === "e" && e.preventDefault()}
                value={amount}
                onChange={(e) => setAmount(+e.target.value)}
                className="input-price"
              />
              <div style={{ position: "absolute", top: "16px", left: "16px" }}>
                <DollarIcon />
              </div>
            </div>
          </div>
        </div>
        <div>
          <p>Quiero recibir</p>
          <div className="exchange__inputs__currency">
            <CurrencySelector
              activeCurrency={currencyToBuyActive}
              currencyOptions={filteredOptions}
              setCurrencyExchangeActive={setCurrencyToBuyActive}
            />
            <input
              type="number"
              name="currencyToBuy"
              value={exchangeAmount}
              disabled
              min={0}
            />
          </div>
        </div>
      </div>
      <div className="exchange__buttons">
        <NavLink to={"/"}>
          <button className="button-outline">Atras</button>
        </NavLink>
        <button
          className={`${
            exchangeAmount && exchangeAmount > 0
              ? "button-solid"
              : "button-disable"
          }`}
          onClick={handleNext}
        >
          Continuar
        </button>
      </div>
    </>
  );
}
