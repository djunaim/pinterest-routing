import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConnection from '../helpers/data/connection';
import './App.scss';

import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import BoardForm from '../components/pages/BoardForm/BoardForm';
import SingleBoard from '../components/pages/SingleBoard/SingleBoard';

import MyNavbar from '../components/shared/MyNavbar/MyNavbar';

// this is auth route. Function takes in component, authed, and whatever else put in the line. This function is returning a route and will do route making. Function will render props. If auth false, load auth component. The only thing will need to change is pathname routes
const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

// initialize firebase
firebaseConnection();

// auth will still ive in app in routing
class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  // will remove event listener from componentDidMount
  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    // within return is all routes we're going to have
    // Public route is unauthenticated. Private routes are authenticated.
    // react router dom will do all the logic for the switch
    // Switch statement checks path on browswer and based on that, what needs to be loaded
    return (
      <div className="App">
        <Router>
          <MyNavbar authed={authed} />
          <Switch>
            {/* go to path that is the exact match, and go to component of Home, NewBoard, Auth, etc.. */}
            {/* privateroutes need to check if user is authenticated. Need to pass authed */}
            {/* the following has created 3 applications in 1 project */}
            <PrivateRoute path="/" exact component={Home} authed={authed} />
            <PrivateRoute path="/board/new" exact component={BoardForm} authed={authed} />
            <PublicRoute path="/auth" exact component={Auth} authed={authed} />
            <PrivateRoute path="/board/:boardId" exact component={SingleBoard} authed={authed} />
            {/* if want to see single pin: <PrivateRoute path="/board/:boardid/pin/:pindId" /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
