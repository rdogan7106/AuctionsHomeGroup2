/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userList, setUserList] = useState(null)
  const [auctionsList, setAuctionsList] = useState(null)

  const login = async (username, password) => {
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    const auctionResponse = await fetch("http://localhost:3000/auctions");
    const auctions = await auctionResponse.json();
    setAuctionsList(auctions)
    setUserList([users])
    const user = users.find(
      (user) => user.username === username && user.password === password
    );
    if (user) {
      setUser(user);
      return true;
    } else {
      return false;
    }

  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, userList, setUserList, auctionsList, setAuctionsList }}>
      {children}
    </AuthContext.Provider>
  );
};
