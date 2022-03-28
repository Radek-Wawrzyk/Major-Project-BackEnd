interface AuthLogin {
  email: string;
  password: string;
}

interface AuthRegister {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: number;
}

interface AuthTokenPayload {
  access_token: string;
}

export { AuthLogin, AuthRegister, AuthTokenPayload };
