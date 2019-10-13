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
    tracks: [],
    loading: false,
    limitTo: 10,
    searchTerm: ""
  };

  componentDidMount() {
    this.setState({ loading: true });
    const endpoint = TOP_CHART_API;
    this.fetchPlaylistItems(endpoint);
  }

  fetchPlaylistItems = endpoint => {
    axios
    .get(endpoint)
    .then(result => {
      if (result.data.data !== undefined) {
        result.data.data.forEach (track => {
          this.setState({
            artistName: track.artist.name,
            trackTitle: track.title,
            album: track.album.title,
            tracks: result.data.data,
            backgroundCover: track.artist.picture_xl,
            loading: false
          });
        });
      }
    })
  };

  searchTerm = searchTerm => {
    let endpoint = "";

    this.setState({
      searchTerm: searchTerm,
      loading: true
    });

    if (this.state.loading === true) {
      this.setDefaultTrackLimit();
    }

    endpoint = `${API}"${searchTerm}"`;
    this.fetchPlaylistItems(endpoint);
  };

  loadMoreTracks = () => {
    this.setState({ limitTo: this.state.limitTo + 5 })
  }

  setDefaultTrackLimit = () => {
    this.setState({ limitTo: 10 })
  }

  render() {
    let imgUrl = this.state.backgroundCover;
    let styles = {
      backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0.67), rgb(33, 17, 48)), url(${imgUrl})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundSize: "100% auto",
      resize: "both",
      height: "519px"
    };

    return (
      <div className="sur-box container">
        <div className="row">
          <div className="sur-navi col-1">
            <Navigation />
          </div>
          <div className="sur-music-info col-11 container">
            <div className="row">
              <div className="sur-artist-info col-8" style={styles}>
                <SearchBar callback={this.searchTerm} />
                <Artist
                  artist={this.state.artistName}
                  track={this.state.trackTitle}
                  albumtitle={this.state.album}
                  bgImage={this.state.backgroundCover}
                />
              </div>
              <div className="sur-tracks col-4">
                <Playlist 
                  trackslist={this.state.tracks}
                  loadMoreTracks={this.loadMoreTracks}
                  limit={this.state.limitTo} 
                />
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
