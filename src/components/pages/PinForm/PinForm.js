import React from 'react';
import authData from '../../../helpers/data/authData';
import pinData from '../../../helpers/data/pinData';

class PinForm extends React.Component {
  state = {
    pinImageUrl: '',
    pinTitle: '',
  }

  titleChange = (e) => {
    e.preventDefault();
    this.setState({ pinTitle: e.target.value });
  }

  imageChange = (e) => {
    e.preventDefault();
    this.setState({ pinImageUrl: e.target.value });
  }

  savePinEvent = (e) => {
    e.preventDefault();
    // boardId from params. Need to go one more deeper bacause within params there is object called boardId
    const { boardId } = this.props.match.params;
    // firebase will create id
    const newPin = {
      imageUrl: this.state.pinImageUrl,
      title: this.state.pinTitle,
      uid: authData.getUid(),
      boardId,
    };
    // // double check to make sure getting correct data
    // console.log('new pin', newPin);
    pinData.savePin(newPin)
    // this gets the url of where you are trying to go
      .then(() => this.props.history.push(`/board/${boardId}`))
      .catch((error) => console.error(error));
  }

  render() {
    const { pinImageUrl, pinTitle } = this.state;
    return (
      <form className="PinForm">
        <div className="form-group">
          <label htmlFor="pin-title">Pin Title</label>
          <input
            type="text"
            className="form-control"
            // id need to match label's htmlFor
            id="pin-title"
            placeholder="Enter pin title"
            value={pinTitle}
            onChange={this.titleChange}
           />
        </div>
        <div className="form-group">
          <label htmlFor="pin-image-url">Pin Image URL</label>
          <input
            type="text"
            className="form-control"
            id="pin-image-url"
            placeholder="Enter image url"
            value={pinImageUrl}
            onChange={this.imageChange}
          />
        </div>
        <button className="btn btn-success" onClick={this.savePinEvent}>Save Pin</button>
      </form>
    );
  }
}

export default PinForm;
