import React from "react";
import Playlist from "../../elements/Playlist/Playlist";
import "./SurBox.css";
class SurBox extends React.Component {
  // Collects  data from api request.

  render() {
    return (
      <div className="sur-box">
        <Playlist />
      </div>
    );
  }
}

export default SurBox;
