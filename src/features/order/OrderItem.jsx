import { formatCurrency } from '../../utils/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="py-2">
      <div className="flex items-center justify-between">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm font-semibold italic text-stone-400">
        {isLoadingIngredients ? '....Loding' : ingredients.join(', ')}
      </p>
    </li>
  );
}

export default OrderItem;
