export class Duplicator {
    public id: string;
    public position: {
        x: number,
        y: number
    };
    public struct: string;
    public bandwidth: number;
    public duplicatedPort: string;
    public wasDuplicatedStandalone: boolean;
}
