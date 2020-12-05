import React, { Suspense } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import LoginLayout from './LoginLayout';
import Loader from './Loader';
import Panel from './Panel';
const AddAccount = React.lazy(() => import('./AddAccount'));
const Me = React.lazy(() => import('./Me'));
const SearchPage = React.lazy(() => import('./SearchPage'));
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
		<Suspense fallback={() => <Panel><Loader /></Panel>}>
			<Switch>
				<Route exact path="/">
					<Layout>
						<Home />
					</Layout>
				</Route>
				<Route exact path="/me">
					<Layout>
						<Me />
					</Layout>
				</Route>
				<Route exact path="/edit-profile">
					<Layout>
						<EditProfile />
					</Layout>
				</Route>
				<Route exact path="/setup-account">
					<Layout>
						<SetupAccount />
					</Layout>
				</Route>
				<Route exact path="/profile/:username" render={(props) => (
					<Layout>
						<Profile {...props} />
					</Layout>
				)} />
				<Route exact path="/login">
					<LoginLayout>
						<Login />
					</LoginLayout>
				</Route>
				<Route exact path="/logout">
					<LoginLayout>
						<Logout />
					</LoginLayout>
				</Route>
				<Route path="/search">
					<Layout>
						<SearchPage />
					</Layout>
				</Route>
				<Route exact path="/register">
					<LoginLayout>
						<Register />
					</LoginLayout>
				</Route>
				<Route path="/add-account">
					<Layout>
						<AddAccount />
					</Layout>
				</Route>
			</Switch>
		</Suspense>
    </Router>
  );
}

export default App;
