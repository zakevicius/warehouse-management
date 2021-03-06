import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateData, fetchSingleData, clearError, setActiveTab } from '../../action';
import Button from '../elements/Button';
import Error from '../elements/Error';

class ClientEdit extends Component {
    state = {
        orderLetter: '',
        name: '',
        email: '',
        phone: ''
    }

    componentWillMount() {
        this.props.clearError('/clients');
    }

    componentDidMount() {
        this.props.setActiveTab('primary', 'clients');
        if (!this.props.client) {
            this.props.fetchSingleData('/clients', this.props.match.params.id);
        }
        const { orderLetter, name, email, phone } = this.props.client;
        this.setState({
            orderLetter,
            name,
            email,
            email1: email[0],
            email2: email[1],
            email3: email[2],
            phone
        });
    } z

    onChange = e => {
        let emailFields = ['email1', 'email2', 'email3'];
        let emails = [...this.state.email]
        if (emailFields.indexOf(e.target.name) >= 0) {
            emails[emailFields.indexOf(e.target.name)] = e.target.value;
            this.setState({
                ...this.state,
                email: emails
            });
        } else {
            this.setState({
                ...this.state,
                [e.target.name]: e.target.value
            });
        }
    }

    onSubmit = e => {
        this.props.clearError('/clients')
        e.preventDefault();
        this.props.updateData(`/clients`, this.state, this.props.match.params.id);
    }

    render() {
        return (
            <div className="ui container">
                <div className="ui very padded segment">
                    <form onSubmit={this.onSubmit} className="ui form">
                        <div className="three fields">
                            <div className="field">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" value={this.state.name} onChange={this.onChange} />
                            </div>
                            <div className="field">
                                <label htmlFor="orderLetter">Letter for orders</label>
                                <input type="text" name="orderLetter" value={this.state.orderLetter} onChange={this.onChange} />
                            </div>
                            <div className="field">
                                <label htmlFor="phone">Phone</label>
                                <input type="text" name="phone" value={this.state.phone} onChange={this.onChange} />
                            </div>
                        </div>
                        <div className="three fields">
                            <div className="field">
                                <label htmlFor="email1">Email 1</label>
                                <input type="email" name="email1" value={this.state.email[0]} onChange={this.onChange} />
                            </div>
                            <div className="field">
                                <label htmlFor="email2">Email 2</label>
                                <input type="email" name="email2" value={this.state.email[1]} onChange={this.onChange} />
                            </div>
                            <div className="field">
                                <label htmlFor="email3">Email 3</label>
                                <input type="email" name="email3" value={this.state.email[2]} onChange={this.onChange} />
                            </div>
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
        client: state.clientsData.client.data,
        error: state.clientsData.error
    }
}

export default connect(mapStateToProps,
    {
        updateData,
        fetchSingleData,
        clearError,
        setActiveTab
    })(ClientEdit);