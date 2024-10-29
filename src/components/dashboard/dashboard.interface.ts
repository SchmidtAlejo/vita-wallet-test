export interface profile {
  name: string;
  balances: {
    usd: number;
    btc: number;
    usdt: number;
    usdc: number;
  };
}

export interface transaction {
  id: string;
  attributes: {
    amount: number;
    currency: string;
    category: string;
    sender_email: string;
  };
}
