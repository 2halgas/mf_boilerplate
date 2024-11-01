// hooks/useAuth.ts
import { useAtom } from "jotai";
import { User } from "../../api/model/auth/user.model";
import { userAtom, isAuthenticatedAtom } from "../../store/auth_store";

interface UseAuthReturn {
  login: (user: User) => void;
  logout: () => void;
  user: User | null;
  isAuthenticated: boolean;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useAtom(userAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  // Simulate login
  const login = (value: User) => {
    setUser(value);
    setIsAuthenticated(true);
  };

  // Simulate logout
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };
  return {
    login,
    logout,
    user,
    isAuthenticated,
  };
};
