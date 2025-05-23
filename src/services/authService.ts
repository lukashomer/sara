import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// // Add event types
// type AuthEventType = "logout" | "login" | "tokenExpired";

// interface AuthEvent {
//   type: AuthEventType;
//   data?: any;
// }

interface AuthResponse {
  expires_in: number;
  token: string;
  refresh_token: string;
  success: boolean;
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

interface RefreshTokenResponse {
  success: boolean;
  message: string;
  token: string;
  expires_in: number;
}

export const externalLogin = async (email: string, password: string) => {
  const response = await axios.post<AuthResponse>(
    `${API_URL}/auth/login`,
    {
      email,
      password,
    },
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data;
};

export const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    throw new Error("No refresh token available");
  }

  const response = await axios.post<RefreshTokenResponse>(
    `${API_URL}/auth/refresh`,
    {
      refresh_token: refreshToken,
    }
  );

  if (!response.data.success) {
    throw new Error(response.data.message);
  }

  return response.data;
};

export const logout = async () => {
  
}