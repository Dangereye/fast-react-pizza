// React router
import { Link } from 'react-router-dom';

// Components
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

export default function Header() {
  return (
    <header className='flex items-center justify-between px-4 py-3 uppercase bg-yellow-500 border-b border-stoe-200 sm:px-6'>
      <Link to='/' className='tracking-widest'>
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
