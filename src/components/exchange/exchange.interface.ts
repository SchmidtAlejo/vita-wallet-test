type ExchangeRatesDetails = {
  [targetCurrency: string]: number;
};

type AdditionalFees = {
  btc_min_total_send_external?: number;
  btc_fee_send_external?: number;
  usdt_fee_send_external?: number;
  usdc_fee_send_external?: number;
};

type Prices = {
  [currency: string]: ExchangeRatesDetails & AdditionalFees;
};

export type ExchangeRates = {
  prices: Prices;
  valid_until: string;
};

export type CurrencyOption = {
  targetCurrency: string;
  icon: JSX.Element;
};

export type ExchangePost = {
  currency_sent: string;
  currency_received: string;
  amount_sent: number;
};

export type optionsOfCurrencyString = "usd" | "btc" | "usdt" | "usdc";
