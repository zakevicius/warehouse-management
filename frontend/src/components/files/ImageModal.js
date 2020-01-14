import React, { Component } from "react";
import { connect } from "react-redux";
import { hideModal, downloadFile } from "../../action";

class ImageModal extends Component {
  componentDidUpdate() {
    console.log(this.state, this.props);
    if (this.props.images.length > 0) {
      let { _id, name } = this.props.images[0];
      this.props.downloadFile(_id, name);
    }
  }

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
            <img src={`data:image/png;base64, ${this.props.src}`} />
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    src: state.filesData.src,
    showImageModal: state.eventsData.showImageModal
  };
};

export default connect(mapStateToProps, { hideModal, downloadFile })(
  ImageModal
);
