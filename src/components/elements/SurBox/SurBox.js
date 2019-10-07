import React from "react";
import Artist from "../Artist/Artist";
import Player from "../Player/Player";
import { TOP_CHART_API, API } from "../../../config";
import Playlist from "../../elements/Playlist/Playlist";
import "./SurBox.css";
import "../../elements/Navigation/Navigation.css";
import "../Player/Player.css";
import axios from "axios";
import Navigation from "../Navigation/Navigation";
import SearchBar from "../SearchBar/SearchBar";

class SurBox extends React.Component {
  state = {
    artistName: null,
    trackTitle: null,
    album: null,
    backgroundCover: null,
    loading: false,
    searchTerm: ""
  };

  // Collects  data from api request.
  componentDidMount() {
    this.setState({ loading: true });
    const endpoint = TOP_CHART_API;
    console.log(endpoint);
    this.fetchPlaylistItems(endpoint);
  }

  fetchPlaylistItems = endpoint => {
    axios
      .get(endpoint)
      .then(result => {
        if (result.data.data !== undefined) {
          result.data.data.forEach(track => {
            this.setState({
              artistName: track.artist.name,
              trackTitle: track.title,
              album: track.album.title,
              backgroundCover: track.artist.picture_xl
            });
          });
        }
      })
  };

  searchTerm = searchTerm => {
    let endpoint = "";
    this.setState({
      searchTerm: searchTerm
    });

    endpoint = `${API}"${searchTerm}"`;

    this.fetchPlaylistItems(endpoint);
  };

  render() {
    let imgUrl = this.state.backgroundCover;
    let styles = {
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.67), rgba(0, 0, 0, 0.67)), url(${imgUrl})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "100% auto",
      resize: "both"
    };

    return (
      <div className="sur-box container" style={styles}>
        <div className="row">
          <div className="sur-navi col-1">
            <Navigation />
          </div>
          <div className="sur-music-info col-11 container">
            <div className="row">
              <div className="sur-artist-info col-8">
                <SearchBar callback={this.searchTerm} />
                <Artist
                  artist={this.state.artistName}
                  track={this.state.trackTitle}
                  albumtitle={this.state.album}
                  bgImage={this.state.backgroundCover}
                />
              </div>
              <div className="sur-tracks col-4">
                <Playlist />
              </div>
            </div>
          </div>
          <div className="sur-player col-12">
            <Player />
          </div>
        </div>
      </div>
    );
  }
}

export default SurBox;
