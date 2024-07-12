export class Link {
  public id?: string;
  public source: {
    id: string,
    port: string,
    magnet?: any,
  };
  public target: {
    id: string,
    port: string,
    magnet?: any,
  };
}
