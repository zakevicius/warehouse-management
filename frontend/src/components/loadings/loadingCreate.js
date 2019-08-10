import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createData, fetchData, fetchSingleData, fetchNewID } from '../../action';
import LoadingOrderListCreate from './LoadingOrderListCreate';
import Button from '../elements/Button';

class LoadingCreate extends Component {
    state = {
        loadingID: '',
        truck: '',
        trailer: '',
        ordersList: [],
        clientID: '',
        client: 'Select a client',
        date: new Date().toISOString(),
        ordersToLoad: []
    }

    componentDidMount() {
        this.props.fetchData('/clients');
    }

    addOrderToLoading = (order) => {
        this.setState({
            ...this.state,
            ordersToLoad: [
                ...this.state.ordersToLoad,
                ...this.state.ordersList.filter(item => item._id === order)
            ],
            ordersList: this.state.ordersList.filter(item => item._id !== order)
        });
    };

    removeOrderFromLoading = (order) => {
        this.setState({
            ...this.state,
            ordersToLoad: this.state.ordersToLoad.filter(item => item._id !== order),
            ordersList: [
                ...this.state.ordersList,
                ...this.state.ordersToLoad.filter(item => item._id === order)
            ]
        });
    };

    renderClientList = () => {
        if (this.props.clients.length === 0) return null;

        return this.props.clients.map(client => (
            <option key={client._id} value={client.name}>
                {client.name}
            </option>));
    };

    onChange = async e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
        if (e.target.name === 'client') {
            if (e.target.value === '') {
                this.setState(
                    {
                        loadingID: '',
                    }
                )
                return null;
            }
            this.setState(
                {
                    ordersToLoad: [],
                    ordersList: []
                }
            )
            const client = this.props.clients.filter(client => client.name === e.target.value)[0];
            const letter = client.orderLetter;
            // Fetch new ID for new order based on client selected
            await this.props.fetchNewID(client._id)
                .then((response) => {
                    const newID = `LOAD-${letter}${this.props.id}`;
                    this.setState({
                        ...this.state,
                        loadingID: newID,
                        clientID: client._id
                    });
                })
                .catch((error) => console.log(error));

            // get orders for selected client
            await this.props.fetchSingleData('/clients', client._id)
                .then(() => {
                    this.setState({
                        ordersList: [
                            ...this.state.ordersList,
                            ...this.props.client.orders
                        ]
                    });
                })
                .catch((error) => console.log(error));
        }
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.createData('/loadings', {
            loadingID: this.state.loadingID,
            clientID: this.state.clientID,
            truck: this.state.truck,
            trailer: this.state.trailer,
            orders: this.state.ordersToLoad.map(order => order._id),
            status: 'waiting'
        });
    };

    render() {
        return (
            <div className="ui container">
                <form onSubmit={this.onSubmit} className="ui form">
                    <div className="field">
                        <label htmlFor="loadingID">ID</label>
                        <input type="text" name="loadingID" value={this.state.loadingID} disabled />
                    </div>
                    <div className="field">
                        <label htmlFor="client">Client</label>
                        <select
                            className="ui fluid dropdown"
                            name="client"
                            value={this.state.client}
                            onChange={this.onChange}
                            required
                        >
                            <option value=''>Select a client...</option>
                            {this.renderClientList()}
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor="date">Date</label>
                        <input type="date" name="date" value={this.state.date.split('T')[0]} onChange={this.onChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="truck">Truck</label>
                        <input type="text" name="truck" value={this.state.truck} onChange={this.onChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="trailer">Trailer</label>
                        <input type="text" name="trailer" value={this.state.trailer} onChange={this.onChange} />
                    </div>
                    <Button button={{ type: 'primary ', text: 'Submit' }} />
                </form>
                {(this.state.client !== 'Select a client' && this.props.client) ? (
                    <div className="ui container">
                        <div className="ui segment">
                            <LoadingOrderListCreate
                                orders={this.state.ordersToLoad}
                                removeOrderFromLoading={this.removeOrderFromLoading}
                                action='remove'
                            />
                        </div>
                        <div className="ui segment">
                            <LoadingOrderListCreate
                                orders={this.state.ordersList}
                                addOrderToLoading={this.addOrderToLoading}
                                action='add'
                            />
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        id: state.loadingsData.newLoadingID,
        clients: state.clientsData.clients,
        client: state.clientsData.client
    }
}


export default connect(mapStateToProps,
    {
        createData,
        fetchNewID,
        fetchData,
        fetchSingleData
    })(LoadingCreate);