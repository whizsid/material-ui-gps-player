<p align="center"><img src="https://i.imgur.com/GRK3UL8.png"></p>

---

<p align="center">
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/License-MIT-brightgreen.svg" alt="License: MIT"></a>
<a href="https://github.com/prettier/prettier"><img src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg" alt="Code Style: prettier"></a>
<a href="https://www.npmjs.com/package/material-ui-gps-player" ><img alt="npm" src="https://img.shields.io/npm/dw/material-ui-gps-player"></a>
</p>

---

This react component is fully developed using React Material UI framework to show GPS paths. You can play, pause and stop while playing GPS coordinates with this component.

![material-ui-gps-player Preview](https://i.imgur.com/yp5BOUf.png)

## Installation

```
npm install @material-ui/core @material-ui/icons react react-dom material-ui-gps-player --save
```

## Usage 

```
import Player from 'material-ui-gps-player';


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

```

## Props

| Props (* required)         |  Defualt      |  Description              | Type          |
|---            |---            |---                        | ---           |
|`apiKey` *      | `undefined` | API key for google maps | `string` |
|`coordinates`*  |   `[]`          | GPS Coordinates that containing `lat:float`,`lng:float`,`time:int`,`bearing?:float` properties. `lat`,`lng`,`time` properties are required. `time` property is expecting a UNIX timestamp and all other properties (`lat`,`lng`,`bearing`) expecting floats. `bearing` is optional. We are calculating `bearing` using nearest coordinates if you didn't supply. Pass boolean value to `marker` if you want to display a marker. All other properties taking as marker's props if `marker` is `true`. | `array` |
| | | `time:int` is passing to all below callbacks as the first parameter.||
|`onChangeTime` | `undefined`   | When time has changed in the player. | `function` |
|`onChangeSpeed`| `undefined`   | When player speed is changed. | `function` |
| `onPlay`      | `undefined`     | This function will trigger when play button is clicked. | `function` |
| `onPause`     | `undefined`   | When click the pause icon | `function` |
| `onPause`     | `undefined`   | When click the stop icon | `function` |
| `currentTime` | `undefined`   | Currently playing time in UNIX format | `number` |
| `speeds`      | `[-200, -100, 50, 100, 200, 500, 750, 1000]` | Available speeds for the player. Current speed is choosing from these values when click on the forward button. | `number[]` |
| `speed`      |  internal states | Currently playing speed. We are using our internal state if you didn't supplied a speed. | `number` |
| `timeFormat` | `HH:mm:ss`     | Time format to display start/end times. Please supply a time format supported in `moment`. | string |
| `iconMarker`  | `{scale: 6,fillColor: blue[600],fillOpacity: 1,strokeWeight: 0}`| google marker icon decorations. | `object` |
| `width`       | `undefined`   | Width for the player wrapper. | `number` |
| `height`      | `500`           | Height of the player wrapper. |  `number` |
| `center`      | `{lat: 7.8731,lng: 80.7718}` | This is the center of map when initializing. center parameter required a object that contains `lat`, `lng` properties. | `object` |
| `polyLine` | `undefined` | Poly Line properties. Ex:- `{strokeWidth:4, strokeColor: '#fff'}` | `object` |
| `speedMultiplier` | `25` | Speed multiplier when switching between waiting time enabled and disabled. | `number` |

## Testing

Install depedencies

```
npm install
```

Start the testing app

```
npm start
```

## Contribution

All PR s and issues are welcome!
