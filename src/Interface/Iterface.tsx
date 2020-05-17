export interface IWalls {
  type: string;
  height: string;
  width: string;
  conductivityPercent?: number;
}
export interface IWallsTypes {
  id: any;
  name: string;
  conductivityPercent: number;
}
export interface IRouts {
  id?: any;
  name?: string;
  price?: number;
  spread?: number;
}
export interface IRout {
  id?: any;
  name?: string;
  price?: number;
  spread?: number;
}
export interface IPosition {
  room: number;
  place: number;
}
