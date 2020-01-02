export interface Parking {
  name: string;
  state: ParkingState;
  freePlaces: number;
  maxVehicleHeight: number;
  location: [number, number];
  places: ParkingPlaces;
  prices: ParkingPrices;
}

export interface ParkingPlaces {
  total: number;
  electric: number;
}

export interface ParkingPrices {
  fifteenMinutes: number;
  halfAnHour: number;
  oneHour: number;
  twoHours: number;
  threeHours: number;
  fourHours: number;
  tenHours: number;
  twentyFourHours: number;
  night: number;
}

export enum ParkingState {
  full = 'full',
  free = 'free',
  closed = 'closed',
  open = 'open'
}
