import React from 'react';
import './SingleBoard.scss';

class SingleBoard extends React.Component {
  render() {
    const { boardId } = this.props.match.params;
    return (
      <div className="SingleBoard">
        <h1>Single Board Page</h1>
        <h2>Current boardId is {boardId}</h2>
      </div>
    );
  }
}

export default SingleBoard;
