import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { connectedRouter } from 'react-router-redux';
import createBrowserHistory from 'history/createBrowserHistory';
import { createStore, combineReducers, applyMiddleware} from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as reducers from './reducers';

const history = createBrowserHistory();
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(
    routerMiddleware(history)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <connectedRouter history={history}>
      <App />
    </connectedRouter>
  </Provider>, 
  document.getElementById('root')
);
registerServiceWorker();
