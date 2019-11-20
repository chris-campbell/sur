import React from "react";
import next from "./img/skip-next.png";
import prev from "./img/skip-prev.png";
import pause from "./img/pause.png";
import play from "./img/play.png";
import Duration from "../../elements/Duration/Duration";

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      trackNumber: null,
      isPlaying: false,
      playImage: play,
      pauseImage: pause,
      trackImg: null,
      trackTitle: null,
      audioDurationTime: null
    };
    this.durationlev = null
  }

  accessChild = () => {
    this.refs.child.restartSeconds();
  }

  play = () => {
    this.setState({ isPlaying: true }, () => {
      this.refs.audio.play();
    });
  }

  pause = () => {
    this.setState({ isPlaying: false }, () => {
      this.refs.audio.pause();
    });
  }

  next = () => {
    let info = []
    this.setState({ trackNumber: (this.state.trackNumber + 1) },
      () => {
        if (this.props.trackList[this.state.trackNumber].preview) {
          this.setState({
            isPlaying: true,
            url: this.props.trackList[this.state.trackNumber].preview,
            trackImg: this.props.trackList[this.state.trackNumber].album.cover_small,
            trackTitle: this.props.trackList[this.state.trackNumber].album.title,
            audioDurationTime: this.audioDuration(this.refs.audio)
          }, () => {
            this.refs.audio.pause();
            this.refs.audio.load();
            this.refs.audio.play();
            info.push(this.state.trackImg)
            info.push(this.state.trackTitle)
            this.props.albumstuff(info)
            this.accessChild();
          });
        }
      });
  }

  prev = () => {
    let info = [];
    if (this.state.trackNumber > 0) {
      this.setState({ trackNumber: this.state.trackNumber - 1 },
        () => {
          if (this.props.trackList[this.state.trackNumber].preview) {
            this.setState({
              isPlaying: true,
              url: this.props.trackList[this.state.trackNumber].preview,
              trackImg: this.props.trackList[this.state.trackNumber].album.cover_small,
              trackTitle: this.props.trackList[this.state.trackNumber].title,
              audioDurationTime: this.audioDuration(this.refs.audio)
            }, () => {
              this.refs.audio.pause();
              this.refs.audio.load();
              this.refs.audio.play();
              info.push(this.state.trackImg)
              info.push(this.state.trackTitle)
              this.props.albumstuff(info)
              this.accessChild();
              this.accessChild();
            });
          }
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.trackInfo !== prevProps.trackInfo) {
      this.setState({
        url: this.props.trackList[this.props.trackInfo[1]].preview,
        trackNumber: parseInt(this.props.trackInfo[1], 10),
        isPlaying: JSON.parse(this.props.trackInfo[2]),
        trackImg: this.props.trackInfo[3],
        trackTitle: this.props.trackInfo[4],
        audioDurationTime: this.audioDuration(this.refs.audio)
      }, () => {
        this.refs.audio.pause();
        this.refs.audio.load();
        this.refs.audio.play();
        this.accessChild();
      });
    } else {
      var audio1 = document.getElementById('audio-main');
      audio1.onended = () => {
        this.setState({
          isPlaying: false
        });
      };
    }
  }

  imageToggle = () => {
    let image = this.state.isPlaying === true ? this.state.pauseImage : this.state.playImage;
    return image;
  }

  audioDuration = (audioFile) => {
    let audioFileDuration = null;
    if (audioFile) {
      audioFile.onloadedmetadata = () => {
        if (audioFile.duration) {
          audioFileDuration = audioFile.duration
          this.setState({ audioDurationTime: audioFileDuration })
        }
      }
    }
  }

  render() {
    const durationProps = {
      duration: this.state.audioDurationTime,
      isPlaying: this.state.isPlaying,
      trackNumber: this.state.trackNumber
    }

    return (
      <div className="row">
        <div className="sur-track-info col-4">
          <img src={this.state.trackImg || "https://via.placeholder.com/45"} alt="small-album-cover" />
          <span>{this.state.trackTitle}</span>
        </div>
        <div className="sur-player-console col-8">
          <audio id="audio-main" ref="audio" preload="metadata">
            <source src={this.state.url} type="audio/mp3" />
          </audio>
          <div className="sur-player-controls row">
            <div className="sur-player-btns col">
              <img className="sur-player-prev-btn" src={prev} onClick={this.prev} alt="prev-button" />
              <img className="sur-play-btn" onClick={this.state.isPlaying ? this.pause : this.play} src={this.imageToggle()} alt="play-button" />
              <img className="sur-player-next-btn" src={next} onClick={this.next} alt="next-button" />
            </div>
            <Duration ref="child" time={durationProps} />
          </div>
        </div>
      </div>
    );
  }
}

export default Player;