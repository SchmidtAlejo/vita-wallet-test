import { useState } from "react";
import { ArrowDownIcon } from "../../assets/icons";
import { CurrencyOption } from "./exchange.interface";

export default function CurrencySelector({
  currencyOptions,
  activeCurrency,
  setCurrencyExchangeActive,
}: {
  currencyOptions: CurrencyOption[];
  activeCurrency: CurrencyOption;
  setCurrencyExchangeActive: React.Dispatch<
    React.SetStateAction<CurrencyOption>
  >;
}) {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className="exchange__selector">
      <div
        className="exchange__selector__selected"
        onClick={() => setIsActive(!isActive)}
      >
        {activeCurrency.icon}
        <div
          style={{
            transform: isActive ? "rotate(180deg)" : "rotate(0deg)",
            transition: "all 0.3s ease-in-out",
            display: "flex",
            alignItems: "center",
          }}
        >
          <ArrowDownIcon />
        </div>
      </div>
      <ul
        className="exchange__selector__options"
        style={{ display: isActive ? "flex" : "none" }}
      >
        {currencyOptions.map((currencyOption) => {
          return (
            <li
              key={currencyOption.targetCurrency}
              onClick={() => {
                setIsActive(false);
                setCurrencyExchangeActive(currencyOption);
              }}
            >
              {currencyOption.icon}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
