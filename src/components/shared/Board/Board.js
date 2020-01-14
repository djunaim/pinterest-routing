import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Board.scss';

import boardShape from '../../../helpers/propz/boardShape';

class Board extends React.Component {
  static propTypes = {
    board: boardShape.boardShape,
    deleteBoard: PropTypes.func,
  }

  deleteBoardEvent = (e) => {
    e.preventDefault();
    const { deleteBoard, board } = this.props;
    deleteBoard(board.id);
  }

  render() {
    const { board } = this.props;
    return (
      <div className="Board col-md-4">
        <div className="card">
          <div className="card-body">
            <button className="btn btn-danger" onClick={this.deleteBoardEvent}>X</button>
            <Link className="btn btn-warning" to={`/board/${board.id}/edit`}>Edit</Link>
            <h3 className="card-title">{board.name}</h3>
            <p className="card-text">{board.description}</p>
            {/* need a Link styles like a button so it can take to single board view */}
            <Link className="btn btn-primary" to={`/board/${board.id}`}>View Board</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
