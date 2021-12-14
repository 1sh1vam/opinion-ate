import {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {loadRestaurents} from '../store/restaurents/actions';

export const RestaurentList = ({
  loadRestaurents,
  restaurents,
  loading,
  loadingError,
}) => {
  useEffect(() => {
    loadRestaurents();
  }, [loadRestaurents]);

  return (
    <>
      {loading && <CircularProgress data-testid="loading-indicator" />}
      {loadingError && (
        <Alert severity="error">Restaurents could not be loaded.</Alert>
      )}
      <List>
        {restaurents.map(restaurent => (
          <ListItem key={restaurent.id}>
            <ListItemText>{restaurent.name}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
};

const mapDispatchToProps = {loadRestaurents};

const mapStateToProps = state => ({
  restaurents: state.restaurents.records,
  loading: state.restaurents.loading,
  loadingError: state.restaurents.loadingError,
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurentList);
