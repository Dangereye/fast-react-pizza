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
    <div className='grid grid-rows-[auto_1fr_auto] h-screen'>
      {isLoading && <Loader />}
      <Header />
      <div className='overflow-y-scroll'>
        <main className='max-w-3xl mx-auto'>
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}
