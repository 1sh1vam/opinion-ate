import {useEffect} from 'react';
import {connect} from 'react-redux';
import {List, ListItem, ListItemText} from '@material-ui/core';
import {loadRestaurents} from '../store/restaurents/actions';

export const RestaurentList = ({loadRestaurents, restaurents}) => {
  useEffect(() => {
    loadRestaurents();
  }, [loadRestaurents]);

  return (
    <List>
      {restaurents.map(restaurent => (
        <ListItem key={restaurent.id}>
          <ListItemText>{restaurent.name}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

const mapDispatchToProps = {loadRestaurents};

const mapStateToProps = state => ({
  restaurents: state.restaurents.records,
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurentList);
