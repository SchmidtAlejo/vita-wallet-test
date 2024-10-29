import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { AuthContextProps, AuthData, credentials } from "../utils/interface";
import { getProfile } from "../components/dashboard/dashborad.service";
import { profile } from "../components/dashboard/dashboard.interface";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [expiry, setExpiry] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [client, setClient] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [profile, setProfile] = useState<profile | null>(null);

  const setAuthData = (data: AuthData) => {
    setExpiry(data.expiry);
    setAccessToken(data.accessToken);
    setClient(data.client);
    setUid(data.uid);
    localStorage.setItem("authData", JSON.stringify(data));
  };

  const clearAuthData = () => {
    setExpiry(null);
    setAccessToken(null);
    setClient(null);
    setUid(null);
    localStorage.removeItem("authData");
  };

  const updateProfile = (credentials: credentials) => {
    getProfile(credentials).then((res) => {
      if (res) {
        setAuthData(credentials);
        setProfile(res);
      } else {
        clearAuthData();
      }
    });
  };

  useEffect(() => {
    const storedData = localStorage.getItem("authData");
    if (storedData) {
      const data = JSON.parse(storedData) as AuthData;
      updateProfile(data);
    }
  }, []);

  useEffect(() => {
    if (uid) {
      updateProfile({ expiry, accessToken, client, uid } as credentials);
    }
  }, [uid]);

  const getCredentials = () => {
    return {
      expiry,
      accessToken,
      client,
      uid,
    } as credentials;
  };

  return (
    <AuthContext.Provider
      value={{
        expiry,
        accessToken,
        client,
        uid,
        profile,
        setAuthData,
        clearAuthData,
        getCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
