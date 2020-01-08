import React from 'react';

import pinShape from '../../../helpers/propz/pinShape';

class Pin extends React.Component {
  static propTypes = {
    pin: pinShape.pinShape,
  }

  render() {
    const { pin } = this.props;
    return (
      <div className="Pin">
        <div className="card">
        <img src={pin.imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h3 className="card-title">{pin.title}</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default Pin;
