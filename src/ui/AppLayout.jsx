import React from 'react';
import Header from './Header';
import { Link, Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import Loader from './Loader';
import { useSelector } from 'react-redux';
import { getCartTotalQunatity } from '../features/cart/cartSlice';
function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  const quantity = useSelector(getCartTotalQunatity);
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-5xl">
          <Outlet />
        </main>
      </div>
      {quantity > 0 && <CartOverview />}
    </div>
  );
}

export default AppLayout;
