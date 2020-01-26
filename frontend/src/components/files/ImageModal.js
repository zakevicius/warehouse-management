import React, { Component } from "react";
import { connect } from "react-redux";
import { hideModal } from "../../action";

class ImageModal extends Component {
  state = {
    _id: this.props._id,
    rotate: ""
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
          className={`imageModal_mainImage ${this.state.rotate}`}
        />
      );
    }
  };

  onImageClick = id => {
    this.setState({
      _id: id,
      rotate: ""
    });
  };

  showImagesLine = () => {
    return this.props.images.map(image => (
      <img
        key={image._id}
        src={`data:image/png;base64, ${image.src}`}
        onClick={() => this.onImageClick(image._id)}
        className="imageModal_img"
      />
    ));
  };

  rotate = dir => {
    console.log(dir);
    switch (dir) {
      case "rotate_left":
        if (this.state.rotate === "") {
          this.setState({
            rotate: "rotate_left"
          });
        } else if (this.state.rotate === "rotate_left") {
          this.setState({
            rotate: "rotate_180"
          });
        } else if (this.state.rotate === "rotate_180") {
          this.setState({
            rotate: "rotate_right"
          });
        } else {
          this.setState({
            rotate: ""
          });
        }
        break;
      case "rotate_right":
        if (this.state.rotate === "") {
          this.setState({
            rotate: "rotate_right"
          });
        } else if (this.state.rotate === "rotate_right") {
          this.setState({
            rotate: "rotate_180"
          });
        } else if (this.state.rotate === "rotate_180") {
          this.setState({
            rotate: "rotate_left"
          });
        } else {
          this.setState({
            rotate: ""
          });
        }
        break;
      default: {
        console.log("no dir");
      }
    }
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
        <div className="ui dimmer modals page active imageModal">
          <div className="imageModal_imageLine">{this.showImagesLine()}</div>
          <i
            className="big window close outline icon inverted imageModal_closeButton"
            onClick={this.onClose}
          ></i>
          <div className="imageModal_left"></div>
          <div className="ui small basic test modal transition visible active imageModal_mainImageDiv">
            <div className="imageModal_rotateButtons">
              <i
                className="big undo alternate icon inverted"
                onClick={() => this.rotate("rotate_left")}
              ></i>
              <i
                className="big redo alternate icon inverted"
                onClick={() => this.rotate("rotate_right")}
              ></i>
            </div>
            {this.showImage()}
          </div>
          <div className="right"></div>
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
