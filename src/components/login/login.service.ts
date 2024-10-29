import { API_URL, APP_NAME } from "../../utils/utils";
import { loginRequest, loginResponse } from "./login.interface";

export const login = async (
  body: loginRequest
): Promise<loginResponse | null> => {
  try {
    const formBody = new URLSearchParams();
    for (const key in body) {
      formBody.append(key, body[key as keyof loginRequest]);
    }

    formBody.append("dev_mode", "true");

    const response = await fetch(`${API_URL}/auth/sign_in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "app-name": APP_NAME,
      },
      body: formBody.toString(),
    });

    if (!response.ok) {
      throw new Error("Error en la solicitud de login");
    }

    const result = await response.json();

    return {
      accessToken: response.headers.get("access-token")!,
      client: response.headers.get("client")!,
      expiry: +response.headers.get("expiry")!,
      uid: result.data.attributes.email,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
