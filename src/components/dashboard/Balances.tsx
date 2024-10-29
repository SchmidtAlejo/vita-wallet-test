import { BTCIcon, DollarIcon, USDTIcon } from "../../assets/icons";
import { profile } from "./dashboard.interface";

export default function Balances({ profile }: { profile: profile | null }) {
  const balances = [
    {
      name: "Dolar",
      amount: profile?.balances.usd,
      icon: <DollarIcon />,
    },
    {
      name: "Bitcoin",
      amount: profile?.balances.btc,
      icon: <BTCIcon />,
    },
    {
      name: "Tether",
      amount: profile?.balances.usdt,
      icon: <USDTIcon />,
    },
  ];
  return (
    <ul>
      {balances.map((i) => (
        <li key={i.name}>
          <div>
            <h4>{i.name}</h4>
            {i.icon}
          </div>
          <p className="subtitle2semiBold">${i.amount}</p>
        </li>
      ))}
    </ul>
  );
}
