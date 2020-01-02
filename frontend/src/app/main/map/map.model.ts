export interface MapMarker {
  coordinates: [number, number];
  popupMessage: string;
  iconType: MapIconType;
}

export enum MapIconType {
  GREEN = 'GREEN',
  BLUE = 'BLUE',
  RED = 'RED',
  DEFAULT = 'DEFAULT'
}
