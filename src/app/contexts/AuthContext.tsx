import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface User {
  name: string;
  lastName: string;
  userId: string;
  isAdmin: Boolean;
}

interface AuthContextType {
  user: User | null;
  login: (name: string, lastName: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (name: string, lastName: string) => {
    const newUser = {
      name: name.toLowerCase(),
      lastName: lastName.toLowerCase(),
      userId: `${name.toLowerCase()}_${lastName.toLowerCase()}`,
      isAdmin: false,
    };
    if (newUser.userId === process.env.NEXT_PUBLIC_ADMIN_USER_ID) {
      newUser.isAdmin = true;
    }

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.setItem("user", JSON.stringify(null));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
