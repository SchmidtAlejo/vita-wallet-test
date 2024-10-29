import { useAuth } from "../../context/AuthContext";
import { transaction } from "./dashboard.interface";

export default function History({
  history,
}: {
  history: transaction[] | null;
}) {
  const { uid } = useAuth();

  const getTransactionType = (transaction: transaction) => {
    if (transaction.attributes.category === "deposit")
      return { color: "blue", balance: "+", text: "Recargaste" };

    if (
      transaction.attributes.category === "sent" &&
      transaction.attributes.sender_email !== uid
    )
      return { color: "blue", balance: "+", text: "Transferiste" };

    if (transaction.attributes.category === "withdrawal")
      return { color: "red", balance: "-", text: "Retiraste" };

    if (
      transaction.attributes.category === "transfer" ||
      ((transaction.attributes.category === "sent" ||
        transaction.attributes.category === "exchange") &&
        transaction.attributes.sender_email === uid)
    )
      return { color: "red", balance: "-", text: "Transferiste" };

    return { color: "", balance: "", text: "Intercambiaste" };
  };

  return (
    <ul>
      {history?.map((i) => {
        const { color, balance, text } = getTransactionType(i);

        return (
          <li key={i.id}>
            <p>{text}</p>
            <p className={`dashboard__history__amount ${color}`}>
              {balance} ${i.attributes.amount}{" "}
              {i.attributes.currency.toUpperCase()}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
