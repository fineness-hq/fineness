import { describe, it, expect } from 'vitest';
import { parseWeights, serializeWeights } from './weight-url';
import { HOUSE_WEIGHTS } from '../scoring/fineness';
describe('weight url', () => {
  it('round trip', () => { expect(parseWeights(serializeWeights(HOUSE_WEIGHTS))).toEqual(HOUSE_WEIGHTS); });
  it('parse ?w=6,5,4,3,2 to house', () => { expect(parseWeights('?w=6,5,4,3,2')).toEqual(HOUSE_WEIGHTS); });
  it('empty falls back to house', () => { expect(parseWeights('')).toEqual(HOUSE_WEIGHTS); });
});
