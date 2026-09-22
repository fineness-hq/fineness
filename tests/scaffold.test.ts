import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
describe('scaffold', () => {
  it('has tokens.css with Tera variables', () => {
    const css = fs.readFileSync('src/site/tokens.css', 'utf8');
    expect(css).toContain('--ground: #f2f0ee');
    expect(css).toContain('#e65800');
    expect(css).toContain('--band-high: #2f6b4f');
  });
  it('has layout with fonts', () => {
    const layout = fs.readFileSync('app/layout.tsx', 'utf8');
    expect(layout).toContain('Inter');
    expect(layout).toContain('Geist_Mono');
    expect(layout).toContain('IBM_Plex_Mono');
  });
});
