import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';
import 'firebase/auth';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool,
  }

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  }

  render() {
    const { authed } = this.props;
    // have to have li wrapped in ul because return can't return more than 1 sibling
    const buildNavbar = () => {
      if (authed) {
        return (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Boards</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/board/new">New Board</Link>
            </li>
            <li className="nav-item">
              {/* need to make logout button instead of link because executing a function and if it was a Link it would an a tag and it would try to navigate somewhere */}
              <button className="nav-link btn btn-danger" onClick={this.logMeOut} >Log Out</button>
            </li>
          </ul>
        );
      }

      return (<ul className="navbar-nav ml-auto"></ul>);
    };

    return (
      <div className="MyNavbar">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">Pinterest</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* function below will check property of auth */}
            { buildNavbar() }
          </div>
        </nav>
      </div>
    );
  }
}

export default MyNavbar;
