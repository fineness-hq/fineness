import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
describe('routes', () => {
  it('edition page + json route exist', () => {
    expect(fs.existsSync('app/editions/[edition]/page.tsx')).toBe(true);
    expect(fs.existsSync('app/editions/[edition]/edition.json/route.ts')).toBe(true);
  });
  it('method + venue routes exist', () => {
    expect(fs.existsSync('app/method/page.tsx')).toBe(true);
    expect(fs.existsSync('app/venues/[id]/page.tsx')).toBe(true);
  });
});
