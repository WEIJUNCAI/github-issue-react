import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import rootReducer from './redux/reducers';
import IssueTabContainer from './containers/IssueTabContainer';
import IssueDetailContainer from './containers/IssueDetailContainer';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => <Redirect to="/facebook/react/issues" />} />
        <Route path="/:owner/:repo/issues" exact component={IssueTabContainer} />
        <Route path="/:owner/:repo/issues/:issueId" component={IssueDetailContainer} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root'));
registerServiceWorker();
