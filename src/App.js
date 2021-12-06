import RestaurentScreen from './components/RestaurentScreen';
import {Provider} from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <RestaurentScreen />
    </Provider>
  );
}

export default App;
