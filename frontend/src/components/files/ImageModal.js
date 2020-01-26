import React, { Component } from "react";
import { connect } from "react-redux";
import { hideModal } from "../../action";

class ImageModal extends Component {
  state = {
    _id: this.props._id
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

  styleModalImage = {
    maxWidth: "100%",
    height: "auto",
    padding: "2em"
  };

  showImage = () => {
    if (this.state._id === "") {
      console.log("state 0");
      return;
    } else {
      let image = this.props.images.filter(
        img => img._id.toString() === this.state._id.toString()
      );
      return (
        <img
          src={`data:image/png;base64, ${image[0].src}`}
          style={this.styleModalImage}
        />
      );
    }
  };

  onImageClick = id => {
    this.setState({
      _id: id
    });
  };

  showImagesLine = () => {
    return this.props.images.map(image => (
      <img
        key={image._id}
        width="150"
        height="auto"
        src={`data:image/png;base64, ${image.src}`}
        onClick={() => this.onImageClick(image._id)}
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
          <div style={this.styleImagesLine}>{this.showImagesLine()}</div>
          <i
            className="large window close outline icon inverted"
            style={{ position: "absolute", top: "50px", right: "50px" }}
            onClick={this.onClose}
          ></i>
          <div className="ui small basic test modal transition visible active">
            {this.showImage()}
          </div>
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
