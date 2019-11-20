import React from "react";
import Artist from "../Artist/Artist";
import Player from "../Player/Player";
import Playlist from "../../elements/Playlist/Playlist";
import "./SurBox.css";
import "../../elements/Navigation/Navigation.css";
import "../Player/Player.css";
import axios from "axios";
import { TOP_CHART_API, API } from "../../../config";
import SearchBar from "../SearchBar/SearchBar";


class SurBox extends React.Component {
  state = {
    artistName: null,
    trackTitle: null,
    album: null,
    albumCover: null,
    backgroundCover: null,
    tracks: [],
    loading: false,
    searchTerm: "",
    limitTo: 10,
    trackInfo: null,
    starterTrack: null,
    albumStuff: null
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
        result.data.data.forEach(track => {
          this.setState({
            artistName: track.artist.name,
            trackTitle: track.title,
            album: track.album.title,
            albumCover: track.album.cover_medium,
            tracks: [...result.data.data],
            backgroundCover: track.artist.picture_xl,
            starterTrack: track.preview,
            loading: false
          });
        });
      }
    });
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
  
    if (searchTerm === ''){
      endpoint = TOP_CHART_API;
    } else {
      endpoint = `${API}"${searchTerm}"`; 
    }
    this.fetchPlaylistItems(endpoint);
  };

  loadMoreTracks = () => {
    this.setState({ limitTo: this.state.limitTo + 5 })
  }

  setAlbum = (callback) => {
    this.setState({albumStuff: callback})
  }

  trackInfoFromChild = (callback) => {
    this.setState({ trackInfo: callback })
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
      height: "519px",
      borderTopLeftRadius: "21px"
    };

    return(
      <main className="sur-box container">
          <div className="row">
            <div className="sur-music-info col-12
            container">
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
                    albumCover={this.state.albumCover}
                    albumTitle={this.state.album}
                    trackTitle={this.state.trackTitle}
                    getTrackInfo={this.trackInfoFromChild}
                    test={this.state.albumStuff}
                  />
                </div>
              </div>
            </div>
            <div className="sur-player col-12">
              <Player 
                trackInfo={this.state.trackInfo}
                trackList={this.state.tracks}
                search={this.search}
                albumstuff={this.setAlbum}
              />
            </div>
          </div>
      </main>
    );
  }
}

export default SurBox;