import { Link } from 'react-router-dom';
import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { getCart, clearCart } from './cartSlice';
import EmptyCart from './EmptyCart';
function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const userName = useSelector((state) => state.user.userName);
  if (cart.length === 0) return <EmptyCart />;
  return (
    <div>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mb-5 mt-5 text-xl">
        Your cart, <span className="font-bold">{userName}</span>
      </h2>
      <ul className="mb-5 divide-y-2 divide-stone-300 text-stone-500">
        {cart.map((item) => (
          <CartItem item={item} key={item.itemId} />
        ))}
      </ul>

      <div className="space-x-2">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button type="secondry" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
