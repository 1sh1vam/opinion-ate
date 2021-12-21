import {TextField, Button} from '@material-ui/core';
import {Alert} from '@material-ui/lab';
import {useState} from 'react';
import {connect} from 'react-redux';
import {createRestaurent} from '../store/restaurents/actions';

export const NewRestaurentForm = ({createRestaurent}) => {
  const [name, setName] = useState('');
  const [validationError, setValidationError] = useState(false);
  const [serverError, setServerError] = useState(false);

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
    </form>
  );
};

const mapStateToProps = null;

const mapDispatchToProps = {createRestaurent};

export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurentForm);
