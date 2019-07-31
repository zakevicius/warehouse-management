import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setActiveTab } from '../action';

class Home extends Component {
    componentDidMount() {
        this.props.setActiveTab('home');
    }

    render() {
        return (
            <div>
                Home page
            </div>
        );
    }
}

export default connect(null, { setActiveTab })(Home);