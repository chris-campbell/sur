import React from "react";
import "./Playlist.css";

class Playlist extends React.Component {
  render() {
    const tracks = this.props.trackslist
    const listing = tracks.slice(0, this.props.limit).map((track, index) => {
      return <li key={index}>{track.title}</li>
    })

    return (
      <div>
        <ul>
          {listing}
        </ul>
        <button onClick={this.props.loadMoreTracks}>Load</button>
      </div>
    );
  }
}

export default Playlist;


  

