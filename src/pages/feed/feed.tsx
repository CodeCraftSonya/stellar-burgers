import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { FeedSlice, fetchFeed } from '../../services/feedSlice';

const { selectOrders } = FeedSlice.selectors;

export const Feed: FC = () => {
  const orders = useSelector(selectOrders);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(fetchFeed())} />
  );
};
