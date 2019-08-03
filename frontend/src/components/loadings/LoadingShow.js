import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleData, setActiveTab } from '../../action'
import Table from '../elements/Table';

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
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        loading: state.loadingsData.loading
    }
}

export default connect(mapStateToProps, { fetchSingleData, setActiveTab })(LoadingShow);