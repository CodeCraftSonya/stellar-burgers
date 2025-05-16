import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { RootState, useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  const ingredientData = useSelector((state: RootState) =>
    state.ingredients.items.find(
      (ingredient) =>
        ingredient._id === window.location.pathname.split('/').pop()
    )
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
