import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { history } from './history';

import Home from './Home';
import OrderList from './orders/OrderList';
import OrderShow from './orders/OrderShow';
import OrderCreate from './orders/OrderCreate';
import OrderEdit from './orders/OrderEdit';
import OrderDelete from './orders/OrderDelete';
import ClientList from './clients/ClientList';
import ClientShow from './clients/ClientShow';
import ClientCreate from './clients/ClientCreate';
// import ClientEdit from './clients/ClientEdit';
// import ClientDelete from './clients/ClientDelete';
import LoadingList from './loadings/LoadingList';
import Header from './Header';
import Footer from './Footer';

class App extends React.Component {

    render() {
        return (
            <div>
                <Router history={history}>
                    <div>
                        <Header handleClick={this.handleClick} />
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/orders" exact component={OrderList} />
                            <Route path="/orders/page/:no" exact component={OrderList} />
                            <Route path="/clients" exact component={ClientList} />
                            <Route path="/clients/page/:no" exact component={ClientList} />
                            <Route path="/clients/new" exact component={ClientCreate} />
                            <Route path="/clients/:id" exact component={ClientShow} />
                            <Route path="/orders/new" exact component={OrderCreate} />
                            <Route path="/orders/edit/:id" exact component={OrderEdit} />
                            <Route path="/orders/delete/:id" exact component={OrderDelete} />
                            <Route path="/orders/:id" exact component={OrderShow} />
                            <Route path="/loadings" exact component={LoadingList} />
                            <Route path="/loadings/page/:no" exact component={LoadingList} />
                        </Switch>
                        <Footer />
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;