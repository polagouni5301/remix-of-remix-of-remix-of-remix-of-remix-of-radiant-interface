import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState({ user: { email: "dummy@example.com" } });
  const [loading, setLoading] = useState(false);

  return (
    <AuthContext.Provider value={{ user: session?.user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext) || { user: null, loading: false };
}
