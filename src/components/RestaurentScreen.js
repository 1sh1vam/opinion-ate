import {Typography, Card, CardContent} from '@material-ui/core';
import RestaurentList from './RestaurentList';
import NewRestaurentForm from './NewRestaurentForm';

const RestaurentScreen = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Restaurents</Typography>
        <NewRestaurentForm />
        <RestaurentList />
      </CardContent>
    </Card>
  );
};

export default RestaurentScreen;
