import React from "react";
import "./Playlist.css";

class Playlist extends React.Component {
  // Gathers track in to be used in player component
  trackInfo = (event) => {
    // Added both track and track number to array
    var info = []; 
    info.push(event.target.getAttribute("data-track"));
    info.push(event.target.getAttribute("data-num"));
    info.push(event.target.getAttribute("data-load"));
    // Sends track info array to parent Sur
    this.props.getTrackInfo(info);
  }

  render() {
    // assigns track list to tracks variable
    const tracks = this.props.trackslist;
    const listing = tracks.slice(0, this.props.limit).map((track, trackNum) => {
      return <li 
              data-num={trackNum} 
              data-track={track.preview}
              data-load={true}
              onClick={this.trackInfo} 
              key={trackNum}
              >
                {track.title}
              </li>;
    });

    return (
      <div>
      <h3>Tracks</h3>
        <ul className="sur-track-listing">{listing}</ul>
        <a href="#" onClick={this.props.loadMoreTracks}>Load more</a>
        <div className="sur-album">
          <h3>Album</h3>
          <div>
            <div className="row">
              <div className="col-6-sm sur-album-cover">
                <img src={this.props.albumCover} />
              </div>
              <div className="sur-album-info col-6-sm">
                <h5>{this.props.albumTitle}</h5>
                <span>{this.props.trackTitle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Playlist;


  

