import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store/store';
import { getUserOrders, userSlice } from '../../services/userSlice/userSlice';

const { selectUserOrders } = userSlice.selectors;

export const ProfileOrders: FC = () => {
  const orders = useSelector(selectUserOrders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
