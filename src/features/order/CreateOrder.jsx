// React
import { useState } from 'react';

// React Redux
import { useDispatch, useSelector } from 'react-redux';
import store from '../../store';

// React router
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';

// Services
import { createOrder } from '../../services/apiRestaurant';

// Selectors, Actions & Thunks
import { fetchAddress } from '../user/userSlice';
import { clearCart, getCart, getCartTotalPrice } from '../cart/cartSlice';

// Components
import Button from '../../ui/Button';
import EmptyCart from '../cart/EmptyCart';

// Utilities
import { formatCurrency } from '../../utils/helpers';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';
  const cart = useSelector(getCart);
  const cartTotalPrice = useSelector(getCartTotalPrice);
  const priorityPrice = withPriority ? cartTotalPrice * 0.2 : 0;
  const totalPrice = cartTotalPrice + priorityPrice;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const formErrors = useActionData();
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>
        Ready to order? Let&apos;s go!
      </h2>

      <Form method='POST'>
        <div className='flex flex-col gap-2 mb-5 sm:items-center sm:flex-row'>
          <label className='sm:basis-40'>First Name</label>
          <input
            className='input grow'
            type='text'
            name='customer'
            defaultValue={username}
            required
          />
        </div>

        <div className='flex flex-col gap-2 mb-5 sm:items-center sm:flex-row'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='grow'>
            <input
              className='w-full input grow'
              type='tel'
              name='phone'
              required
            />
            {formErrors?.phone && (
              <p className='p-2 mt-2 text-xs text-red-700 bg-red-100 rounded-md'>
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className='relative flex flex-col gap-2 mb-5 sm:items-center sm:flex-row'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              className='w-full input'
              type='text'
              name='address'
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {addressStatus === 'error' && (
              <p className='p-2 mt-2 text-xs text-red-700 bg-red-100 rounded-md'>
                {errorAddress}
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className='absolute right-[3px] top-[35px] sm:right-[3px] sm:top-[3px] md:right-[5px] md:top-[5px] z-50'>
              <Button
                type='small'
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                {isLoadingAddress ? 'Searching...' : 'Get position'}
              </Button>
            </span>
          )}
        </div>

        <div className='flex items-center gap-5 mb-12'>
          <input
            className='w-6 h-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            type='checkbox'
            name='priority'
            id='priority'
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority' className='font-medium'>
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <input
            type='hidden'
            name='position'
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : 'Not provided'
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress} type='primary'>
            {isSubmitting
              ? 'Placing order...'
              : `Order now - ${formatCurrency(totalPrice)} `}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please provide a correct phone number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  // If everything is ok, create new order and redirect
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
