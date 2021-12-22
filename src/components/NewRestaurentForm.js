import {TextField, Button, Box, makeStyles} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {useState} from 'react';
import {connect} from 'react-redux';
import {createRestaurent} from '../store/restaurents/actions';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export const NewRestaurentForm = ({createRestaurent}) => {
  const [name, setName] = useState('');
  const [validationError, setValidationError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();

    if (!name) return setValidationError(true);

    setValidationError(false);
    setServerError(false);
    createRestaurent(name)
      .then(() => {
        setName('');
      })
      .catch(() => {
        setServerError(true);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      {serverError && (
        <Alert severity="error">
          The restaurent could not be saved. Please try again.
        </Alert>
      )}
      {validationError && <Alert severity="error">Name is required</Alert>}
      <Box display="flex" className={classes.root}>
        <TextField
          value={name}
          placeholder="Add Restaurent"
          fullWidth
          onChange={({target}) => setName(target.value)}
          variant="filled"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          data-testid="create-a-new-restaurent"
        >
          Add
        </Button>
      </Box>
    </form>
  );
};

const mapStateToProps = null;

const mapDispatchToProps = {createRestaurent};

export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurentForm);
