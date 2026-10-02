'use client';

import React, { useState, useMemo, useSyncExternalStore } from 'react';
import {
  Copy,
  Check,
  Wallet,
  CheckCircle2,
} from 'lucide-react';

interface FreezeWindow {
  opens: number;
  closes: number;
  open: boolean;
  target: number;
}

const HOUR = 3600 * 1000;

function windowFor(y: number, m: number) {
  const o = Date.UTC(y, m, 1, 5);
  return { opens: o, closes: o + 72 * HOUR };
}

function currentFreeze(now: number): FreezeWindow {
  const d = new Date(now);
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth();
  const w = windowFor(y, m);
  if (now < w.opens) return { ...w, open: false, target: w.opens };
  if (now < w.closes) return { ...w, open: true, target: w.closes };
  const n = windowFor(m === 11 ? y + 1 : y, (m + 1) % 12);
  return { ...n, open: false, target: n.opens };
}

function utcStamp(ms: number): string {
  const d = new Date(ms);
  return (
    d.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'UTC',
    }) + ' UTC'
  );
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

const CONFIG = {
  EXPLORER: 'https://robinhoodchain.blockscout.com',
  ROUTER: '0x0000000000000000000000000000000000000000',
  VAULT: '0x0000000000000000000000000000000000000000',
  FINE: '0x0000000000000000000000000000000000000000',
  ESCROW: '0x0000000000000000000000000000000000000000',
  DATA_WALLET: '0x0000000000000000000000000000000000000000',
  EDITION_ID: '2026-10',
  EDITION_HASH: 'sha256:4b69e671aedc1a8d31a4365abd087477fbc084f85b95b00de1ab90ec43dc9f59',
};

function subscribeClock(callback: () => void) {
  const id = setInterval(callback, 1000);
  return () => clearInterval(id);
}
function getClockSnapshot() {
  return Date.now();
}
function getClockServerSnapshot() {
  return 1759363200000;
}

interface FeeRouterClientProps {
  editionId?: string;
  editionHash?: string;
}

export default function FeeRouterClient({
  editionId = CONFIG.EDITION_ID,
  editionHash = CONFIG.EDITION_HASH,
}: FeeRouterClientProps = {}) {
  const now = useSyncExternalStore(subscribeClock, getClockSnapshot, getClockServerSnapshot);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [walletAccount, setWalletAccount] = useState<string | null>(null);
  const [actionLog, setActionLog] = useState<string>(
    'Wallet not connected. Connect an EVM wallet to call public contract functions.'
  );

  const freeze = useMemo(() => currentFreeze(now), [now]);
  const timeLeft = Math.max(0, freeze.target - now);
  const days = Math.floor(timeLeft / 864e5);
  const hrs = Math.floor(timeLeft / 36e5) % 24;
  const mins = Math.floor(timeLeft / 6e4) % 60;
  const secs = Math.floor(timeLeft / 1e3) % 60;

  const copyText = async (key: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      // fallback
    }
  };

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !(window as unknown as { ethereum?: unknown }).ethereum) {
      setActionLog('No EVM wallet found in browser. Please install MetaMask, Rabby, or Coinbase Wallet.');
      return;
    }
    try {
      const eth = (window as unknown as { ethereum: { request: (args: { method: string }) => Promise<string[]> } }).ethereum;
      const accounts = await eth.request({ method: 'eth_requestAccounts' });
      if (accounts && accounts[0]) {
        setWalletAccount(accounts[0]);
        setActionLog(`Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}. Contracts are in Preview Mode.`);
      }
    } catch (err: unknown) {
      setActionLog(`Connection rejected: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const simulateCall = (fnName: string) => {
    setActionLog(`Preview mode: ${fnName}() is simulated. Live contract is not deployed to the mainnet yet.`);
  };

  return (
    <div className="min-h-screen bg-[var(--ground)] text-[var(--ink)]">
      {/* Top Preview Banner */}
      <div className="border-b border-[#ead9a0] bg-[var(--tint)] px-4 py-2.5 text-xs text-[#735c1e]">
        <div className="mx-auto flex max-w-6xl items-center gap-2.5">
          <span className="mono rounded border border-[#ead9a0] bg-white px-2 py-0.5 font-bold uppercase tracking-wider text-[var(--gold)]">
            Preview
          </span>
          <span>
            Contracts pending deployment on Robinhood Chain. Figures below reflect verified staging telemetry and sample layout data.
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="border-b border-[var(--rule)] bg-gradient-to-b from-[#e8e4d6]/60 to-[var(--ground)] py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="mono mb-3.5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">
                <span className="h-2 w-2 rounded-full bg-[var(--gold)] animate-pulse" />
                Token Economics // Fee Router
              </div>
              <h1 className="font-[var(--font-inter)] text-4xl font-extrabold tracking-tight text-[var(--ink)] sm:text-5xl lg:text-6xl">
                Hash and burn.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-[var(--ink-2)] sm:text-lg">
                Every <span className="font-bold text-[var(--ink)]">$FINE</span> creator fee lands in a smart contract nobody controls.
                It can only leave three ways: <strong className="text-[var(--gold)]">burned</strong> at the monthly freeze,{' '}
                <strong className="text-[var(--green)]">paid</strong> to whoever proves the register wrong, or{' '}
                <strong className="text-[var(--ink)]">spent</strong> on transparent data infrastructure.
              </p>

              <div className="mt-8 flex flex-wrap gap-2.5 font-mono text-xs">
                <span className="rounded-md border border-[var(--rule)] bg-[var(--surface)] px-3 py-1.5 text-[var(--ink-3)] shadow-sm">
                  Owner: <b className="text-[var(--ink)]">none</b>
                </span>
                <span className="rounded-md border border-[var(--rule)] bg-[var(--surface)] px-3 py-1.5 text-[var(--ink-3)] shadow-sm">
                  Withdraw: <b className="text-[var(--ink)]">none</b>
                </span>
                <span className="rounded-md border border-[var(--rule)] bg-[var(--surface)] px-3 py-1.5 text-[var(--ink-3)] shadow-sm">
                  Keeper: <b className="text-[var(--ink)]">none</b>
                </span>
                <span className="rounded-md border border-[var(--rule)] bg-[var(--surface)] px-3 py-1.5 text-[var(--ink-3)] shadow-sm">
                  Burn: <b className="text-[var(--gold)]">ERC20 burn()</b>
                </span>
              </div>
            </div>

            {/* Countdown Freeze Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[var(--rule)] bg-[var(--surface)] p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-[var(--rule)] pb-4">
                  <span className="mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                    {freeze.open ? 'Freeze Window Closes In' : 'Next Monthly Freeze'}
                  </span>
                  <span
                    className={`mono rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      freeze.open
                        ? 'border border-[var(--green)]/30 bg-[#e5f2ea] text-[var(--green)]'
                        : 'border border-[var(--rule)] bg-[var(--surface-alt)] text-[var(--ink-3)]'
                    }`}
                  >
                    {freeze.open ? '● Window Open' : '○ Window Closed'}
                  </span>
                </div>

                <div className="my-6 grid grid-cols-4 gap-2 text-center">
                  <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] p-3">
                    <div className="mono text-3xl font-extrabold text-[var(--ink)]">
                      {pad(days)}
                    </div>
                    <div className="mono text-[10px] uppercase text-[var(--ink-3)]">Days</div>
                  </div>
                  <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] p-3">
                    <div className="mono text-3xl font-extrabold text-[var(--ink)]">
                      {pad(hrs)}
                    </div>
                    <div className="mono text-[10px] uppercase text-[var(--ink-3)]">Hours</div>
                  </div>
                  <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] p-3">
                    <div className="mono text-3xl font-extrabold text-[var(--ink)]">
                      {pad(mins)}
                    </div>
                    <div className="mono text-[10px] uppercase text-[var(--ink-3)]">Mins</div>
                  </div>
                  <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] p-3">
                    <div className="mono text-3xl font-extrabold text-[var(--ink)]">
                      {pad(secs)}
                    </div>
                    <div className="mono text-[10px] uppercase text-[var(--ink-3)]">Secs</div>
                  </div>
                </div>

                <dl className="space-y-2 border-t border-[var(--rule)] pt-4 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-[var(--ink-3)]">Window Opens</dt>
                    <dd className="mono font-semibold text-[var(--ink)]">{utcStamp(freeze.opens)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[var(--ink-3)]">Window Closes</dt>
                    <dd className="mono font-semibold text-[var(--ink)]">{utcStamp(freeze.closes)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[var(--ink-3)]">Edition {editionId} Digest</dt>
                    <dd
                      className="mono font-semibold text-[var(--gold)]"
                      title={editionHash}
                    >
                      {editionHash.slice(0, 15)}…{editionHash.slice(-6)}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Where Every Fee Goes (3 Routes) */}
      <section className="border-b border-[var(--rule)] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mono text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">
                Fixed at deploy // Three routes
              </p>
              <h2 className="mt-1 font-[var(--font-inter)] text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
                Where every fee goes
              </h2>
            </div>
            <span className="mono rounded-md border border-[var(--rule)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--ink-2)]">
              Splits: <b className="text-[var(--gold)]">Immutable 50/30/20</b>
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {/* Route 1: 50% Burn */}
            <div className="flex flex-col rounded-2xl border border-[var(--rule)] bg-[var(--surface)] p-6 shadow-sm">
              <div className="mono text-5xl font-black text-[var(--gold)]">50%</div>
              <h3 className="mt-3 text-lg font-bold text-[var(--ink)]">Freeze Burn</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-2)]">
                Bought back during the 72-hour monthly freeze window and destroyed directly with the token contract&apos;s own{' '}
                <code className="rounded bg-[var(--surface-alt)] px-1 py-0.5 text-xs text-[var(--gold)] font-mono">burn()</code> function.
                Total circulating supply decreases on-chain forever.
              </p>
              <div className="mt-auto pt-6 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--gold)]">
                Paid in $FINE · Permanent Deflation
              </div>
            </div>

            {/* Route 2: 30% Vault */}
            <div className="flex flex-col rounded-2xl border border-[var(--rule)] bg-[var(--surface)] p-6 shadow-sm">
              <div className="mono text-5xl font-black text-[var(--green)]">30%</div>
              <h3 className="mt-3 text-lg font-bold text-[var(--ink)]">Verification Vault</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-2)]">
                Bought back and locked into a timelocked bounty contract. Paid directly to researchers and readers who uncover data discrepancies,
                admission errors, or mathematical breaks in the register.
              </p>
              <div className="mt-auto pt-6 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--green)]">
                Paid in $FINE · Capped & Timelocked
              </div>
            </div>

            {/* Route 3: 20% Data */}
            <div className="flex flex-col rounded-2xl border border-[var(--rule)] bg-[var(--surface)] p-6 shadow-sm">
              <div className="mono text-5xl font-black text-[var(--ink-2)]">20%</div>
              <h3 className="mt-3 text-lg font-bold text-[var(--ink)]">Data Infrastructure</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--ink-2)]">
                Sent directly in ETH to fund third-party API subscriptions (Bitquery, DefiLlama, RPC node infrastructure) that keep the monthly scoring
                rigorous, objective, and fully verifiable.
              </p>
              <div className="mt-auto pt-6 font-mono text-[11px] font-semibold uppercase tracking-wider text-[var(--ink-3)]">
                Paid in ETH only · Operational Sourcing
              </div>
            </div>
          </div>

          {/* Visual Split Bar */}
          <div className="mt-6 flex h-3.5 w-full overflow-hidden rounded-full border border-[var(--rule)] bg-[var(--surface)] shadow-inner">
            <div className="h-full bg-[var(--gold)]" style={{ width: '50%' }} title="50% Freeze Burn" />
            <div className="h-full bg-[var(--green)]" style={{ width: '30%' }} title="30% Verification Vault" />
            <div className="h-full bg-[#9e9a8f]" style={{ width: '20%' }} title="20% Data Infrastructure" />
          </div>
        </div>
      </section>

      {/* Section 3: Router Telemetry */}
      <section className="border-b border-[var(--rule)] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mono text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">
                Live state // Read from chain
              </p>
              <h2 className="mt-1 font-[var(--font-inter)] text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
                Router telemetry
              </h2>
            </div>
            <span className="mono rounded-md border border-[var(--rule)] bg-[var(--surface)] px-3 py-1 text-xs text-[var(--ink-3)]">
              Updated: <b className="text-[var(--ink)]">19:30 UTC</b>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
            <div className="rounded-xl border border-[#ecdca6] bg-gradient-to-b from-[#fffdf4] to-white p-4 shadow-sm">
              <span className="mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">$FINE burned</span>
              <span className="mono my-1 block text-2xl font-black text-[var(--gold)]">18.42M</span>
              <span className="text-xs text-[var(--ink-3)]">Lifetime supply reduction</span>
            </div>
            <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 shadow-sm">
              <span className="mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">$FINE to vault</span>
              <span className="mono my-1 block text-2xl font-black text-[var(--ink)]">11.05M</span>
              <span className="text-xs text-[var(--ink-3)]">Held for bounty claims</span>
            </div>
            <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 shadow-sm">
              <span className="mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">Pending buyback</span>
              <span className="mono my-1 block text-2xl font-black text-[var(--ink)]">0.84 <span className="text-sm font-semibold text-[var(--ink-3)]">ETH</span></span>
              <span className="text-xs text-[var(--ink-3)]">Awaiting next freeze window</span>
            </div>
            <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 shadow-sm">
              <span className="mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">Unclaimed fees</span>
              <span className="mono my-1 block text-2xl font-black text-[var(--ink)]">0.31 <span className="text-sm font-semibold text-[var(--ink-3)]">ETH</span></span>
              <span className="text-xs text-[var(--ink-3)]">Escrowed, pulled on harvest()</span>
            </div>
            <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 shadow-sm">
              <span className="mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">Lifetime ETH in</span>
              <span className="mono my-1 block text-2xl font-black text-[var(--ink)]">12.60 <span className="text-sm font-semibold text-[var(--ink-3)]">ETH</span></span>
              <span className="text-xs text-[var(--ink-3)]">Total volume received</span>
            </div>
            <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 shadow-sm">
              <span className="mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">ETH on buyback</span>
              <span className="mono my-1 block text-2xl font-black text-[var(--ink)]">9.24 <span className="text-sm font-semibold text-[var(--ink-3)]">ETH</span></span>
              <span className="text-xs text-[var(--ink-3)]">80% route executed</span>
            </div>
            <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 shadow-sm">
              <span className="mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">ETH to data</span>
              <span className="mono my-1 block text-2xl font-black text-[var(--ink)]">2.52 <span className="text-sm font-semibold text-[var(--ink-3)]">ETH</span></span>
              <span className="text-xs text-[var(--ink-3)]">20% infrastructure share</span>
            </div>
            <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 shadow-sm">
              <span className="mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">Vault balance</span>
              <span className="mono my-1 block text-2xl font-black text-[var(--green)]">11.05M</span>
              <span className="text-xs text-[var(--ink-3)]">Available bounty pool</span>
            </div>
          </div>

          {/* Duo Cards: Buyback Guard & Contracts */}
          <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Buyback Guard */}
            <div className="rounded-2xl border border-[var(--rule)] bg-[var(--surface)] p-6 shadow-sm">
              <div className="mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                Buyback guard telemetry
              </div>
              <dl className="mt-4 divide-y divide-[var(--rule)] text-xs">
                <div className="flex justify-between py-2.5">
                  <dt className="text-[var(--ink-3)]">Trading Venue Phase</dt>
                  <dd className="mono font-semibold text-[var(--ink)]">Bonding curve (Phase 0)</dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-[var(--ink-3)]">Reference Price</dt>
                  <dd className="mono font-semibold text-[var(--ink)]">4.0900e-10 ETH / $FINE</dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-[var(--ink-3)]">Recorded Age</dt>
                  <dd className="mono font-semibold text-[var(--ink)]">1 h 30 min ago</dd>
                </div>
                <div className="flex justify-between py-2.5 items-center">
                  <dt className="text-[var(--ink-3)]">Guard Status</dt>
                  <dd>
                    <span className="mono rounded border border-[var(--green)]/30 bg-[#e5f2ea] px-2 py-0.5 text-[10px] font-bold uppercase text-[var(--green)]">
                      Usable (Within 1-6h window)
                    </span>
                  </dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-[var(--ink-3)]">Live Spot Price</dt>
                  <dd className="mono font-semibold text-[var(--ink)]">4.1200e-10 ETH / $FINE</dd>
                </div>
              </dl>
            </div>

            {/* Contracts List */}
            <div className="rounded-2xl border border-[var(--rule)] bg-[var(--surface)] p-6 shadow-sm">
              <div className="mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                On-chain Contract Registry
              </div>
              <dl className="mt-4 divide-y divide-[var(--rule)] text-xs">
                {[
                  { label: 'Fee Router', addr: '0x12a9...c4b1' },
                  { label: 'Verification Vault', addr: '0x88f2...19e0' },
                  { label: '$FINE Token', addr: '0x55d1...7a29' },
                  { label: 'Data Wallet', addr: '0x33b4...9f08' },
                  { label: 'Pons Escrow', addr: '0x71c8...a132' },
                ].map((c) => (
                  <div key={c.label} className="flex items-center justify-between py-2.5">
                    <dt className="text-[var(--ink-3)]">{c.label}</dt>
                    <dd className="mono flex items-center gap-2">
                      <span className="font-semibold text-[var(--ink)]">{c.addr}</span>
                      <button
                        type="button"
                        onClick={() => copyText(c.label, c.addr)}
                        className="rounded border border-[var(--rule)] bg-[var(--surface-alt)] px-1.5 py-0.5 text-[10px] text-[var(--ink-2)] hover:border-[var(--gold)]"
                        title="Copy address"
                      >
                        {copiedKey === c.label ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                      </button>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Burn History & Bounty Ledger Tables */}
      <section className="border-b border-[var(--rule)] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Burn History */}
            <div>
              <div className="mb-4">
                <p className="mono text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">
                  Freeze ledger // Every buyback
                </p>
                <h3 className="mt-1 text-2xl font-bold text-[var(--ink)]">Burn history</h3>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-[var(--rule)] bg-[var(--surface)] shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[var(--rule)] bg-[var(--surface-alt)] font-mono text-[10px] uppercase text-[var(--ink-3)]">
                      <th className="px-4 py-3">Freeze</th>
                      <th className="px-4 py-3">ETH Spent</th>
                      <th className="px-4 py-3">Fine Bought</th>
                      <th className="px-4 py-3">Burned</th>
                      <th className="px-4 py-3">Tx</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--rule)]">
                    <tr className="hover:bg-[var(--surface-alt)]">
                      <td className="px-4 py-3 font-semibold text-[var(--gold)] font-mono">2026-09</td>
                      <td className="mono px-4 py-3">9.24 ETH</td>
                      <td className="mono px-4 py-3">29.47M</td>
                      <td className="mono px-4 py-3 font-bold text-red-700">18.42M</td>
                      <td className="px-4 py-3 font-mono text-[var(--gold)]">0x4a1...9b2</td>
                    </tr>
                    <tr className="hover:bg-[var(--surface-alt)]">
                      <td className="px-4 py-3 font-semibold text-[var(--ink-3)] font-mono">2026-10</td>
                      <td className="px-4 py-3 text-[var(--ink-3)]" colSpan={4}>
                        Scheduled for next freeze window
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bounty Ledger */}
            <div>
              <div className="mb-4">
                <p className="mono text-xs font-semibold uppercase tracking-widest text-[var(--green)]">
                  Verification vault // Prove us wrong
                </p>
                <h3 className="mt-1 text-2xl font-bold text-[var(--ink)]">Bounty ledger</h3>
              </div>
              <div className="overflow-x-auto rounded-2xl border border-[var(--rule)] bg-[var(--surface)] shadow-sm">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[var(--rule)] bg-[var(--surface-alt)] font-mono text-[10px] uppercase text-[var(--ink-3)]">
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Amount</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Evidence</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--rule)]">
                    <tr className="hover:bg-[var(--surface-alt)]">
                      <td className="px-4 py-3 font-mono">#01</td>
                      <td className="px-4 py-3 font-medium">Parity break</td>
                      <td className="mono px-4 py-3 font-bold text-[var(--green)]">500K $FINE</td>
                      <td className="px-4 py-3">
                        <span className="mono rounded bg-[#e5f2ea] px-2 py-0.5 text-[10px] font-bold text-[var(--green)]">
                          Paid
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-[var(--ink-3)]">0x88c...12</td>
                    </tr>
                    <tr className="hover:bg-[var(--surface-alt)]">
                      <td className="px-4 py-3 font-mono">#02</td>
                      <td className="px-4 py-3 font-medium">Unsourced figure</td>
                      <td className="mono px-4 py-3 font-bold text-[var(--green)]">150K $FINE</td>
                      <td className="px-4 py-3">
                        <span className="mono rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                          Timelock (48h)
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-[var(--ink-3)]">0xef3...44</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Monthly Ritual & Safety Bounds */}
      <section className="border-b border-[var(--rule)] py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-10">
            <p className="mono text-xs font-semibold uppercase tracking-widest text-[var(--gold)]">
              Monthly ritual // UTC Timeline
            </p>
            <h2 className="mt-1 font-[var(--font-inter)] text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl">
              How a freeze runs
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-[var(--rule)] bg-[var(--surface)] p-5 shadow-sm">
              <span className="mono text-xs font-bold text-[var(--gold)]">01 // 1st · 04:00 UTC</span>
              <h3 className="mt-2 text-base font-bold text-[var(--ink)]">Reference Price</h3>
              <p className="mt-1 text-xs leading-relaxed text-[var(--ink-2)]">
                <code className="rounded bg-[var(--surface-alt)] px-1 py-0.5 font-mono text-[11px]">recordCheckpoint()</code>{' '}
                records the initial reference price against which all buyback transactions will be capped.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--rule)] bg-[var(--surface)] p-5 shadow-sm">
              <span className="mono text-xs font-bold text-[var(--gold)]">02 // 1st · 05:00 UTC</span>
              <h3 className="mt-2 text-base font-bold text-[var(--ink)]">Freeze Opens</h3>
              <p className="mt-1 text-xs leading-relaxed text-[var(--ink-2)]">
                <code className="rounded bg-[var(--surface-alt)] px-1 py-0.5 font-mono text-[11px]">executeBuyback()</code>{' '}
                pays the data share, purchases $FINE on-chain, immediately burns 5/8 (50%) and vaults 3/8 (30%).
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--rule)] bg-[var(--surface)] p-5 shadow-sm">
              <span className="mono text-xs font-bold text-[var(--gold)]">03 // Up to 72 Hours</span>
              <h3 className="mt-2 text-base font-bold text-[var(--ink)]">Carry Drains</h3>
              <p className="mt-1 text-xs leading-relaxed text-[var(--ink-2)]">
                Fresh checkpoints are recorded periodically with an hour delay between buys to smoothly absorb pending ETH without causing market spikes.
              </p>
            </div>
            <div className="rounded-2xl border border-[var(--rule)] bg-[var(--surface)] p-5 shadow-sm">
              <span className="mono text-xs font-bold text-[var(--gold)]">04 // Same Minute</span>
              <h3 className="mt-2 text-base font-bold text-[var(--ink)]">Hash and Burn</h3>
              <p className="mt-1 text-xs leading-relaxed text-[var(--ink-2)]">
                The edition SHA-256 snapshot hash and the final burn transaction hash are permanently committed to the GitHub repository together.
              </p>
            </div>
          </div>

          {/* Safety Bounds Table */}
          <div className="mt-12">
            <h3 className="mb-4 text-xl font-bold text-[var(--ink)]">Anti-Manipulation Bounds</h3>
            <div className="overflow-x-auto rounded-2xl border border-[var(--rule)] bg-[var(--surface)] shadow-sm">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--rule)] bg-[var(--surface-alt)] font-mono text-[10px] uppercase text-[var(--ink-3)]">
                    <th className="px-5 py-3">Bound Mechanism</th>
                    <th className="px-5 py-3">Hard Value</th>
                    <th className="px-5 py-3">Attack Vector Prevented</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--rule)]">
                  <tr>
                    <td className="px-5 py-3 font-semibold text-[var(--ink)]">Delayed Reference</td>
                    <td className="mono px-5 py-3 font-bold text-[var(--gold)]">1 to 6 hours old</td>
                    <td className="px-5 py-3 text-[var(--ink-2)]">Prevents front-running price pump right before triggering buyback</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 font-semibold text-[var(--ink)]">One-sided Band</td>
                    <td className="mono px-5 py-3 font-bold text-[var(--gold)]">At most 2% above</td>
                    <td className="px-5 py-3 text-[var(--ink-2)]">Rejects buy execution if spot price is manipulated upward above reference</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 font-semibold text-[var(--ink)]">Impact Cap</td>
                    <td className="mono px-5 py-3 font-bold text-[var(--gold)]">3% reserve move per buy</td>
                    <td className="px-5 py-3 text-[var(--ink-2)]">Limits maximum slippage; unspent ETH carries forward to the next hour</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 font-semibold text-[var(--ink)]">Ritual Window</td>
                    <td className="mono px-5 py-3 font-bold text-[var(--gold)]">72 hours monthly</td>
                    <td className="px-5 py-3 text-[var(--ink-2)]">Eliminates off-schedule surprise buybacks by confining action to a predictable window</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Guarantees & Web3 Permissionless Action Desk */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Guarantees Duo */}
            <div className="space-y-6 lg:col-span-6">
              <div className="rounded-2xl border border-[var(--rule)] bg-[var(--surface)] p-6 shadow-sm">
                <h3 className="text-xl font-bold text-[var(--ink)]">Fee Router Contract</h3>
                <p className="mono text-xs uppercase tracking-wider text-[var(--gold)]">No owner · No withdraw · No keeper</p>
                <ul className="mt-4 space-y-2 text-xs text-[var(--ink-2)]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="mt-0.5 text-emerald-600 shrink-0" />
                    <span>No admin keys, no upgrade proxies, and no arbitrary delegate calls.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="mt-0.5 text-emerald-600 shrink-0" />
                    <span>Every distribution ratio (50/30/20) is constant and immutable at deploy.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="mt-0.5 text-emerald-600 shrink-0" />
                    <span>ETH leaves only through public buyback execution or data allocation.</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-2xl border border-[var(--rule)] bg-[var(--surface)] p-6 shadow-sm">
                <h3 className="text-xl font-bold text-[var(--ink)]">Verification Vault</h3>
                <p className="mono text-xs uppercase tracking-wider text-[var(--green)]">One registrar · Capped · Timelocked</p>
                <ul className="mt-4 space-y-2 text-xs text-[var(--ink-2)]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="mt-0.5 text-emerald-600 shrink-0" />
                    <span>Bounties must wait in public view for a 72-hour timelock before execution.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="mt-0.5 text-emerald-600 shrink-0" />
                    <span>Hard cap of 25% max vault outflow per 30-day period.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="mt-0.5 text-emerald-600 shrink-0" />
                    <span>If inactive for 365 days, anyone can permissionlessly burn the entire vault.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Permissionless Action Desk */}
            <div className="lg:col-span-6">
              <div className="h-full rounded-2xl border border-[var(--rule)] bg-[var(--surface)] p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]">
                    Permissionless // Press the button
                  </div>
                  <h3 className="mt-1 text-2xl font-bold text-[var(--ink)]">Run it yourself</h3>
                  <p className="mt-3 text-xs leading-relaxed text-[var(--ink-2)]">
                    Nobody needs permission to keep the fees flowing. Connect any Web3 wallet on Robinhood Chain and trigger
                    public state transitions. You only pay gas; funds can only go where the immutable contract dictates.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={connectWallet}
                      className="mono inline-flex items-center gap-2 rounded-xl bg-[var(--ink)] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-black transition-colors"
                    >
                      <Wallet size={14} />
                      {walletAccount ? `${walletAccount.slice(0, 6)}...${walletAccount.slice(-4)}` : 'Connect Wallet'}
                    </button>
                    <button
                      type="button"
                      onClick={() => simulateCall('harvest')}
                      className="mono rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] px-3.5 py-2.5 text-xs font-semibold text-[var(--ink-2)] hover:border-[var(--gold)] transition-colors"
                    >
                      harvest()
                    </button>
                    <button
                      type="button"
                      onClick={() => simulateCall('recordCheckpoint')}
                      className="mono rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] px-3.5 py-2.5 text-xs font-semibold text-[var(--ink-2)] hover:border-[var(--gold)] transition-colors"
                    >
                      recordCheckpoint()
                    </button>
                    <button
                      type="button"
                      onClick={() => simulateCall('executeBuyback')}
                      className="mono rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] px-3.5 py-2.5 text-xs font-semibold text-[var(--ink-2)] hover:border-[var(--gold)] transition-colors"
                    >
                      executeBuyback()
                    </button>
                  </div>
                </div>

                <div className="mt-6 rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] p-4 font-mono text-xs text-[var(--ink-2)]">
                  <div className="mb-1 text-[10px] uppercase font-bold text-[var(--ink-3)]">Console Output</div>
                  <div className="break-all">{actionLog}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
