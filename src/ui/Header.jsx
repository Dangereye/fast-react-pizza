// React router
import { Link } from 'react-router-dom';

// Components
import SearchOrder from '../features/order/SearchOrder';
import Username from '../features/user/Username';

export default function Header() {
  return (
    <header className='uppercase bg-yellow-500'>
      <Link to='/' className='tracking-widest'>
        Fast React Pizza Co.
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}
