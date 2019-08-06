import React, { Component } from "react";
import { render } from "react-dom";
import Player from "../../src/Player";
import data from './data';

class App extends Component {


  render() {
    return (
      <div>
        <Player
          apiKey="Your Key"
          language="en"
          zoom={14}
          coordinates={data}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
    
