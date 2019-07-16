import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData, setActiveTab } from '../../action';

class LoadingdList extends Component {
  componentDidMount() {
    this.props.setActiveTab('loadings');
  }

  render() {
    return (
      <div>
        Loading List
      </div>
    )
  }
}

export default connect(null, { setActiveTab })(LoadingdList);
