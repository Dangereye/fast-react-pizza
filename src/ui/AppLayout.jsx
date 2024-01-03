// React router
import { Outlet, useNavigation } from 'react-router-dom';

// Components
import Loader from './Loader';
import Header from './Header';
import CartOverview from '../features/cart/CartOverview';

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';
  return (
    <div className='layout'>
      {isLoading && <Loader />}
      <Header />
      <main>
        <Outlet />
      </main>
      <CartOverview />
    </div>
  );
}
