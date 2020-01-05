import React, { Component } from "react";
import { connect } from "react-redux";
import { hideModal } from "../../action";

class ImageModal extends Component {
  onClose = () => {
    this.props.hideModal("image");
  };

  render() {
    if (!this.props.showImageModal) {
      return null;
    } else {
      return (
        <div className="ui dimmer modals page active">
          <i
            className="large window close outline icon inverted"
            style={{ position: "absolute", top: "50px", right: "50px" }}
            onClick={this.onClose}
          ></i>
          <div className="ui small basic test modal transition visible active">
            <img src="ftp://webmaster@logway1.lt:5kEpMxBP7CM3Zkfh@logway1.lt/files/5e00d89eba31c700174fef31/photo/1577125899481___S74.JPG" />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    showImageModal: state.eventsData.showImageModal
  };
};

export default connect(mapStateToProps, { hideModal })(ImageModal);
