import React from 'react';
import './App.css';
import FeedFetcher from './FeedFetcher';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SignUp from './SignUp';
import Login from './Login';
import Logout from "./Logout"

function App() {

  return (
    <Router>
		<Switch>
			<Route exact path="/">
				<FeedFetcher />
			</Route>
			<Route exact path="/signup">
				<SignUp />
			</Route>
			<Route exact path="/login">
				<Login />
			</Route>
			<Route exact path="/logout">
				<Logout />
			</Route>
		</Switch>
    </Router>
  );
}

export default App;
