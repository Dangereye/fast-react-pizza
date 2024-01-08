// React router
import { useLoaderData } from 'react-router-dom';

// Services
import { getMenu } from '../../services/apiRestaurant';

// Components
import MenuItem from './MenuItem';

function Menu() {
  const menu = useLoaderData();

  return (
    <ul className='px-2 divide-y divide-stone-200'>
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
