import {useEffect} from 'react';

export const RestaurentList = ({loadRestaurents}) => {
  useEffect(() => {
    loadRestaurents();
  }, [loadRestaurents]);

  return <div>RestaurentList</div>;
};

export default RestaurentList;
