import React from "react";
import "./Playlist.css";

class Playlist extends React.Component {
  state = {
    albumCover: "https://via.placeholder.com/45",
    albumTitle: null,
  }

  trackInfo = (event) => {
    var info = [];
    info.push(event.target.getAttribute("data-track"));
    info.push(event.target.getAttribute("data-num"));
    info.push(event.target.getAttribute("data-load"))
    info.push(event.target.getAttribute("data-cover"));
    info.push(event.target.getAttribute("data-title"));
    info.push(event.target.getAttribute("data-duration"));
    this.setState({
      albumCover: event.target.getAttribute("data-cover"),
      albumTitle: event.target.getAttribute("data-title")
    })
    this.props.getTrackInfo(info);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.test !== this.props.test) {
      if (this.props.test[0]) {
        this.setState({
          albumCover: this.props.test[0],
          albumTitle: this.props.test[1]
        })
      }
    }
  }

  render() {
    const tracks = this.props.trackslist;
    const listing = tracks.slice(0, this.props.limit).map((track, trackNum) => {
      return <li
        data-num={trackNum}
        data-track={track.preview}
        data-cover={track.album.cover_small}
        data-title={track.title}
        data-load={true}
        onClick={this.trackInfo}
        key={trackNum}>
        {track.title}
      </li>
    })

    return (
      <div id="sur-playlist">
        <h3>Tracks</h3>
        <ul id="sur-track-listing">{listing}</ul>
        <a className="load-more" href="#" onClick={this.props.loadMoreTracks}>Load more</a>
        <div className="sur-album">
          <h3>Album</h3>
          <div>
            <div className="row">
              <div className="col-6 sur-album-cover">
                <img src={this.state.albumCover} alt="album cover" />
              </div>
              <div className="sur-album-info col">
                <h5>{this.state.albumTitle}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Playlist;




