import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Home extends Component {


    render() {
        return (
            <div className="ui container p-2">
                <div className="ui padded segment">
                    <Link to="/orders/page/1" style={{ cursor: "pointer" }}>Orders</Link>
                </div>
                <div className="ui padded segment">
                    <Link to="/clients/page/1" style={{ cursor: "pointer" }}>Clients</Link>
                </div>
                <div className="ui padded segment">
                    <Link to="/loadings/page/1" style={{ cursor: "pointer" }}>Loadings</Link>
                </div>
            </div>
        );
    }
}

export default Home;

