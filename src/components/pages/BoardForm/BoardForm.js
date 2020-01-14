import React from 'react';
import './BoardForm.scss';
import authData from '../../../helpers/data/authData';
import boardData from '../../../helpers/data/boardData';

class BoardForm extends React.Component {
  // only need name and description since ID created from firebase and UID taken from axios calls
  state = {
    boardName: '',
    boardDescription: '',
  }

  // need to run componentdidmount so can run on page load. Have if statement to check param
  componentDidMount() {
    const { boardId } = this.props.match.params;
    if (boardId) {
      boardData.getSingleBoard(boardId)
        .then((response) => {
          this.setState({ boardName: response.data.name, boardDescription: response.data.description });
        })
        .catch((error) => console.error(error));
    }
  }

  // can check this by looking at state of boardName within BoardForm
  nameChange = (e) => {
    e.preventDefault();
    this.setState({ boardName: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ boardDescription: e.target.value });
  }

  saveBoardEvent = (e) => {
    e.preventDefault();
    // firebase will create id
    const newBoard = {
      name: this.state.boardName,
      description: this.state.boardDescription,
      uid: authData.getUid(),
    };
    // // double check to make sure getting correct data
    // console.log('new board', newBoard);
    boardData.saveBoard(newBoard)
    // this gets the url of where you are trying to go
      .then(() => this.props.history.push('/'))
      .catch((error) => console.error(error));
  }

  editBoardEvent = (e) => {
    e.preventDefault();
    const { boardId } = this.props.match.params;
    const editBoard = {
      name: this.state.boardName,
      description: this.state.boardDescription,
      uid: authData.getUid(),
    };
    boardData.updateBoard(boardId, editBoard)
      .then(() => this.props.history.push('/'))
      .catch((error) => console.error(error));
  }

  render() {
    const { boardId } = this.props.match.params;
    const { boardName, boardDescription } = this.state;
    return (
      <form className="BoardForm">
        <div className="form-group">
          <label htmlFor="board-name">Board Name</label>
          <input
            type="text"
            className="form-control"
            // id need to match label's htmlFor
            id="board-name"
            placeholder="Enter board name"
            value={boardName}
            onChange={this.nameChange}
           />
        </div>
        <div className="form-group">
          <label htmlFor="board-description">Board Description</label>
          <input
            type="text"
            className="form-control"
            id="board-description"
            placeholder="Enter board description"
            value={boardDescription}
            onChange={this.descriptionChange}
          />
        </div>
        {/* if there is no boardID, will show save board button. If there is boardId, will show edit board button */}
        {
          (!boardId) ? (<button className="btn btn-primary" onClick={this.saveBoardEvent}>Save Board</button>)
            : (<button className="btn btn-primary" onClick={this.editBoardEvent}>Edit Board</button>)
        }
      </form>
    );
  }
}

export default BoardForm;
