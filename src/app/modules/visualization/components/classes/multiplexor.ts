import { Port } from './port';

export class Multiplexor {
    public name: string;
    public id: string;
    public position: {
      x: number,
      y: number
    };
    public selPorts: Port[];
    public dataPorts: Port[];
    public dataBandwidth: number;
    public selBandwidth: number;
    public keyIndex: number;
    public struct: string;
  }
