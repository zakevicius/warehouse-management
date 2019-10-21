import React from 'react';
import { connect } from 'react-redux';

const Comment = ({ comment, user, removeComment, signedUser }) => {
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
      <span
        style={{
          color: 'darkred'
        }}
      >
        {comment.text}
      </span>
      {/* {(user._id === signedUser._id) && */}
      {(signedUser.type === 'admin' || signedUser.type === 'super') &&
        <i className="minus icon red" style={{ float: 'right', margin: '0 1em', cursor: 'pointer' }} onClick={() => removeComment(comment.id)}></i>
      }
      <span
        style={{
          float: 'right',
          color: 'grey',
          padding: '0',
          margin: '0'
        }}
      >
        <i>- by {user.name}</i>
      </span>
    </div>
  )
};

const mapStateToProps = state => {
  return {
    signedUser: state.auth.user
  }
}

export default connect(mapStateToProps, {})(Comment);