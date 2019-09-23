import * as React from "react";
import { height } from "@material-ui/system";
import {} from "googlemaps";

interface LatLng {
    lat:number;
    lng:number;
}

interface Coordinate extends LatLng {
  time: number;
  bearing?: number;
  marker?: boolean;
  infoWindow?: google.maps.InfoWindowOptions;
  [x:string]: any;
}

export interface PlayerProps {
  coordinates: Coordinate[];
  apiKey: string;
  onChangeTime?: (time: number) => void;
  onChangeSpeed?: (time: number) => void;
  onPlay?: (time: number) => void;
  onPause?: (time: number) => void;
  onStop?: (time: number) => void;
  center?: LatLng,
  currentTime?: number;
  speed?: number;
  timeFormat?: string;
  classes?: {
    paper?: string;
    seekBar?: string;
    seeked?: string;
    buttonIcon?: string;
    timeTypography?: string;
  };
  iconMarker?: {
    [x: string]: any;
  };
  width?: number | string;
  height?: number | string;
  zoom?: number;
}

declare class Player extends React.Component<PlayerProps> {
  constructor(props: PlayerProps);
}

export default Player;
