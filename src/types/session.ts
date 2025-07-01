export interface TokenUser {
  id: string;
  name: string;
  email: string;
}

export interface SessionPayload {
  user: TokenUser;
  expires: number;
}
