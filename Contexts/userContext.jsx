import {createContext} from 'react'
import { useState } from 'react';

export const UserContext = createContext(null)

export function UserProvider({ children }) {
    const [user, setUser] = useState({ username: "tickle122" });
  
    return (
      <UserContext.Provider value={{ user }}>
        {children}
      </UserContext.Provider>
    );
  }