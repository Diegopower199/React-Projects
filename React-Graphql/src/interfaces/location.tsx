import type { CharacterType } from "./character";

export interface Location {
  id: string;
  name: string;
  type: string;
  dimension: string;
  residents?: CharacterType[];
}

export interface LocationsInfo {
  count: number;
  pages: number;
  next: number | null;
  prev: number | null;
}

export interface LocationsResponse {
  info: LocationsInfo;
  results: Location[];
}
