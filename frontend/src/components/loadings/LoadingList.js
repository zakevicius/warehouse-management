import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData, setActiveTab } from '../../action';
import Table from '../elements/Table';

class LoadingdList extends Component {
  componentDidMount() {
    this.props.setActiveTab('loadings');
    this.props.fetchData('/loadings');
  }

  render() {
    return (
      <Table type="loadings" loadings={this.props.loadings} />
    )
  }
}

const mapStateToProps = state => {
  return {
    loadings: state.loadingsData
  };
};

export default connect(mapStateToProps, { setActiveTab, fetchData })(LoadingdList);
