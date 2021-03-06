import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createData, fetchNewID, fetchData, clearError, setActiveTab } from '../../action';
import Button from '../elements/Button';
import Error from '../elements/Error';

class OrderCreate extends Component {
    state = {
        orderID: '',
        additionalID: '',
        date: new Date().toISOString(),
        sender: '',
        receiver: '',
        truck: '',
        trailer: '',
        qnt: '',
        bruto: '',
        description: '',
        declarations: [],
        client: 'Select a client',
        clientID: '',
        status: 'Select status',
    }

    componentWillMount() {
        this.props.clearError('/orders');
    }

    componentDidMount() {
        this.props.setActiveTab('primary', 'orders');
        this.props.fetchData('/clients');
    }

    renderClientList = () => {
        if (this.props.clients.length === 0) return null;

        return this.props.clients.map(client => (
            <option key={client._id} value={client.name}>
                {client.name}
            </option>));
    }

    onChange = async e => {
        if (e.target.name === 'declarations') {
            this.setState({
                declarations: e.target.value.split(/[\s,;.]+/)
            })
        } else if (e.target.name === 'bruto') {
            let newBruto = e.target.value.replace(',', '.');
            this.setState({
                ...this.state,
                [e.target.name]: newBruto
            });
        } else {
            this.setState({
                ...this.state,
                [e.target.name]: e.target.value
            });
        }
        if (e.target.name === 'client') {
            if (e.target.value === '') {
                this.setState({ orderID: '' })
                return null;
            }
            const client = this.props.clients.filter(client => client.name === e.target.value)[0];
            const letter = client.orderLetter;

            // Fetch new ID for new order based on client selected
            await this.props.fetchNewID(client._id, '/orders')
                .then((response) => {
                    const newID = letter + this.props.id;
                    this.setState({
                        ...this.state,
                        orderID: newID,
                        clientID: client._id
                    });
                })
                .catch((error) => console.log(error))
        }
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.createData('/orders', this.state);
    }

    render() {
        return (
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
                                <label htmlFor="orderID">ID</label>
                                <input type="text" name="orderID" value={this.state.orderID} onChange={this.onChange} />
                            </div>
                            <div className="field">
                                <label htmlFor="additionalID">Additional ID</label>
                                <input type="text" name="additionalID" value={this.state.additionalID} onChange={this.onChange} />
                            </div>
                        </div>

                        <div className="four fields">
                            <div className="field">
                                <label htmlFor="status">Status</label>
                                <select
                                    className="ui fluid dropdown"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                    required
                                >
                                    <option value=''>Select status...</option>
                                    <option value='waiting'>Waiting</option>
                                    <option value='in'>In</option>
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
                        </div>

                        <div className="four fields">
                            <div className="six wide field">
                                <label htmlFor="sender">Sender</label>
                                <input type="text" name="sender" value={this.state.sender} onChange={this.onChange} />
                            </div>
                            <div className="six wide field">
                                <label htmlFor="receiver">Receiver</label>
                                <input type="text" name="receiver" value={this.state.receiver} onChange={this.onChange} />
                            </div>

                            <div className="two wide field">
                                <label htmlFor="qnt">CLL</label>
                                <input type="text" name="qnt" value={this.state.qnt} onChange={this.onChange} />
                            </div>
                            <div className="two wide field">
                                <label htmlFor="bruto">Bruto</label>
                                <input type="text" name="bruto" value={this.state.bruto} onChange={this.onChange} />
                            </div>
                        </div>

                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <input type="text" name="description" value={this.state.description} onChange={this.onChange} />
                        </div>
                        <div className="field">
                            <label htmlFor="declarations">Declarations</label>
                            <input type="text" name="declarations" value={this.state.declarations} onChange={this.onChange} />
                        </div>
                        <Button button={{ type: 'primary ', text: 'Submit' }} />
                    </form>
                    {this.props.error && <Error error={this.props.error} />}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        id: state.ordersData.newOrderID,
        clients: state.clientsData.clients,
        error: state.ordersData.error
    }
}

export default connect(mapStateToProps,
    {
        createData,
        fetchNewID,
        fetchData,
        clearError,
        setActiveTab
    })(OrderCreate);