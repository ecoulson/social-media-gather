import React from 'react';
import './App.css';
import FeedFetcher from './FeedFetcher';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SignUp from './SignUp';

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/">
            <FeedFetcher />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
