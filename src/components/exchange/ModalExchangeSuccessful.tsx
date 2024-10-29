import { NavLink } from "react-router-dom";
import { CloseIcon } from "../../assets/icons";
import image from "../../assets/images/modal-exchange-successful.svg";

export default function ModalExchangeSuccessful() {
  return (
    <div className="exchange__modal">
      <div className="exchange__modal__content">
        <NavLink className="exchange__modal__content__close" to={"/"}>
          <CloseIcon />
        </NavLink>
        <img src={image} alt="Imagen del intercambio exitoso" />
        <h2 className="subtitle">¡Intercambio exitoso!</h2>
        <p>Ya cuentas con los BTC en tu saldo.</p>
      </div>
    </div>
  );
}
