// Test ID: IIDSAT

import { useFetcher, useLoaderData } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import OrderItem from './OrderItem';
import { useEffect } from 'react';
import MakePriority from './MakePriority';

function Order() {
  const fetcher = useFetcher();
  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
    },
    [fetcher],
  );

  const order = useLoaderData();
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-4">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-xl font-semibold">Order #{id} Status</h2>

        <div className="space-x-3">
          {priority && (
            <span className="rounded-full bg-red-600 px-2 py-1 text-xs uppercase tracking-wide text-red-300">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-600 px-2 py-1 text-xs uppercase tracking-wide text-green-300">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between bg-stone-300 px-2 py-4">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
      <ul className="divide-y divide-stone-300">
        {cart.map((pizza) => (
          <OrderItem
            item={pizza}
            key={pizza.pizzaId}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher.data
                ? fetcher.data.find((item) => item.id === pizza.pizzaId)
                    .ingredients
                : []
            }
          />
        ))}
      </ul>

      <div className="bg-stone-300 px-2 py-4">
        <p className="font-medium">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && (
          <p className="font-medium">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-bold">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {!priority && <MakePriority />}
    </div>
  );
}

export async function loader({ params }) {
  const id = params.id;
  console.log(id);
  const data = await getOrder(id);
  return data;
}

export default Order;
