export interface Cable {
  name: string;
  value: number;
  unit: string;
}

export interface CableType {
  [key: string]: Cable[];
}

export interface CableData {
  cables: { [key: string]: CableType };
}
