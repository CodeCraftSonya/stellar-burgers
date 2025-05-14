import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  getNewOrderData,
  sendOrder
} from '../../services/orderSlice';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(
    (state: RootState) => state.order.constructorItems
  );
  const orderRequest = useSelector(
    (state: RootState) => state.order.orderRequest
  );
  const orderModalData = useSelector(
    (state: RootState) => state.order.orderModalData
  );
  const newOrderData = useSelector((state) =>
    getNewOrderData({ order: state.order })
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  // const onOrderClick = () => {
  //   if (!constructorItems.bun || orderRequest) return;
  //   dispatch(sendOrder());
  // };

  const onOrderClick = () => {
    if (!user && !isLoading)
      navigate('/login', {
        state: { locationState: { background: location } }
      });
    if (constructorItems.bun && !orderRequest) {
      dispatch(sendOrder(newOrderData));
    } else return;
  };

  const closeOrderModal = () => {
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
