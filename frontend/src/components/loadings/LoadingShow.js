import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleData, setActiveTab, unsetLoading } from '../../action'
import Table from '../elements/Table';
import LoadingOrderList from './LoadingOrderList';

class LoadingShow extends Component {

    componentDidMount() {
        this.props.fetchSingleData('/loadings', this.props.match.params.id);
        this.props.setActiveTab('loadings');
    }

    render() {
        if (!this.props.loading) {
            return <div>Loading</div>
        }
        return (
            <div>
                <Table type="loading" loading={this.props.loading} />
                <LoadingOrderList orders={this.props.loading.orders} />
            </div>
        );
    }
};

const mapStateToProps = state => {
    console.log(state.eventsData.load)
    return {

        loading: state.loadingsData.loading
    }
}

export default connect(mapStateToProps, { fetchSingleData, setActiveTab, unsetLoading })(LoadingShow);