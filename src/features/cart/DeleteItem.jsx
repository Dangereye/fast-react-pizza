// React Redux
import { useDispatch } from 'react-redux';

// Components
import Button from '../../ui/Button';

// Actions & Selectors
import { deleteItem } from './cartSlice';

export default function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button type='small' onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}
