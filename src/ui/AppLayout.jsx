import React from "react";
import Header from "./Header";
import { Link, Outlet, useNavigation } from "react-router-dom";
import CartOverview from "../features/cart/CartOverview";
import Loader from "./Loader";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      <main>
        <h1>Sohail</h1>
      </main>
      <Outlet />
      <CartOverview />
    </div>
  );
}

export default AppLayout;
