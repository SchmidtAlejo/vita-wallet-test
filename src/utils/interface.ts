import { profile } from "../components/dashboard/dashboard.interface";

export interface credentials {
  accessToken: string;
  uid: string;
  expiry: string;
  client: string;
}

export interface AuthContextProps {
  expiry: string | null;
  accessToken: string | null;
  client: string | null;
  uid: string | null;
  profile: profile | null;
  setAuthData: (data: AuthData) => void;
  getCredentials: () => credentials;
  clearAuthData: () => void;
}

export interface AuthData {
  expiry: string;
  accessToken: string;
  client: string;
  uid: string;
}
