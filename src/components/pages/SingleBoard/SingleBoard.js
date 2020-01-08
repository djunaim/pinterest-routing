import React from 'react';
import './SingleBoard.scss';
import boardData from '../../../helpers/data/boardData';
import pinData from '../../../helpers/data/pinData';
import Pin from '../../shared/Pin/Pin';

class SingleBoard extends React.Component {
  // board is an object because it is a single board. So only need single information. There are multiple pins to a board so need to have it in an array of objects so can work with it
  state = {
    board: {},
    pins: [],
  }

  getPinData = (boardId) => {
    pinData.getPinsByBoardId(boardId)
      .then((pins) => {
        this.setState({ pins });
      })
      .catch((error) => console.error(error));
  }

  // need component did mount because with routing it will load the page again like new
  componentDidMount() {
    // below gets boardId from url (the route)
    const { boardId } = this.props.match.params;
    boardData.getSingleBoard(boardId)
    // it is a response within then because getSingleBoard function is just getting an object back. Just getting description, name, and uid. Just getting information back
      .then((response) => {
        this.setState({ board: response.data });
        this.getPinData(boardId);
      })
      .catch((error) => console.error(error));
  }

  render() {
    const { board } = this.state;
    return (
      <div className="SingleBoard">
        <h1>{board.name}</h1>
        <h4>{board.description}</h4>
        <div className="pins d-flex flex-wrap">
          {this.state.pins.map((pin) => <Pin key={pin.id} pin={pin}/>)}
        </div>
      </div>
    );
  }
}

export default SingleBoard;
