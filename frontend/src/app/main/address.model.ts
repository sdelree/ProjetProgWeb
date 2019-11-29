export interface AddressProperties {
  label: string;
  score: number;
  housenumber: string;
  id: string;
  type: string;
  name: string;
  postcode: string;
  citycode: string;
  x: number;
  y: number;
  city: string;
  context: string;
  importance: number;
  street: string;
}

export interface AddressGeometry {
  type: string;
  coordinates: [number, number];
}

export interface Address {
  type: string;
  geometry: AddressGeometry;
  properties: AddressProperties;
}

export interface AddressList {
  type: string;
  version: string;
  features: Address[];
  attribution: string;
  license: string;
  query: string;
  limit: number;
}
