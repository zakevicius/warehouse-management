import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createData, fetchData, fetchSingleData, fetchNewID, clearError, setActiveTab } from '../../action';
import LoadingOrderListCreate from './LoadingOrderListCreate';
import Button from '../elements/Button';
import Spinner from '../elements/Spinner';
import Error from '../elements/Error';

class LoadingCreate extends Component {
    state = {
        loadingID: '',
        truck: '',
        trailer: '',
        ordersList: [],
        clientID: '',
        client: 'Select a client',
        date: new Date().toISOString(),
        ordersToLoad: [],
        driverPhone: '',
        commentsOnLoading: ''
    }

    componentWillMount() {
        this.props.clearError('/loadings');
    }

    componentDidMount() {
        this.props.setActiveTab('primary', 'loadings');
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
            await this.props.fetchNewID(client._id, '/loadings')
                .then((response) => {
                    const newID = `LD-${letter}${this.props.id}`;
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
                    const availableOrders = this.props.client.orders.filter(order => (order.status === 'in' || order.status === 'waiting') & !order.loadingID);
                    this.setState({
                        ordersList: [
                            ...this.state.ordersList,
                            ...availableOrders
                        ]
                    });
                })
                .catch((error) => console.log(error));
        }
    };

    renderOrderLists() {
        if (this.props.load) return <Spinner />;

        if (this.state.client !== 'Select a client' && this.props.client) {
            return (
                <div className="ui segment">
                    <div style={{ 'display': 'flex' }}>
                        <div style={{ 'margin': '5px', 'flex': '1' }}>
                            <h4>In truck</h4>
                            <LoadingOrderListCreate
                                orders={this.state.ordersToLoad}
                                removeOrderFromLoading={this.removeOrderFromLoading}
                                action='remove'
                            />
                        </div>
                        <div style={{ 'margin': '5px', 'flex': '1' }}>
                            <h4>In warehouse</h4>
                            <LoadingOrderListCreate
                                orders={this.state.ordersList}
                                addOrderToLoading={this.addOrderToLoading}
                                action='add'
                            />
                        </div>
                    </div>
                </div>
            )
        } else {
            return null
        }
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.clearError('/loadings');
        let totalQnt = 0;
        let totalBruto = 0;
        this.state.ordersToLoad.forEach(order => {
            totalQnt += order.qnt;
            totalBruto += order.bruto;
        });
        this.props.createData('/loadings', {
            loadingID: this.state.loadingID,
            clientID: this.state.clientID,
            truck: this.state.truck,
            trailer: this.state.trailer,
            orders: this.state.ordersToLoad.map(order => order._id),
            status: 'waiting to load',
            client: this.state.client,
            totalQnt: totalQnt.toFixed(3),
            totalBruto: totalBruto.toFixed(3),
            driverPhone: this.state.driverPhone,
            commentsOnLoading: this.state.commentsOnLoading
        });
    };

    render() {
        return (
            <Fragment>
                <div className="ui container">
                    <div className="ui very padded segment">
                        <form onSubmit={this.onSubmit} className="ui form">
                            <div className="three fields">
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
                                    <label htmlFor="loadingID">ID</label>
                                    <input type="text" name="loadingID" value={this.state.loadingID} disabled />
                                </div>
                                <div className="field">
                                    <label htmlFor="date">Date</label>
                                    <input type="date" name="date" value={this.state.date.split('T')[0]} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="three fields">
                                <div className="field">
                                    <label htmlFor="truck">Truck</label>
                                    <input type="text" name="truck" value={this.state.truck} onChange={this.onChange} />
                                </div>
                                <div className="field">
                                    <label htmlFor="trailer">Trailer</label>
                                    <input type="text" name="trailer" value={this.state.trailer} onChange={this.onChange} />
                                </div>
                                <div className="field">
                                    <label htmlFor="driverPhone">Driver's phone number</label>
                                    <input type="text" name="driverPhone" value={this.state.driverPhone} onChange={this.onChange} />
                                </div>
                            </div>
                            <div className="field">
                                <label htmlFor="commentsOnLoading">Comments on loading</label>
                                <input type="text" name="commentsOnLoading" value={this.state.commentsOnLoading} onChange={this.onChange} />
                            </div>
                            {this.props.error ? <Error error={this.props.error} /> : null}
                            <Button button={{ type: 'primary ', text: 'Submit' }} />
                        </form>
                    </div>
                </div >
                {this.renderOrderLists()}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        id: state.loadingsData.newLoadingID,
        clients: state.clientsData.clients,
        client: state.clientsData.client,
        load: state.eventsData.load,
        error: state.loadingsData.error
    }
}


export default connect(mapStateToProps,
    {
        createData,
        fetchNewID,
        fetchData,
        fetchSingleData,
        clearError,
        setActiveTab
    })(LoadingCreate);