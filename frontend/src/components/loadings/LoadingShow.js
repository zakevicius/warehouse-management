import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleData, setActiveTab } from '../../action'
import Table from '../elements/Table';
import Spinner from '../elements/Spinner';
import Error from '../elements/Error';
import LoadingOrderList from './LoadingOrderList';
import LoadingStatus from './LoadingStatus';

class LoadingShow extends Component {

  componentDidMount() {
    this.props.fetchSingleData('/loadings', this.props.match.params.id);
    this.props.setActiveTab('loadings');
  }

  render() {
    if (this.props.load || !this.props.loading) return <Spinner />;
    return (
      <div>
        <Table type="loading" loading={this.props.loading} />
        <LoadingStatus loading={this.props.loading} />
        {this.props.error && <Error error={this.props.error} />}
        <LoadingOrderList orders={this.props.loading.orders} />
      </div>
    );
  }
};

const mapStateToProps = state => {
  return {
    loading: state.loadingsData.loading,
    error: state.loadingsData.error,
    load: state.eventsData.load
  }
}

export default connect(mapStateToProps, { fetchSingleData, setActiveTab })(LoadingShow);