import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSingleData, setActiveTab } from '../../action'
import Table from '../elements/Table';
import OrderList from '../orders/OrderList';

class ClientShow extends Component {
    componentDidMount() {
        this.props.fetchSingleData('/clients', this.props.match.params.id);
        this.props.setActiveTab('clients');
    }

    componentDidUpdate() {
        this.render();
    }

    render() {
        return (
            <div>
                <Table type="client" client={this.props.client} />
                <OrderList ordersToShow={this.props.client} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        client: state.clientsData.client,
    };
};

export default connect(mapStateToProps, { fetchSingleData, setActiveTab })(ClientShow);