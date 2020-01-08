import React from 'react';
import './Board.scss';

import boardShape from '../../../helpers/propz/boardShape';

class Board extends React.Component {
  static propTypes = {
    board: boardShape.boardShape,
  }

  render() {
    const { board } = this.props;
    return (
      <div className="Board col-md-4">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title">{board.name}</h3>
            <p className="card-text">{board.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
