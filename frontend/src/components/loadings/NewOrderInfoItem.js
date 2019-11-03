import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { updateData } from '../../action';

class NewOrderInfoItem extends Component {
  state = {
    finalQnt: this.props.order.finalQnt,
    finalBruto: this.props.order.finalBruto
  };

  onChange = (e) => {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.finalQnt === '') {
      this.props.onSubmit(e, { finalQnt: 0, finalBruto: this.state.finalBruto });
    } else if (this.state.finalBruto === '') {
      this.props.onSubmit(e, { finalQnt: this.state.finalQnt, finalBruto: 0 });
    } else {
      this.props.onSubmit(e, this.state);
    }
  }

  renderCll = () => {
    return (
      <form onSubmit={this.onSubmit} className="left aligned">
        <div className="ui input" style={{ 'width': '100%' }}>
          <input
            type="number"
            step='0.001'
            name="finalQnt"
            value={this.state.finalQnt}
            onChange={this.onChange}
            placeholder="cll"
            style={{ 'width': 'inherit', 'textAlign': 'center' }}
          />
        </div>
      </form>
    )
  }

  renderBruto = () => {
    return (
      <form onSubmit={this.onSubmit} className="left aligned">
        <div className="ui input" style={{ 'width': '100%' }}>
          <input
            type="number"
            step='0.001'
            name="finalBruto"
            value={this.state.finalBruto}
            onChange={this.onChange}
            placeholder="bruto"
            style={{ 'width': 'inherit', 'textAlign': 'center' }}
          />
        </div>
      </form>
    )
  }

  render() {
    return (
      <Fragment>
        {this.props.type === 'cll' ? this.renderCll() : this.renderBruto()}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user
  }
}

export default connect(mapStateToProps, { updateData })(NewOrderInfoItem);