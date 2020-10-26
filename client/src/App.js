import React, { Suspense } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
const SetupAccount = React.lazy(() => import('./SetupAccount'));
const Login = React.lazy(() => import('./Login'));
const Logout = React.lazy(() => import("./Logout"));
const Register = React.lazy(() => import('./Register'));
const Profile = React.lazy(() => import('./Profile'));
const Layout = React.lazy(() => import('./Layout'));
const Home = React.lazy(() => import('./Home'));
const EditProfile = React.lazy(() => import('./EditProfile'));

function App() {

  return (
    <Router>
		<Switch>
			<Suspense fallback={() => <Layout />}>
				<Route exact path="/">
					<Home />
				</Route>
				<Route exact path="/edit-profile">
					<EditProfile />
				</Route>
				<Route exact path="/setup-account">
					<SetupAccount />
				</Route>
				<Route exact path="/login">
					<Login />
				</Route>
				<Route exact path="/logout">
					<Logout />
				</Route>
				<Route exact path="/register">
					<Register />
				</Route>
				<Route exact path="/profile/:username" render={(props) => (
					<Layout>
						<Profile {...props} />
					</Layout>
				)} />
			</Suspense>
		</Switch>
    </Router>
  );
}

export default App;
