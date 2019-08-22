import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchData, setActiveTab } from '../../action';
import Table from '../elements/Table';
import Spinner from '../elements/Spinner';

class LoadingdList extends Component {
  componentDidMount() {
    this.props.setActiveTab('loadings');
    this.props.fetchData('/loadings');
  }

  render() {
    if (this.props.load) return <Spinner />;
    return (
      <Table
        type="loadings"
        loadings={this.props.loadings}
        page={this.props.match ? this.props.match.params.no : null}
        url={this.props.url ? this.props.url : '/loadings/'}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    loadings: state.loadingsData,
    load: state.eventsData.load
  };
};

export default connect(mapStateToProps, { setActiveTab, fetchData })(LoadingdList);
