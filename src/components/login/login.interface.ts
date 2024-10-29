export interface loginRequest {
  email: string;
  password: string;
}

export interface loginResponse {
  accessToken: string;
  uid: string;
  client: string;
  expiry: number;
}
