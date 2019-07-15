import React from 'react';
import { connect } from 'react-redux';
import { fetchNewId, createData } from '../../action';

class ClientCreate extends React.Component {
    // componentWillMount() {
    //     this.props.fetchNewId();
    // }

    handleForm = e => {
        e.preventDefault();
        this.props.createData('/clients');
    };

    renderResponse() {
        if (!this.props.response) {
            return null;
        }
        return (
            <div className="ui form success">
                <div className="ui success message six wide field">
                    <p>{this.props.response}</p>
                </div>
            </div>
        );

    }

    render() {
        return (
            <div className="ui container">
                <form className="ui form">
                    <h4 className="ui dividing header">New Client</h4>
                    <div className="six wide field">
                        <label>First Name</label>
                        <input type="text" name="first-name" autoComplete="off" />
                    </div>
                    <div className="six wide field">
                        <label>Last Name</label>
                        <input type="text" name="last-name" autoComplete="off" />
                    </div>
                    <div className="six wide field">
                        <label>Phone</label>
                        <input type="text" name="phone" autoComplete="off" />
                    </div>
                    <div className="six wide field">
                        <label>Email</label>
                        <input type="email" name="email" autoComplete="off" />
                    </div>
                    <button onClick={this.handleForm} className="ui button" type="submit">Submit</button>
                    {this.renderResponse()}
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        response: state.responses.apiResponse
    };
}

export default connect(mapStateToProps, { createData })(ClientCreate);