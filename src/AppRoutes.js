<<<<<<< HEAD
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { Dashboard } from "./components/pages/Dashboard";
import { Login } from "./components/pages/Login";
import { SignUp } from "./components/pages/SignUp";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
=======
import {Route, Routes} from "react-router-dom";

import {Home} from "./components/pages/Home/";
import {Dashboard} from "./components/pages/Dashboard";
import {Login} from "./components/pages/Login";
import {SignUp} from "./components/pages/SignUp";
import {AuctionPage} from "./components/AuctionPage";
import {CreateAuctionForm} from "./components/create-auction";

export const AppRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/dashboard" element={<Dashboard />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<SignUp />} />
			<Route path="/auction/:id" element={<AuctionPage />} />
			<Route path="/create-auction" element={<CreateAuctionForm />} />
			<Route path="*" element={<Home />} />
		</Routes>
	);
>>>>>>> main
};
