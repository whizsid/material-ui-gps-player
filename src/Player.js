import React, { Component } from "react";
import { Gmaps, Marker, Polyline, InfoWindow } from "react-gmaps";
import moment from "moment";
import PropTypes from "prop-types";
import classNames from "classnames";

import Paper from "@material-ui/core/Paper";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";
import PlayIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import FastForwardIcon from "@material-ui/icons/FastForward";
import StopIcon from "@material-ui/icons/Stop";
import blue from "@material-ui/core/colors/blue";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  paper: {
    background: "rgba(0,0,0,0.7)",
    position: "relative"
  },
  hideSmall: {
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  seekBar: {
    background: "#636466",
    height: 14,
    borderRadius: 4,
    flexGrow: 1,
    position: "relative",
    cursor: "pointer"
  },
  seeked: {
    background: "#f0f0f0",
    height: 14,
    borderRadius: 4,
    position: "absolute",
    top: 0,
    left: 0,
    pointerEvents: "none"
  },
  buttonIcon: {
    color: "#fff"
  },
  timeTypography: {
    color: "#fff",
    margin:
      typeof theme.spacing == "object"
        ? theme.spacing.unit * 2
        : theme.spacing(2)
  }
});

class PlayerComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      timeout: null,
      _currentTime: props.coordinates[0] ? props.coordinates[0].time : 0,
      _speed: props.speeds[Math.ceil((props.speeds.length - 1) / 2)]
    };

    this.handlePause = this.handlePause.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleSeek = this.handleSeek.bind(this);
    this.handleForward = this.handleForward.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    // Updating start time when componemet changing
    if (
      this.state._currentTime == 0 &&
      prevState._currentTime == 0 &&
      !this.props.currentTime
    ) {
      const firstCoordinate = this._getFirstCoordinate();

      if (firstCoordinate) {
        this.setState({
          _currentTime: firstCoordinate.time
        });
      }
    }
  }
  /**
   * Returning the currently passed coordinates
   *
   */
  _getCurrentCoordinates() {
    const { coordinates, currentTime } = this.props;
    const { _currentTime } = this.state;
    // If current time passed by props time is taking fron it
    // Otherwise time is keeping from our internal state
    const time = currentTime ? currentTime : _currentTime;

    return coordinates.filter(coordinate => {
      return coordinate.time < time;
    });
  }

  _getFirstCoordinate() {
    return this.props.coordinates[0];
  }

  _getLastCoordinate() {
    const { coordinates } = this.props;

    return coordinates[coordinates.length - 1];
  }
  /**
   * Calculating the bearing by two coordinates
   *
   * @param float startLat
   * @param float startLng
   * @param float destLat
   * @param float destLng
   *
   * @return float
   */
  _calculateBearing(startLat, startLng, destLat, destLng) {
    startLat = this._toRadians(startLat);
    startLng = this._toRadians(startLng);
    destLat = this._toRadians(destLat);
    destLng = this._toRadians(destLng);

    let y = Math.sin(destLng - startLng) * Math.cos(destLat);
    let x =
      Math.cos(startLat) * Math.sin(destLat) -
      Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    let brng = Math.atan2(y, x);
    brng = this._toDegrees(brng);
    return ((brng + 360) % 360) - 180;
  }

  // Converts from degrees to radians.
  _toRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  // Converts from radians to degrees.
  _toDegrees(radians) {
    return (radians * 180) / Math.PI;
  }

  _continue() {
    const { speed, onChangeTime, currentTime, speeds } = this.props;
    const { _currentTime, _speed, playing } = this.state;
    // Takingbspeed from props or state
    const currentSpeed = speed ? speed : _speed;

    if (!playing) {
      // If paused or stopped not continue
      return;
    }

    // If passed current time via props
    let time = currentTime ? currentTime : _currentTime;
    const lastCoordinate = this._getLastCoordinate();
    const firstCoordinate = this._getFirstCoordinate();
    // Checking the weather current time is in the valid time range
    if (
      (firstCoordinate &&
        time < firstCoordinate.time + (5 * currentSpeed) / 1000 &&
        currentSpeed < 0) ||
      (lastCoordinate && lastCoordinate.time <= time) ||
      !lastCoordinate
    ) {
      // Resetting playing status, currentTime, speed if playing time exceeded
      let newState = {
        playing: false
      };
      if (!speed) {
        newState._speed = speeds[speeds.length - 1];
      }
      this.setState(newState);
      return;
    }

    const _timeout = window.setTimeout(() => {
      // Changing the current time relative to speed
      // speed is in seconds and setTimeou method
      // looping over miliseconds, So I have devided
      // the product by 1000
      time += (5 * currentSpeed) / 1000;

      if (onChangeTime) {
        onChangeTime(time);
      }

      // We dont want to change our internal state
      // if they gave the current time via props
      if (!currentTime) {
        this.setState(
          {
            _currentTime: time
          },
          () => this._continue()
        );
      } else {
        this._continue();
      }
    }, 5);

    // Storing last timeout to destroy it
    this.setState({
      timeout: _timeout
    });
  }

  handlePause() {
    const { onPause, currentTime } = this.props;
    const { _currentTime, timeout } = this.state;

    // Clearing previous timeout
    window.clearTimeout(timeout);

    if (onPause) {
      onPause(currentTime ? currentTime : _currentTime);
    }

    this.setState({
      playing: false
    });
  }

  handlePlay() {
    const { onPlay, currentTime } = this.props;
    const { _currentTime } = this.state;

    if (onPlay) {
      onPlay(currentTime ? currentTime : _currentTime);
    }

    // Starting the recursive loop
    this.setState(
      {
        playing: true
      },
      () => {
        this._continue();
      }
    );
  }

  handleStop() {
    const { currentTime, onChangeTime, onStop } = this.props;
    const { _currentTime, timeout } = this.state;

    window.clearTimeout(timeout);

    // Stopping playing status
    let newState = {
      playing: false
    };

    if (onStop) {
      onStop(currentTime ? currentTime : _currentTime);
    }

    const firstCoordinate = this._getFirstCoordinate();

    const time = firstCoordinate ? firstCoordinate.time : 0;

    // Changing the time to start time
    if (onChangeTime) {
      onChangeTime(time);
    }

    if (!currentTime) {
      newState._currentTime = time;
    }

    this.setState(newState);
  }

  handleSeek(e) {
    const { onChangeTime, currentTime } = this.props;
    const { timeout, playing } = this.state;

    // Calculating the percentage
    const rect = e.target.getBoundingClientRect(),
      x = e.clientX - rect.left, //x position within the element.
      width = e.currentTarget.offsetWidth;

    const percent = parseInt(
      (x > width ? width : (x < 0 ? 0 : x) / width) * 100
    );

    // Retrieving first and last coordinates to calculate selected time
    const firstCoordinate = this._getFirstCoordinate();
    const lastCoordinate = this._getLastCoordinate();

    const startTime = firstCoordinate ? firstCoordinate.time : 0;
    const lastTime = lastCoordinate ? lastCoordinate.time : 0;

    // Time difference between clicked position time and first time
    const timeDif = ((lastTime - startTime) * percent) / 100;

    // Adding the difference to start time
    const selectedTime = startTime + timeDif;
    let newState = { playing: false };

    if (playing) {
      window.clearTimeout(timeout);
    }

    if (!currentTime) {
      newState._currentTime = selectedTime;
    }

    if (onChangeTime) {
      onChangeTime(selectedTime);
    }

    this.setState(newState);
  }

  handleForward() {
    const { speeds, speed, onChangeSpeed } = this.props;
    const { _speed } = this.state;
    const currentSpeed = speed ? speed : _speed;

    let index = 0;

    // Getting the next speed
    const currentIndex = speeds.indexOf(currentSpeed);
    if (currentIndex != speeds.length - 1) {
      index = currentIndex + 1;
    }

    if (onChangeSpeed) {
      onChangeSpeed(speeds[index]);
    }

    if (!speed) {
      this.setState({
        _speed: speeds[index]
      });
    }
  }

  renderSatusIcon() {
    const { classes } = this.props;
    const { playing } = this.state;

    if (playing) {
      return (
        <IconButton onClick={this.handlePause}>
          <PauseIcon className={classes.buttonIcon} />
        </IconButton>
      );
    }

    return (
      <IconButton onClick={this.handlePlay}>
        <PlayIcon className={classes.buttonIcon} />
      </IconButton>
    );
  }

  renderOtherMarkers(coordinates) {
    return coordinates
      .filter(coord => coord.marker)
      .map((coord, key) => [
          <Marker
            {...{
              ...coord,
              infoWindow: undefined,
              marker: undefined,
              time: undefined,
              bearing: undefined
            }}
          />,
          coord.infoWindow ? (
            <InfoWindow
              content={coord.infoWindow.content}
              disableAutoPan={coord.infoWindow.disableAutoPan}
              maxWidth={coord.infoWindow.maxWidth}
              pixelOffset={coord.infoWindow.pixelOffset}
              zIndex={coord.infoWindow.zIndex}
              lat={coord.lat}
              lng={coord.lng}
            />
          ) : null
        ]);
  }

  renderMarker(markers) {
    const { iconMarker } = this.props;

    let currentPosition = markers.pop();

    let prevPosition = markers.pop();

    if (!currentPosition || !prevPosition) return null;

    let angle = 0;

    if (!currentPosition.bearing) {
      angle = this._calculateBearing(
        currentPosition.lat,
        currentPosition.lng,
        prevPosition.lat,
        prevPosition.lng
      );
    } else {
      angle = currentPosition.bearing;
    }

    return (
      <Marker
        lat={currentPosition.lat}
        lng={currentPosition.lng}
        icon={{
          path: window.google
            ? window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW
            : undefined,
          ...iconMarker,
          rotation: angle
        }}
      />
    );
  }

  renderPolyLine(markers) {
    if (!markers.length) {
      return null;
    }

    return (
      <Polyline
        geodesic={true}
        path={markers.map(({ lat, lng }) => ({ lat, lng }))}
      />
    );
  }

  render() {
    const {
      classes,
      apiKey,
      zoom,
      currentTime,
      timeFormat,
      width,
      height,
      center
    } = this.props;
    const { _currentTime } = this.state;

    const lastCoordinate = this._getLastCoordinate();
    const firstCoordinate = this._getFirstCoordinate();

    let seekbarWidth = 0;
    const time = currentTime ? currentTime : _currentTime;

    if (lastCoordinate && firstCoordinate) {
      seekbarWidth =
        ((time - firstCoordinate.time) /
          (lastCoordinate.time - firstCoordinate.time)) *
        100;
    }

    const coordinates = this._getCurrentCoordinates();

    return (
      <Paper style={{ width, height }} ref={this.setRef}>
        <div>
          <Gmaps
            width={"100%"}
            height={height}
            lat={
              coordinates.length
                ? coordinates[coordinates.length - 1].lat
                : center.lat
            }
            lng={
              coordinates.length
                ? coordinates[coordinates.length - 1].lng
                : center.lng
            }
            zoom={zoom}
            params={{
              v: "3.exp",
              key: apiKey
            }}
          >
            {this.renderMarker(coordinates)}
            {this.renderPolyLine(coordinates)}
            {this.renderOtherMarkers(coordinates)}
          </Gmaps>
        </div>
        <Toolbar variant="dense" className={classes.paper}>
          {this.renderSatusIcon()}
          <IconButton onClick={this.handleForward}>
            <FastForwardIcon className={classes.buttonIcon} />
          </IconButton>
          <IconButton className={classes.hideSmall} onClick={this.handleStop}>
            <StopIcon className={classes.buttonIcon} />
          </IconButton>
          <Typography
            variant="caption"
            className={classNames(classes.timeTypography, classes.hideSmall)}
          >
            {moment
              .unix(firstCoordinate ? firstCoordinate.time : 0)
              .format(timeFormat)}
          </Typography>
          <div onClick={this.handleSeek} className={classes.seekBar}>
            <div
              style={{ width: seekbarWidth + "%" }}
              className={classes.seeked}
            />
          </div>
          <Typography variant="caption" className={classes.timeTypography}>
            {moment.unix(time ? time : 0).format(timeFormat)}
          </Typography>
          <div className={classes.hideSmall}>/</div>
          <Typography
            variant="caption"
            className={classNames(classes.timeTypography, classes.hideSmall)}
          >
            {moment
              .unix(lastCoordinate ? lastCoordinate.time : 0)
              .format(timeFormat)}
          </Typography>
        </Toolbar>
      </Paper>
    );
  }
}

const Player = withStyles(styles)(PlayerComponent);

Player.propTypes = {
  coordinates: PropTypes.arrayOf(
    PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
      time: PropTypes.number.isRequired,
      bearing: PropTypes.number
    })
  ).isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }),

  onChangeTime: PropTypes.func,
  onChangeSpeed: PropTypes.func,
  onPlay: PropTypes.func,
  onPause: PropTypes.func,
  onStop: PropTypes.func,

  currentTime: PropTypes.number,
  speed: PropTypes.number,
  timeFormat: PropTypes.string,

  classes: PropTypes.shape({
    paper: PropTypes.string,
    seekBar: PropTypes.string,
    seeked: PropTypes.string,
    buttonIcon: PropTypes.string,
    timeTypography: PropTypes.string
  }),
  apiKey: PropTypes.string.isRequired,

  iconMarker: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  zoom: PropTypes.number
};

Player.defaultProps = {
  speeds: [-200, -100, 50, 100, 200, 500, 750, 1000],
  coordinates: [],
  timeFormat: "HH:mm:ss",
  iconMarker: {
    scale: 6,
    fillColor: blue[600],
    fillOpacity: 1,
    strokeWeight: 0
  },
  height: 500,
  center: {
    lat: 7.8731,
    lng: 80.7718
  },
  zoom: 13
};

export default Player;
