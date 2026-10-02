import { describe, it, expect } from 'vitest';
import fs from 'node:fs';

describe('fee router route & components', () => {
  it('fee router server page exists and has metadata', () => {
    expect(fs.existsSync('app/fee-router/page.tsx')).toBe(true);
    const content = fs.readFileSync('app/fee-router/page.tsx', 'utf8');
    expect(content).toContain('metadata');
    expect(content).toContain('FeeRouterClient');
    expect(content).toContain('Masthead');
    expect(content).toContain('Footer');
  });

  it('fee router client component exists and includes core routes', () => {
    expect(fs.existsSync('src/site/components/FeeRouterClient.tsx')).toBe(true);
    const client = fs.readFileSync('src/site/components/FeeRouterClient.tsx', 'utf8');
    expect(client).toContain('Freeze Burn');
    expect(client).toContain('Verification Vault');
    expect(client).toContain('Data Infrastructure');
    expect(client).toContain('50%');
    expect(client).toContain('30%');
    expect(client).toContain('20%');
    expect(client).toContain('currentFreeze');
    expect(client).toContain('0x3c51822137a45e4f5430e268dfa722f796892df9');
    expect(client).toContain('robinscan.io');
  });

  it('menu button includes fee router link', () => {
    const menu = fs.readFileSync('src/site/components/MenuButton.tsx', 'utf8');
    expect(menu).toContain('/fee-router');
  });

  it('footer includes fee router link', () => {
    const footer = fs.readFileSync('src/site/components/Footer.tsx', 'utf8');
    expect(footer).toContain('/fee-router');
  });
});
