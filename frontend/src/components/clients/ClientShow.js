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

    // componentDidUpdate() {
    //     this.render();
    // }

    render() {
        if (!this.props.client) {
            return <div>Loading</div>
        }
        return (
            <div>
                <Table type="client" client={this.props.client} />
                <OrderList
                    ordersToShow={this.props.client}
                    page={this.props.match ? this.props.match.params.no : null}
                />
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