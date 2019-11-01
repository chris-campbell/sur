import React from "react";
import next from "./next.png";
import prev from "./prev.png";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      trackNumber: null
    };
  }

  next = () => {
    this.setState({ trackNumber: (this.state.trackNumber + 1) },
    () => {
      // Plays next track if its available
      if (this.props.trackList[this.state.trackNumber].preview) {
        this.setState({  
          url: this.props.trackList[this.state.trackNumber].preview
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
        this.setState({ url: this.props.trackList[this.state.trackNumber].preview }, () => {
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
        trackNumber: parseInt(this.props.trackInfo[1], 10)
      }, () => {
        this.refs.audio.pause();
        this.refs.audio.load();
        this.refs.audio.play();
      });
    }
  }

  render() {
    return (
      <div>
        <audio controls ref="audio">
          <source src={this.state.url} type="audio/mp3" />
        </audio>
        <img src={next} onClick={this.next} />
        <img src={prev} onClick={this.prev} />
      </div>
    );
  }
}

export default Player;