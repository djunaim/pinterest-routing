import React from 'react';
import './Home.scss';

import boardData from '../../../helpers/data/boardData';
import authData from '../../../helpers/data/authData';
import Board from '../../shared/Board/Board';

class Home extends React.Component {
  state = {
    boards: [],
  }

  // want boards to show right away on page load
  componentDidMount() {
    boardData.getBoardsByUid(authData.getUid())
      .then((boards) => {
        this.setState({ boards });
      })
      .catch((error) => console.error(error));
  }


  render() {
    const boardId = '12345';
    return (
      <div className="Home">
        <h1>Home Page</h1>
        <div className="boards d-flex flex-wrap">
          {/* mapping over boards so it will show on page */}
          {this.state.boards.map((board) => <Board key={board.id} board={board} />)}
        </div>
        {/* link creates a tag and to will be href
        <Link className="btn btn-primary" to="/board/new">Create New Board</Link>
        <Link className="btn btn-secondary" to={`/board/${boardId}`}>Single Board Page</Link> */}
      </div>
    );
  }
}

export default Home;
