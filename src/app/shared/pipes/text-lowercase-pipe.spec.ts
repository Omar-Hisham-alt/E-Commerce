import { LowerCasePipe } from './text-lowercase.pipe';

describe('LowerCasePipe', () => {
  it('create an instance', () => {
    const pipe = new LowerCasePipe();
    expect(pipe).toBeTruthy();
  });
});
