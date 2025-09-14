import React from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { increaseItem, decreaseItem } from './cartSlice';
function ChangeeQuantity({ id, quantity }) {
  const dispatch = useDispatch();
  return (
    <div className="flex items-center gap-2">
      <Button type="round" onClick={() => dispatch(decreaseItem(id))}>
        -
      </Button>
      <span>{quantity}</span>
      <Button type="round" onClick={() => dispatch(increaseItem(id))}>
        +
      </Button>
    </div>
  );
}

export default ChangeeQuantity;
