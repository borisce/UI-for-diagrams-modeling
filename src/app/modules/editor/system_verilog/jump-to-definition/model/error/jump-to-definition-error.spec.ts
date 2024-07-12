import { JumpToDefinitionError } from './jump-to-definition-error';

describe('JumpToDefinitionError', () => {
  it('should create an instance', (m) => {
    expect(new JumpToDefinitionError('', '')).toBeTruthy();
  });
});
