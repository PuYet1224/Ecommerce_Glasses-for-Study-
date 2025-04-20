import { createContext, useState, useCallback } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const id   = localStorage.getItem('clientId');
    const name = localStorage.getItem('clientName');
    return id ? { id, name } : null;
  });

  const login = useCallback(({ id, name }) => {
    localStorage.setItem('clientId',   id);
    localStorage.setItem('clientName', name);
    setUser({ id, name });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('clientId');
    localStorage.removeItem('clientName');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
