export class Port {
  public parentElementId?: string;
  public parentElementPosition?: {
    x: number,
    y: number
  };
  public id: string;
  public name: string;
  public bandwidth?: number;
  public direction: string;
  public standalone?: boolean;
  public bit?: boolean;
  public struct?: string;
}
