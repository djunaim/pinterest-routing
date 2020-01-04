import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import './App.scss';

import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import NewBoard from '../components/pages/NewBoard/NewBoard';
import SingleBoard from '../components/pages/SingleBoard/SingleBoard';

// this is auth route. Function takes in component, authed, and whatever else put in the line. This function is returning a route and will do route making. Function will render props. If auth false, load auth component. The only thing will need to change is pathname routes
const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true ? <Component {...props} {...rest}/> : <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />);
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

// auth will still ive in app in routing
class App extends React.Component {
  state = {
    authed: true,
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
          <Switch>
            {/* go to path that is the exact match, and go to component of Home, NewBoard, Auth, etc.. */}
            {/* privateroutes need to check if user is authenticated. Need to pass authed */}
            {/* the following has created 3 applications in 1 project */}
            <PrivateRoute path="/" exact component={Home} authed={authed} />
            <PrivateRoute path="/board/new" exact component={NewBoard} authed={authed} />
            <PublicRoute path="/auth" exact component={Auth} authed={authed} />
            <PrivateRoute path="/ooard/:boardId" exact component={SingleBoard} authed={authed} />
            {/* if want to see single pin: <PrivateRoute path="/board/:boardid/pin/:pindId" /> */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
