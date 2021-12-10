import {Typography, Card, CardContent} from '@material-ui/core';
import RestaurentList from './RestaurentList';

const RestaurentScreen = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">Restaurents</Typography>
        <RestaurentList />
      </CardContent>
    </Card>
  );
};

export default RestaurentScreen;
