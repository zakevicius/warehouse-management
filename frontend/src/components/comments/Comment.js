import React from 'react';

const Comment = ({ comment, user, removeComment }) => {
  return (
    <div
      style={{
        display: 'inline-block',
        width: '100%',
        textAlign: 'left',
        padding: '0',
        margin: '0'
      }}
      className="comment"
    >
      <i className="minus icon red" onClick={() => removeComment(comment.id)}></i>
      {comment.text}
      <span
        style={{
          float: 'right',
          color: 'grey',
          textAlign: 'right',
          padding: '0',
          margin: '0'
        }}
      >
        <i>- by {user}</i>
      </span>
    </div>
  )
};

export default Comment;