// React router
import { useFetcher } from 'react-router-dom';

// Components
import Button from '../../ui/Button';

// Services
import { updateOrder } from '../../services/apiRestaurant';

export default function UpdateOrderPriority({ order }) {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method='PATCH' className='text-right'>
      <Button type='primary'>Make priority</Button>
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}
