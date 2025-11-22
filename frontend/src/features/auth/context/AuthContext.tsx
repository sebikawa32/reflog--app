import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  refreshLoginState: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  refreshLoginState: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const refreshLoginState = async () => {
    const token = await AsyncStorage.getItem("accessToken");
    setIsLoggedIn(!!token);
  };

  const logout = async () => {
    await AsyncStorage.removeItem("accessToken");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, refreshLoginState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
