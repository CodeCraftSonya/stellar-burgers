import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearConstructor,
  orderSlice,
  sendOrder,
  setOrderModalData
} from '../../services/orderSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import { userSlice } from '../../services/userSlice';

const {
  getNewOrderData,
  selectOrderRequest,
  selectOrderModalData,
  selectConstructorItems
} = orderSlice.selectors;

const { selectUser, selectUserIsLoading } = userSlice.selectors;

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectConstructorItems);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrderModalData);
  const newOrderData = useSelector((state) =>
    getNewOrderData({ order: state.order })
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isLoading = useSelector(selectUserIsLoading);
  const user = useSelector(selectUser);

  const onOrderClick = () => {
    if (!user && !isLoading) {
      navigate('/login', {
        state: { locationState: { background: location } }
      });
      return;
    }

    if (constructorItems.bun && !orderRequest) {
      dispatch(sendOrder(newOrderData));
    } else return;
  };

  const closeOrderModal = () => {
    dispatch(setOrderModalData(null));
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
