export class JumpToDefinitionError extends Error {
  constructor(message: string, name: string) {
    super(message);
    this.name = name;
  }
}
