import { credentials } from "../../utils/interface";
import { API_URL, APP_NAME } from "../../utils/utils";
import { ExchangePost } from "./exchange.interface";

export const getPrices = async (
  credentials: credentials
): Promise<any | null> => {
  try {
    const response = await fetch(`${API_URL}/users/get_crypto_multi_prices`, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "app-name": APP_NAME,
        "access-token": credentials.accessToken,
        uid: credentials.uid,
        expiry: credentials.expiry,
        client: credentials.client,
      },
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const postExchange = async (
  credentials: credentials,
  body: ExchangePost
): Promise<boolean | null> => {
  try {
    const response = await fetch(`${API_URL}/transactions/exchange`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "app-name": APP_NAME,
        "access-token": credentials.accessToken,
        uid: credentials.uid,
        expiry: credentials.expiry,
        client: credentials.client,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud");
    }

    return true;
  } catch (error) {
    console.error(error);
    return null;
  }
};
