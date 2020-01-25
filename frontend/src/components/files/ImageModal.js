import React, { Component } from "react";
import { connect } from "react-redux";
import { hideModal } from "../../action";

class ImageModal extends Component {
  state = {
    src: ""
  };

  styleImagesLine = {
    width: "100%",
    height: "10em",
    overflow: "hidden",
    position: "absolute",
    bottom: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };

  showImage = () => {
    let image = this.props.images.filter(
      img => img._id.toString() === this.props._id.toString()
    );
    return (
      <img
        width="800"
        height="auto"
        src={`data:image/png;base64, ${image[0].src}`}
      />
    );
  };

  showImagesLine = () => {
    return this.props.images.map(image => (
      <img
        key={image._id}
        width="150"
        height="auto"
        src={`data:image/png;base64, ${image.src}`}
      />
    ));
  };

  onClose = () => {
    this.props.hideModal("image");
  };

  render() {
    if (
      !this.props.showImageModal ||
      this.props.images.length === 0 ||
      !this.props._id
    ) {
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
            {this.showImage()}
          </div>
          <div style={this.styleImagesLine}>{this.showImagesLine()}</div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    showImageModal: state.eventsData.showImageModal,
    _id: state.eventsData._id,
    images: state.filesData.files.photos
  };
};

export default connect(mapStateToProps, { hideModal })(ImageModal);
