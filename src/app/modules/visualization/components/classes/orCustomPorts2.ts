import { Port } from './port';

  export class OrCustomPorts2 {
    public name: string;
    public id: string;
    public bandwidth: number;
    public inPortsAmount: number;
    public position: {
      x: number,
      y: number
    };
    public inPorts: Port[];
  }