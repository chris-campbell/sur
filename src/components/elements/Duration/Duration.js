import React from "react";

class Duration extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      seconds: 0,
      isPlaying: false,
      track: null
    }

  }

  render() {
    const { seconds } = this.state
    return (
      <div className="duration col">00:{seconds} / 00:{Math.ceil(this.props.time.duration)}</div>
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.time.isPlaying !== prevProps.time.isPlaying) {
      this.setState({
        isPlaying: this.state.isPlaying === false ? true : false,
        track: this.props.time.trackNumber
      })
    }
  }

  restartSeconds() {
    this.setState({ seconds: 0 })
  }

  componentDidMount() {
    this.durationInterval = setInterval(
      () => {
        if (this.state.isPlaying) {
          this.setState(prevState => ({
            seconds: prevState.seconds + 1
          }))
        }
      }, 1000)
  }

  componentWillUnmount = () => {
    clearInterval(this.durationInterval)
  }

}



export default Duration;


