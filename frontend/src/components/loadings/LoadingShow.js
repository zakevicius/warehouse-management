import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleData, setActiveTab, clearError, fetchData } from '../../action'
import Table from '../elements/Table';
import Spinner from '../elements/Spinner';
import Error from '../elements/Error';
import LoadingOrderList from './LoadingOrderList';
import LoadingStatus from './LoadingStatus';
import FileList from '../files/FileList';
import FileUpload from '../files/FileUpload';

class LoadingShow extends Component {

  async componentDidMount() {
    this.props.setActiveTab('primary', 'loadings');
    this.props.clearError('/loadings');
    await this.props.fetchSingleData('/loadings', this.props.match.params.id);
    await this.props.fetchData('/files', this.props.match.params.id);
  }

  render() {
    if (this.props.load || !this.props.loading) return <Spinner />;
    return (
      <div>
        <Table type="loading" loading={this.props.loading} />
        <LoadingStatus loading={this.props.loading} />
        {this.props.error && <Error error={this.props.error} />}
        <FileList id={this.props.loading._id} type="showFiles" typeOfData="loading" />
        <FileUpload id={this.props.loading._id} typeOfData="loading" />
        <LoadingOrderList loading={this.props.loading} orders={this.props.loading.orders} />
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

export default connect(mapStateToProps, { fetchSingleData, fetchData, setActiveTab, clearError })(LoadingShow);