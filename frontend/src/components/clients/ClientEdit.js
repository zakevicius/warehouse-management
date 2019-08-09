import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateData, fetchSingleData } from '../../action';
import Button from '../elements/Button';

class ClientEdit extends Component {
    state = {
        orderLetter: '',
        name: '',
        email: '',
        phone: ''
    }

    componentDidMount() {
        if (!this.props.client) {
            this.props.fetchSingleData('/clients', this.props.match.params.id);
        }
        const { orderLetter, name, email, phone } = this.props.client;
        this.setState({
            orderLetter,
            name,
            email,
            phone
        });
    }

    onChange = e => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        });
    }

    onSubmit = e => {
        e.preventDefault();
        this.props.updateData(`/clients`, this.state, this.props.match.params.id);
    }

    render() {
        return (
            <div className="ui container">
                <form onSubmit={this.onSubmit} className="ui form">
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" value={this.state.name} onChange={this.onChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" value={this.state.email} onChange={this.onChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="phone">Phone</label>
                        <input type="text" name="phone" value={this.state.phone} onChange={this.onChange} />
                    </div>
                    <div className="field">
                        <label htmlFor="orderLetter">Letter for orders</label>
                        <input type="text" name="orderLetter" value={this.state.orderLetter} onChange={this.onChange} />
                    </div>
                    <Button button={{ type: 'primary ', text: 'Submit' }} />
                </form>
                {this.props.errors &&
                    <div className="ui red segment" style={{ color: "#e25353" }}>
                        <i className="times icon"></i>{this.props.errors}
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        client: state.clientsData.client.data,
        errors: state.clientsData.errors
    }
}

export default connect(mapStateToProps,
    {
        updateData,
        fetchSingleData
    })(ClientEdit);