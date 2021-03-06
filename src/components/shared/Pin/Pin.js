import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import pinShape from '../../../helpers/propz/pinShape';

class Pin extends React.Component {
  static propTypes = {
    pin: pinShape.pinShape,
    deletePin: PropTypes.func,
  }

  deletePinEvent = (e) => {
    e.preventDefault();
    const { deletePin, pin } = this.props;
    deletePin(pin.id);
  }

  render() {
    const { pin } = this.props;
    return (
      <div className="Pin">
        <div className="card">
        <img src={pin.imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h3 className="card-title">{pin.title}</h3>
            <button className="btn btn-danger" onClick={this.deletePinEvent}>X</button>
            <Link className="btn btn-warning" to={`/board/${pin.boardId}/pin/${pin.id}/edit`}>Edit Pin</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Pin;
