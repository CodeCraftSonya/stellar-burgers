import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { getUserOrders } from '../../services/authSlice';

export const ProfileOrders: FC = () => {
  const orders = useSelector((state: RootState) => state.auth.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
