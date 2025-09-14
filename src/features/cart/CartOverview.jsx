import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartTotalQunatity } from './cartSlice';
import { getCartTotalPrice } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';
function CartOverview() {
  const totalQuantity = useSelector(getCartTotalQunatity);
  const totalPrice = useSelector(getCartTotalPrice);
  return (
    <div className="flex items-center justify-between bg-zinc-900 p-4 font-bold text-stone-200">
      <p className="space-x-4 text-stone-300">
        <span>{totalQuantity} pizzas</span>
        <span> {formatCurrency(totalPrice)}</span>
      </p>
      <Link to={'/cart'}>Open Cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
