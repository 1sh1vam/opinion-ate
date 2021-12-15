import {TextField, Button} from '@material-ui/core';

export const NewRestaurentForm = () => {
  return (
    <form>
      <TextField placeholder="Add Restaurent" fullWidth variant="filled" />
      <Button>Add</Button>
    </form>
  );
};

export default NewRestaurentForm;
