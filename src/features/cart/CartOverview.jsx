// React Redux
import { useSelector } from 'react-redux';

// React router
import { Link } from 'react-router-dom';

// Selector functions
import { getCartTotalPrice, getCartTotalQuantity } from './cartSlice';

// Utilities
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  const totalCartQuantity = useSelector(getCartTotalQuantity);
  const totalCartPrice = useSelector(getCartTotalPrice);

  if (!totalCartQuantity) return null;

  return (
    <div className='flex items-center justify-between px-4 py-4 text-sm uppercase bg-stone-800 text-stone-200 sm:px-6 md:text-base'>
      <p className='space-x-4 font-semibold text-stone-300 sm:space-x-6'>
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to='/cart'>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
