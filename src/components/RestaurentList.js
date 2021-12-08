import {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadRestaurents} from '../store/restaurents/actions';

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

const mapDispatchToProps = {loadRestaurents};

const mapStateToProps = state => ({
  restaurents: state.restaurents.records,
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurentList);
