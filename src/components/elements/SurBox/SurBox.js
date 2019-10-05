import React from "react";
import Artist from "../Artist/Artist";
import Player from "../Player/Player";
import { TOP_CHART_API, API } from "../../../config";
import Playlist from "../../elements/Playlist/Playlist";
import "./SurBox.css";
import "../../elements/Navigation/Navigation.css"
import "../Player/Player.css";
import axios from "axios";
import Navigation from '../Navigation/Navigation';
import SearchBar from "../SearchBar/SearchBar";

class SurBox extends React.Component {
  state = {
    artistName: null,
    track: null,
    albumTitle: null,
    albumCover: null,
    backgroundCover: null,
    loading: false,
    searchTerm: ''
  }

  // Collects  data from api request.
  componentDidMount() {
    this.setState({ loading: true });
    const endpoint = TOP_CHART_API;
    this.fetchItems(endpoint);
  }

  fetchItems = (endpoint) => {
    axios.get(endpoint)
      .then(result => {
        // console.log(result.data)
        this.setState({
          artistName: result.data.tracks.data[0].artist.name,
          albumCover: result.data.tracks.data[0].album.cover,
          albumTitle: result.data.tracks.data[0].album.title,
          track: result.data.tracks.data[0].title,
          backgroundCover: result.data.tracks.data[0].artist.picture_big
        })
      })
  }

  fetchPlaylistItems = (endpoint) => {
    axios.get(endpoint)
      .then(result => {
        console.log(result)
      })
  }

  searchTerm = searchTerm => {
    // console.log(searchTerm);
    let endpoint = "";
    this.setState({
      searchTerm: searchTerm
    });

    if (searchTerm === '') {
      endpoint = TOP_CHART_API;
    } else {
      endpoint = `${API}${searchTerm}`;
    }
    console.log(endpoint)
    this.fetchPlaylistItems(endpoint)
  }

  render() {

    let imgUrl = this.state.backgroundCover
    let styles = {
      backgroundImage: `url(${imgUrl})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: '50% auto',
      resize: 'both'
    }

    return (
      <div className="sur-box container" style={styles}>
        <div className="row">
          <div className="sur-navi col-1">
            <Navigation />
          </div>
          <div className="sur-music-info col-11 container" >
            <div className="row">
              <div className="sur-artist-info col-8">
                <SearchBar callback={this.searchTerm} />
                <Artist
                  artist={this.state.artistName}
                  track={this.state.track}
                  albumtitle={this.state.albumTitle}
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
