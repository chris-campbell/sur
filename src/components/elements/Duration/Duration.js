import React from "react";

class Duration extends React.Component {
  state = {
    seconds: 0
  }

  componentDidMount = () => {

  }

  render() {
    const { seconds } = this.state

    return (
      <div className="duration col">{seconds}</div>
    );
  }

  componentWillMount() {
    this.durationInterval = setInterval(() => {
      this.setState(prevState => ({
        seconds: prevState.seconds + 1
      }))
    }, 1000)
  }

};

export default Duration;


