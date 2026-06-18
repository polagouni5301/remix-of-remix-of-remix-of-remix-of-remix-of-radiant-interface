import { createContext, useContext } from "react";

interface DemoUser {
  email: string;
  name: string;
}

interface AuthContextType {
  user: DemoUser | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

// Auth removed — the app runs fully on hardcoded front-end data.
const DEMO_USER: DemoUser = { email: "jordan@localiq.com", name: "Jordan" };

const AuthContext = createContext<AuthContextType>({
  user: DEMO_USER,
  loading: false,
  signOut: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <AuthContext.Provider value={{ user: DEMO_USER, loading: false, signOut: async () => {} }}>
      {children}
    </AuthContext.Provider>
  );
}
