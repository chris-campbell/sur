import React from "react";
import next from "./img/next.png";
import prev from "./img/prev.png";
import pause from "./img/pause.png";
import play from "./img/play.png";


class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      trackNumber: null,
      isPlaying: false,
      playImage: play,
      pauseImage: pause,
    };
    
  }

  play = () => {
    var audio1 = document.getElementById('audio-main');
    this.setState({ isPlaying: true }, () => {
      this.refs.audio.play();
    })
  }

  pause = () => {
    this.setState({ isPlaying: false }, () => {
        this.refs.audio.pause();
    })
  }

  next = () => {
    this.setState({ trackNumber: (this.state.trackNumber + 1) },
    () => {
      // Plays next track if its available
      if (this.props.trackList[this.state.trackNumber].preview) {
        this.setState({
          isPlaying: true,
          url: this.props.trackList[this.state.trackNumber].preview,
        }, () => {
          this.refs.audio.pause();
          this.refs.audio.load();
          this.refs.audio.play();
        });
      }
    });
  }

  prev = () => {
    if (this.state.trackNumber > 0) {
      this.setState({ trackNumber: this.state.trackNumber - 1 },
      () => {
        // Plays previous track if its available
        if (this.props.trackList[this.state.trackNumber].preview) {
        this.setState({
          isPlaying: true,
          url: this.props.trackList[this.state.trackNumber].preview }, () => {
            this.refs.audio.pause();
            this.refs.audio.load();
            this.refs.audio.play();
          });
        }
      });
    }
  }

  // When track URL changes play updated track
  componentDidUpdate(prevProps) {
    if (this.props.trackInfo !== prevProps.trackInfo) {
      this.setState({ 
        url: this.props.trackList[this.props.trackInfo[1]].preview,
        trackNumber: parseInt(this.props.trackInfo[1], 10),
        isPlaying: JSON.parse(this.props.trackInfo[2])
      }, () => {
        this.refs.audio.pause();
        this.refs.audio.load();
        this.refs.audio.play();
      });
    } else {
      var audio1 = document.getElementById('audio-main');
      audio1.onended = () => {
        this.setState({
          isPlaying: false
        })
      }
    }
  }

  imageToggle = () => {
    let image = this.state.isPlaying === true ? this.state.pauseImage : this.state.playImage;
    return image;
  }

  render() {
    return (
      <div>
        <audio id="audio-main" ref="audio" preload="metadata">
          <source src={this.state.url} type="audio/mp3" />
        </audio>
        <img onClick={this.state.isPlaying ? this.pause : this.play} src={this.imageToggle()} />
        <img src={next} onClick={this.next} />
        <img src={prev} onClick={this.prev} />
      </div>
    );
  }
}

export default Player;
