import React, { useState, createContext } from 'react';

console.log("🟢 AuthenticatedUserProvider.js loaded");

export const AuthenticatedUserContext = createContext({});

export const AuthenticatedUserProvider = ({ children }) => {
  console.log("🟢 AuthenticatedUserProvider component rendering");
  
  const [user, setUser] = useState(null);
  
  console.log("🟢 AuthenticatedUserProvider state initialized, user:", user);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
