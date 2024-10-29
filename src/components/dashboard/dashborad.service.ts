import { credentials } from "../../utils/interface";
import { API_URL, APP_NAME } from "../../utils/utils";
import { profile, transaction } from "./dashboard.interface";

export const getProfile = async (
  credentials: credentials
): Promise<profile | null> => {
  try {
    const response = await fetch(`${API_URL}/profile`, {
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

    return {
      name: result.data.attributes.first_name,
      balances: result.data.attributes.balances,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getHistory = async (
  credentials: credentials
): Promise<transaction[] | null> => {
  try {
    const response = await fetch(`${API_URL}/transactions`, {
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

    return result.data as transaction[];
  } catch (error) {
    console.error(error);
    return null;
  }
};
