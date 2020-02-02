import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchSingleData, fetchData, setActiveTab } from "../../action";
import Table from "../elements/Table";
import Spinner from "../elements/Spinner";
import FileList from '../files/FileList';
import FileUpload from '../files/FileUpload'

class OrderShow extends Component {
  async componentDidMount() {
    console.log("mounted");
    await this.props.fetchSingleData("/orders", this.props.match.params.id);
    await this.props.fetchData("/files", this.props.match.params.id);
    this.props.setActiveTab("primary", "orders");
  }

  render() {
    console.log(this.props)
    return this.props.load || !this.props.order ? (
      <Spinner />
    ) : (
        <div>
          <Table type="order" order={this.props.order} rerender={this.rerender} />
          <FileList id={this.props.order._id} type="showFiles" typeOfData="order" />
          <FileUpload id={this.props.order._id} typeOfData="order" />
        </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    order: state.ordersData.order,
    load: state.eventsData.load
  };
};

export default connect(mapStateToProps, {
  fetchSingleData,
  fetchData,
  setActiveTab
})(OrderShow);
