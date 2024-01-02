import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './ui/Home';
import Menu from './features/menu/Menu';
import Cart from './features/cart/Cart';
import CreateOrder from './features/order/CreateOrder';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/menu', element: <Menu /> },
  { path: '/cart', element: <Cart /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
