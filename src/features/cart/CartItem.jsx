import DeleteItem from '../../ui/DeleteItem';
import { formatCurrency } from '../../utils/helpers';
import ChangeeQuantity from './ChangeeQuantity';
function CartItem({ item }) {
  const { itemId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <p className="text-lg font-bold">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between gap-4">
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
        <ChangeeQuantity id={itemId} quantity={quantity} />
        <DeleteItem id={itemId}>Delete</DeleteItem>
      </div>
    </li>
  );
}

export default CartItem;
