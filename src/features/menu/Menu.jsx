import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../services/apiRestaurant';
import MenuItem from './MenuItem';

function Menu() {
  const pizzas = useLoaderData();
  return (
    <ul className="divide-y divide-stone-500">
      {pizzas.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

export async function Loader() {
  const data = await getMenu();
  return data;
}

export default Menu;
