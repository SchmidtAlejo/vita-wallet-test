import { ExchangeRates } from "../components/exchange/exchange.interface";

export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export const API_URL = import.meta.env.VITE_API_URL;
export const APP_NAME = import.meta.env.APP_NAME;

export const calculateExchangeAmount = (
  data: ExchangeRates | null,
  fromCurrency: string,
  toCurrency: string,
  amount: number
): number => {
  const now = new Date();

  if (data === null) return 0;

  const validUntil = new Date(data.valid_until);

  if (now > validUntil) {
    console.error("The exchange rate is no longer valid");
    return 0;
  }

  const rate = data.prices[fromCurrency][toCurrency];

  return amount * rate;
};
