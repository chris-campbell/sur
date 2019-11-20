import React from "react";

class SearchBar extends React.Component {
  state = {
    value: '',
  }

  timeout = null

  doSearch = (event) => {
    this.setState({ value: event.target.value });
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.props.callback(this.state.value);
    }, 500)
  }

  render() {
    return (
      <input
        type="text"
        className="sur-searbar"
        onChange={this.doSearch}
        value={this.state.value}
        placeholder="Type artist name . . ."
      />
    )
  }
}

export default SearchBar;