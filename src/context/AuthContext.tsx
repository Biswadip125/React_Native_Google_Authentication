import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { onAuthStateChanged, signOut, type User } from "firebase/auth";

import { auth } from "@/services/firebase";
import { logoutFromGoogle } from "@/services/googleAuth";
import { isAllowedEmail } from "@/utils/validateEmail";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (
          currentUser &&
          (!currentUser.emailVerified || !isAllowedEmail(currentUser.email))
        ) {
          await signOut(auth);
          setUser(null);
          return;
        }

        setUser(currentUser);
      } catch (error) {
        console.error("Authentication state error:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    await logoutFromGoogle();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
