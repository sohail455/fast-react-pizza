import { formatCurrency } from '../../utils/helpers';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../cart/cartSlice';
import DeleteItem from '../../ui/DeleteItem';
import ChangeeQuantity from '../cart/ChangeeQuantity';
function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(
    (state) =>
      state.cart.cart.find((item) => item.itemId === id)?.quantity ?? 0,
  );
  const isChosen = currentQuantity > 0 ? true : false;

  function handleAddToCart(e) {
    e.preventDefault();
    const newItem = {
      itemId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }
  return (
    <li className="flex py-3">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col px-2">
        <p className="font-bold">{name}</p>
        <p className="font-sm capitalize italic">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between font-semibold">
          {!soldOut ? (
            <p>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className={'text-sm font-medium uppercase text-stone-500'}>
              Sold out
            </p>
          )}
          {!soldOut ? (
            <>
              {isChosen ? (
                <div className="flex gap-6">
                  <ChangeeQuantity id={id} quantity={currentQuantity} />
                  <DeleteItem id={id}>Delete</DeleteItem>
                </div>
              ) : (
                <Button type={'small'} onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              )}
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
