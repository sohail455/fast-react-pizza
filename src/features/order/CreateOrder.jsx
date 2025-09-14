import { useState } from 'react';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getCartTotalPrice } from '../cart/cartSlice';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const dispatch = useDispatch();
  const cuurrentTotalCart = useSelector(getCartTotalPrice);
  const priortyCost = cuurrentTotalCart * 0.2;
  const cart = useSelector(getCart);
  console.log(cart);
  const formActionData = useActionData();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  console.log(navigation);
  const userName = useSelector((state) => state.user.userName);
  return (
    <div className="mt-10">
      <h2 className="mb-5 text-[22px] font-bold">Ready to order? Let go!</h2>

      <Form method="POST">
        <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center">
          <label className="text-lg font-semibold sm:basis-40">
            First Name
          </label>
          <input
            type="text"
            name="customer"
            required
            className="input grow"
            defaultValue={userName}
          />
        </div>

        <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center">
          <label className="text-lg font-semibold sm:basis-40">
            Phone number
          </label>
          <div className="grow">
            <input type="tel" name="phone" required className="input w-full" />
            <div style={{ color: 'red' }}>
              {formActionData?.phone && formActionData.phone}
            </div>
          </div>
        </div>

        <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-center">
          <label className="text-lg font-semibold sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              className="input w-full"
            />
          </div>
        </div>

        <div className="mb-5 flex items-center gap-4">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
            className="h-5 w-5 bg-yellow-100 accent-yellow-500 checked:bg-yellow-300"
          />
          <label htmlFor="priority" className="text-lg font-semibold">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input hidden name="cart" defaultValue={JSON.stringify(cart)} />

          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? '...Ordering'
              : `Order Now From ${formatCurrency(withPriority ? cuurrentTotalCart + priortyCost : cuurrentTotalCart)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const payload = {
    ...data,
    cart: JSON.parse(data.cart).map(({ itemId, ...rest }) => ({
      ...rest,
      pizzaId: itemId,
    })),
    priority: data.priority === 'true',
  };

  console.log(payload);
  const errors = {};
  if (!isValidPhone(payload.phone)) {
    errors.phone = 'Please Provide a Valid Phone Number';
  }

  if (Object.keys(errors).length > 0) return errors;
  //if everything is ok
  const order = await createOrder(payload);

  store.dispatch(clearCart());

  return redirect(`/order/${order.id}`);
}

export default CreateOrder;
