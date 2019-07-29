import React, { Component } from "react";
import { render } from "react-dom";
import Player from "../../src/Player";

class App extends Component {
  render() {
    return (
      <div>
        uiiiiiii
        <Player
          apiKey="AIzaSyDwcGALDxWC1T-5fnGvlzxvIJIoghO0ZUc"
          language="en"
          zoom={14}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
