import React from 'react';
import Button from '../../ui/Button';
import { Form, useFetcher } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurant';

function MakePriority() {
  const featcher = useFetcher();
  return (
    <featcher.Form method="PATCH" className="text-right">
      <Button type="primary">MakePriority</Button>
    </featcher.Form>
  );
}

export async function action({ params }) {
  const data = { priority: true };
  await updateOrder(params.id, data);
  return null;
}

export default MakePriority;
