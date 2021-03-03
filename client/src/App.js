import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import { AnimatePresence } from "framer-motion";
import AddAccount from "./AddAccount";
import Me from "./Me";
import SearchPage from "./SearchPage";
import SetupAccount from "./SetupAccount";
import Profile from "./Profile";
import Layout from "./Layout";
import Home from "./Home";
import EditProfile from "./EditProfile";
import Page from "./Components/Page";
import LogoutPage from "./Pages/LogoutPage";
import AboutPage from "./Pages/AboutPage";

function Routes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Switch location={location} key={location.pathname}>
        <Route exact path="/">
          <Page>
            <AboutPage />
          </Page>
        </Route>
        <Route exact path="/login">
          <Page>
            <LoginPage />
          </Page>
        </Route>
        <Route exact path="/signup">
          <Page>
            <SignUpPage />
          </Page>
        </Route>
        <Route exact path="/logout">
          <Page>
            <LogoutPage />
          </Page>
        </Route>
        <Route exact path="/feed">
          <Page>
            <Layout>
              <Home />
            </Layout>
          </Page>
        </Route>
        <Route exact path="/me">
          <Page>
            <Layout>
              <Me />
            </Layout>
          </Page>
        </Route>
        <Route exact path="/edit-profile">
          <Page>
            <Layout>
              <EditProfile />
            </Layout>
          </Page>
        </Route>
        <Route exact path="/setup-account">
          <Page>
            <Layout>
              <SetupAccount />
            </Layout>
          </Page>
        </Route>
        <Route
          exact
          path="/profile/:username"
          render={(props) => (
            <Page>
              <Layout>
                <Profile {...props} />
              </Layout>
            </Page>
          )}
        />
        <Route path="/search">
          <Page>
            <Layout>
              <SearchPage />
            </Layout>
          </Page>
        </Route>
        <Route path="/add-account">
          <Page>
            <Layout>
              <AddAccount />
            </Layout>
          </Page>
        </Route>
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
