/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Appbar from "./Appbar.jsx";
import HomePage from "../pages/Home.jsx";
import Loginpage from "../pages/Loginpage.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import AuctionsOnUserPage from "../pages/AuctionsOnUserPage.jsx";
import AuctionDetails from "../pages/AuctionDetails.jsx";
import { useAuth } from "../context/Context.jsx";
import Test from "./UsersComponents/Test.jsx";

function Router() {
  const [user, setUser] = useState(null);
  const { auctionsList } = useAuth();
  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <>
      <Appbar user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/auctions" element={<AuctionsOnUserPage />}></Route>
        <Route exact 
          path="/auctions/:auctionId"
          element={<AuctionDetails auctionsList={auctionsList} />}
        />
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route path="/login" element={<Loginpage login={login} />} />
      </Routes>
    </>
  );
}

export default Router;
