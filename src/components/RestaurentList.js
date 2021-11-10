import {useEffect} from 'react';

export const RestaurentList = ({loadRestaurents, restaurents}) => {
  useEffect(() => {
    loadRestaurents();
  }, [loadRestaurents]);

  return (
    <ul>
      {restaurents.map(restaurent => (
        <li key={restaurent.id}>{restaurent.name}</li>
      ))}
    </ul>
  );
};

export default RestaurentList;
