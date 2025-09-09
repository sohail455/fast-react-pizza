import { useState } from "react";
import { Form, redirect, useActionData } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const formActionData = useActionData();

  return (
    <div>
      <h2>Ready to order? Let go!</h2>

      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
          <div style={{ color: "red" }}>
            {formActionData?.name && formActionData.name}
          </div>
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
            <div style={{ color: "red" }}>
              {formActionData?.phone && formActionData.phone}
            </div>
          </div>
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input hidden name="cart" value={JSON.stringify(cart)} />
          <button>Order now</button>
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
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };
  console.log(payload);
  const errors = {};
  if (!isValidPhone(payload.phone)) {
    errors.phone = "Please Provide a Valid Phone Number";
  }
  if (payload.customer.split(" ").length === 1) {
    errors.name = "Please Provide a Full Name";
  }

  if (Object.keys(errors).length > 0) return errors;
  //if everything is ok
  const order = await createOrder(payload);

  return redirect(`/order/${order.id}`);
}

export default CreateOrder;
