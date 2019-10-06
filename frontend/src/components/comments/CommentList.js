import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import Comment from './Comment';
import { updateData, removeData } from '../../action';

class CommentList extends Component {
  state = {
    comment: "",
    commentsData: this.props.loading.data.commentsData
  };

  onChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.comment === "") return;

    let newData = this.state.commentsData;

    if (this.state.commentsData.filter(data => data.orderID === this.props.order._id).length > 0) {
      // newData = this.state.commentsData.filter(data => data.orderID === this.props.order._id);
      // newData[0].comments.push({ text: this.state.comment, user: this.props.user.name, id: '_' + Math.random().toString(36).substr(2, 9) });

      newData = this.state.commentsData.map(data => {
        if (data.orderID === this.props.order._id) {
          let newComments = [...data.comments, {
            text: this.state.comment,
            user: {
              name: this.props.user.name,
              _id: this.props.user._id
            },
            id: '_' + Math.random().toString(36).substr(2, 9)
          }];
          data.comments = newComments;
          return data;
        } else {
          return data;
        }
      });
    } else {
      newData.push(
        {
          orderID: this.props.order._id,
          comments: [
            {
              text: this.state.comment,
              user: {
                name: this.props.user.name,
                _id: this.props.user._id
              },
              id: '_' + Math.random().toString(36).substr(2, 9)
            }
          ]
        }
      );
    }

    this.setState({
      comment: "",
      commentsData: newData
    });

    this.props.updateData('/loadings', {
      commentsData: this.state.commentsData
    }, this.props.loading.data._id);
  };

  removeComment = (id) => {
    let comments = this.state.commentsData.filter(order => order.orderID !== this.props.order._id);            // filter other orders to keep their data
    let filteredComments = this.state.commentsData.filter(order => order.orderID === this.props.order._id);    // filter selected orders data

    filteredComments[0].comments = filteredComments[0].comments.filter(comment => comment.id !== id);          // discard removed comment
    comments = [...comments, ...filteredComments];                                                             // set commets by combining other orders' comments with, filtered selected order's comments

    this.setState({
      comment: "",
      commentsData: comments
    });

    this.props.updateData('/loadings', {
      commentsData: this.state.commentsData
    }, this.props.loading.data._id);
  }

  renderComments() {
    const comments = this.state.commentsData.filter(data => data.orderID === this.props.order._id);

    if (comments.length > 0) {
      return comments.map(order => (
        order.comments.map(comment => (
          <Comment
            key={comment.id}
            comment={comment}
            user={comment.user}
            removeComment={this.removeComment}
          />
        ))
      ))
    }
  }

  render() {
    return (
      <Fragment>
        {this.renderComments()}
        <form onSubmit={this.onSubmit} className="left aligned">
          <div className="ui input">
            <input
              type="text"
              name="comment"
              value={this.state.comment}
              onChange={this.onChange}
              placeholder="Enter comment"
            />
          </div>
        </form>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    loading: state.loadingsData.loading
  }
}

export default connect(mapStateToProps, { updateData, removeData })(CommentList);