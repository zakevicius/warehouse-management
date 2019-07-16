import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setActiveTab } from '../action';

const Header = (props) => {
    return (
        <div className="ui inverted vertical masthead center aligned segment">
            <div className="ui container">
                <div className="ui large secondary inverted pointing menu">
                    <Link onClick={() => props.setActiveTab('home')} to="/" className={props.active === "orders" ? "active item" : "item"}>Home</Link>
                    <Link onClick={() => props.setActiveTab('clients')} to="/clients" className={props.active === "clients" ? "active item" : "item"}>Clients</Link>
                    <Link onClick={() => props.setActiveTab('loadings')} to="/loadings" className={props.active === "loadings" ? "active item" : "item"}>Loadings</Link>
                    <div className="right item">
                        <Link to="/login" className="ui inverted button">Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        active: state.eventsData.activeTab
    }
}

export default connect(mapStateToProps, { setActiveTab })(Header);