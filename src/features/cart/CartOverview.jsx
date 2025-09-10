import { Link } from 'react-router-dom';

function CartOverview() {
  return (
    <div className="flex items-center justify-between bg-zinc-900 p-4 font-bold text-stone-200">
      <p className="space-x-4 text-stone-300">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>
      <Link to={'/cart'}>Open Cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
