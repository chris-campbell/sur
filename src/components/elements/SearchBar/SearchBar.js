import React from "react";
import { TOP_CHART_API, API } from "../../../config";

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
      />
    )
  }
}

export default SearchBar;