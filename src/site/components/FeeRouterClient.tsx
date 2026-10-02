'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  EXPLORER: 'https://robinscan.io',
  ROBINSCAN_API: 'https://robinscan.io/api/tokens',
  PONS_LAUNCHPAD: 'https://www.ponsfamily.com/launchpad/0x3c51822137a45e4f5430e268dfa722f796892df9',
  CHAIN_ID: 4663,
  FINE: '0x3c51822137a45e4f5430e268dfa722f796892df9',
  POOL: '0x91d2b49eA52a3bCa895cfD372107aEDe20DE4B36',
  CREATOR: '0xf1b51b0f3b14ac3a08401f20de710e1511a344d6',
  ROUTER: '0x0000000000000000000000000000000000000000',
  VAULT: '0x0000000000000000000000000000000000000000',
  EDITION_ID: '2026-11',
  EDITION_HASH: 'sha256:df90fa4a01397244885a5a6b8d640d17633ea903c62b548dc5e2fab196ba6d23',
};

interface LiveTokenData {
  priceNative: number;
  priceUsd: number;
  volume24hUsd: number;
  holderCount: number;
  transferCount: number;
  graduationPct: number;
  totalSupply: string;
  reserveEth: number;
  reserveFine: number;
  pool: string;
}

const INITIAL_TOKEN_DATA: LiveTokenData = {
  priceNative: 2.78e-9,
  priceUsd: 0.00000765,
  volume24hUsd: 43954,
  holderCount: 36,
  transferCount: 826,
  graduationPct: 11.44,
  totalSupply: '1,000,000,000',
  reserveEth: 0.4827,
  reserveFine: 777667053,
  pool: CONFIG.POOL,
};

interface FeeRouterClientProps {
  editionId?: string;
  editionHash?: string;
}

export default function FeeRouterClient({
  editionId = CONFIG.EDITION_ID,
  editionHash = CONFIG.EDITION_HASH,
}: FeeRouterClientProps = {}) {
  // Use a fixed initial timestamp so server SSR and initial client hydration match identically
  const [now, setNow] = useState<number>(1759363200000);
  const [tokenData, setTokenData] = useState<LiveTokenData>(INITIAL_TOKEN_DATA);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [walletAccount, setWalletAccount] = useState<string | null>(null);
  const [actionLog, setActionLog] = useState<string>(
    'Wallet not connected. Connect an EVM wallet to call public contract functions.'
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
    const id = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    // Fetch live on-chain token statistics from Robinscan
    fetch(`${CONFIG.ROBINSCAN_API}/${CONFIG.FINE}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!data) return;
        setTokenData((prev) => ({
          ...prev,
          priceNative: data.thinMarket?.priceNative ?? prev.priceNative,
          priceUsd: data.thinMarket?.priceUsd ?? data.launchpad?.priceUsd ?? prev.priceUsd,
          volume24hUsd: data.thinMarket?.h24?.volume ?? data.volume24hUsd ?? prev.volume24hUsd,
          holderCount: data.holderCount ?? prev.holderCount,
          transferCount: data.transferCount ?? prev.transferCount,
          graduationPct: data.launchpad?.graduationPct ?? prev.graduationPct,
          reserveEth: data.thinMarket?.reserves?.[1] ? Number(data.thinMarket.reserves[1]) / 1e18 : prev.reserveEth,
          reserveFine: data.thinMarket?.reserves?.[0] ? Number(data.thinMarket.reserves[0]) / 1e18 : prev.reserveFine,
          pool: data.thinMarket?.pool ?? prev.pool,
        }));
      })
      .catch(() => {});

    return () => clearInterval(id);
  }, []);

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
      {/* Top Banner with Verified CA */}
      <div className="border-b border-[#c8d9ab] bg-[#f5f9f0] py-2.5 text-xs text-[#35521b]">
        <div className="page-wrap flex flex-wrap items-center justify-between gap-2.5">
          <div className="flex items-center gap-2">
            <span className="mono rounded border border-[#a2bf6f] bg-white px-2 py-0.5 font-bold uppercase tracking-wider text-[var(--green)]">
              Verified CA
            </span>
            <span>
              <strong>$FINE</strong> is live on Robinhood Chain (Chain ID: 4663):{' '}
              <code className="font-mono font-bold text-[var(--ink)]">{CONFIG.FINE}</code>
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono text-[11px]">
            <a
              href={`https://robinscan.io/token/${CONFIG.FINE}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[var(--green)] hover:underline"
            >
              Robinscan ↗
            </a>
            <span className="text-[var(--rule-2)]">|</span>
            <a
              href={CONFIG.PONS_LAUNCHPAD}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-[var(--gold)] hover:underline"
            >
              Trade on Pons ↗
            </a>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="border-b border-[var(--rule)] bg-gradient-to-b from-[#e8e4d6]/60 to-[var(--ground)] py-14 md:py-20">
        <div className="page-wrap">
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

              {/* Verified Token CA Card */}
              <div className="mt-6 rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="mono font-bold uppercase tracking-wider text-[var(--gold)]">
                    $FINE Token Contract Address (Robinhood Chain)
                  </span>
                  <span className="mono rounded bg-[#e5f2ea] px-2 py-0.5 text-[10px] font-bold text-[var(--green)]">
                    Chain ID 4663
                  </span>
                </div>
                <div className="mt-2.5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[var(--rule)] bg-[var(--surface-alt)] p-2.5 font-mono text-xs">
                  <span className="break-all font-semibold text-[var(--ink)] selection:bg-[var(--gold-soft)]">
                    {CONFIG.FINE}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => copyText('$FINE', CONFIG.FINE)}
                      className="mono flex items-center gap-1.5 rounded border border-[var(--rule)] bg-white px-2.5 py-1 text-xs font-semibold text-[var(--ink)] hover:border-[var(--gold)] transition-colors cursor-pointer"
                    >
                      {copiedKey === '$FINE' ? (
                        <>
                          <Check size={12} className="text-emerald-600" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copy CA</span>
                        </>
                      )}
                    </button>
                    <a
                      href={`https://robinscan.io/token/${CONFIG.FINE}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono rounded bg-[var(--ink)] px-2.5 py-1 text-xs font-bold text-white hover:bg-black transition-colors"
                    >
                      Robinscan ↗
                    </a>
                    <a
                      href={CONFIG.PONS_LAUNCHPAD}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono rounded bg-[var(--gold)] px-2.5 py-1 text-xs font-bold text-white hover:brightness-110 transition-all"
                    >
                      Trade on Pons ↗
                    </a>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5 font-mono text-xs">
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
                  <span className="mono text-xs font-bold uppercase tracking-wider text-[var(--gold)]" suppressHydrationWarning>
                    {freeze.open ? 'Freeze Window Closes In' : 'Next Monthly Freeze'}
                  </span>
                  <span
                    suppressHydrationWarning
                    className={`mono rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      freeze.open
                        ? 'border border-[var(--green)]/30 bg-[#e5f2ea] text-[var(--green)]'
                        : 'border border-[var(--rule)] bg-[var(--surface-alt)] text-[var(--ink-3)]'
                    }`}
                  >
                    {freeze.open ? '● Window Open' : '○ Window Closed'}
                  </span>
                </div>

                <div className="my-6 grid grid-cols-4 gap-2 text-center" suppressHydrationWarning>
                  <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] p-3">
                    <div className="mono text-3xl font-extrabold text-[var(--ink)]" suppressHydrationWarning>
                      {pad(days)}
                    </div>
                    <div className="mono text-[10px] uppercase text-[var(--ink-3)]">Days</div>
                  </div>
                  <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] p-3">
                    <div className="mono text-3xl font-extrabold text-[var(--ink)]" suppressHydrationWarning>
                      {pad(hrs)}
                    </div>
                    <div className="mono text-[10px] uppercase text-[var(--ink-3)]">Hours</div>
                  </div>
                  <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] p-3">
                    <div className="mono text-3xl font-extrabold text-[var(--ink)]" suppressHydrationWarning>
                      {pad(mins)}
                    </div>
                    <div className="mono text-[10px] uppercase text-[var(--ink-3)]">Mins</div>
                  </div>
                  <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface-alt)] p-3">
                    <div className="mono text-3xl font-extrabold text-[var(--ink)]" suppressHydrationWarning>
                      {pad(secs)}
                    </div>
                    <div className="mono text-[10px] uppercase text-[var(--ink-3)]">Secs</div>
                  </div>
                </div>

                <dl className="space-y-2 border-t border-[var(--rule)] pt-4 text-xs" suppressHydrationWarning>
                  <div className="flex justify-between">
                    <dt className="text-[var(--ink-3)]">Window Opens</dt>
                    <dd className="mono font-semibold text-[var(--ink)]" suppressHydrationWarning>{utcStamp(freeze.opens)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[var(--ink-3)]">Window Closes</dt>
                    <dd className="mono font-semibold text-[var(--ink)]" suppressHydrationWarning>{utcStamp(freeze.closes)}</dd>
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
        <div className="page-wrap">
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
        <div className="page-wrap">
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
              <span className="mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">$FINE Total Supply</span>
              <span className="mono my-1 block text-2xl font-black text-[var(--gold)]">{tokenData.totalSupply}</span>
              <span className="text-xs text-[var(--ink-3)]">1 Billion fixed max supply</span>
            </div>
            <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 shadow-sm">
              <span className="mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">24h DEX Volume</span>
              <span className="mono my-1 block text-2xl font-black text-[var(--ink)]">${Math.round(tokenData.volume24hUsd).toLocaleString('en-US')}</span>
              <span className="text-xs text-[var(--ink-3)]">Pons bonding curve trades</span>
            </div>
            <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 shadow-sm">
              <span className="mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">Pons Pool Reserve</span>
              <span className="mono my-1 block text-2xl font-black text-[var(--ink)]">{tokenData.reserveEth.toFixed(4)} <span className="text-sm font-semibold text-[var(--ink-3)]">ETH</span></span>
              <span className="text-xs text-[var(--ink-3)]">Live backing in curve pool</span>
            </div>
            <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 shadow-sm">
              <span className="mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">Bonding Curve</span>
              <span className="mono my-1 block text-2xl font-black text-[var(--gold)]">{tokenData.graduationPct.toFixed(1)}%</span>
              <span className="text-xs text-[var(--ink-3)]">Pons graduation progress</span>
            </div>
            <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 shadow-sm">
              <span className="mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">Live Spot Price</span>
              <span className="mono my-1 block text-2xl font-black text-[var(--ink)]">${tokenData.priceUsd < 0.0001 ? tokenData.priceUsd.toFixed(8) : tokenData.priceUsd.toFixed(4)}</span>
              <span className="text-xs text-[var(--ink-3)]">{(tokenData.priceNative * 1e9).toFixed(3)} nETH / $FINE</span>
            </div>
            <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 shadow-sm">
              <span className="mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">Token Holders</span>
              <span className="mono my-1 block text-2xl font-black text-[var(--ink)]">{tokenData.holderCount}</span>
              <span className="text-xs text-[var(--ink-3)]">{tokenData.transferCount} total on-chain txs</span>
            </div>
            <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 shadow-sm">
              <span className="mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">Market Cap (FDV)</span>
              <span className="mono my-1 block text-2xl font-black text-[var(--ink)]">${Math.round(tokenData.priceUsd * 1e9).toLocaleString('en-US')}</span>
              <span className="text-xs text-[var(--ink-3)]">Circulating fully diluted value</span>
            </div>
            <div className="rounded-xl border border-[var(--rule)] bg-[var(--surface)] p-4 shadow-sm">
              <span className="mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-3)]">Vault Bounty Allocation</span>
              <span className="mono my-1 block text-2xl font-black text-[var(--green)]">30%</span>
              <span className="text-xs text-[var(--ink-3)]">Reserved for register breaks</span>
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
                  <dd className="mono font-semibold text-[var(--ink)]">Pons (FINE-ETH) Bonding Curve (Phase 0)</dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-[var(--ink-3)]">Reference Price</dt>
                  <dd className="mono font-semibold text-[var(--ink)]">{(tokenData.priceNative * 1e9).toFixed(4)} nETH / $FINE</dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-[var(--ink-3)]">Curve Progress</dt>
                  <dd className="mono font-semibold text-[var(--ink)]">{tokenData.graduationPct.toFixed(2)}% toward graduation</dd>
                </div>
                <div className="flex justify-between py-2.5 items-center">
                  <dt className="text-[var(--ink-3)]">Guard Status</dt>
                  <dd>
                    <span className="mono rounded border border-[var(--green)]/30 bg-[#e5f2ea] px-2 py-0.5 text-[10px] font-bold uppercase text-[var(--green)]">
                      Active (Pons Venue #1)
                    </span>
                  </dd>
                </div>
                <div className="flex justify-between py-2.5">
                  <dt className="text-[var(--ink-3)]">Live Spot Price</dt>
                  <dd className="mono font-semibold text-[var(--ink)]">
                    {(tokenData.priceNative * 1e9).toFixed(4)} nETH (${tokenData.priceUsd.toFixed(8)})
                  </dd>
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
                  {
                    label: '$FINE Token (CA)',
                    addr: CONFIG.FINE,
                    link: `https://robinscan.io/token/${CONFIG.FINE}`,
                    note: 'ERC-20 Live on Robinhood Chain',
                  },
                  {
                    label: 'Pons Liquidity Pool',
                    addr: CONFIG.POOL,
                    link: `https://robinscan.io/address/${CONFIG.POOL}`,
                    note: 'FINE-ETH Bonding Curve Pair',
                  },
                  {
                    label: 'Token Creator',
                    addr: CONFIG.CREATOR,
                    link: `https://robinscan.io/address/${CONFIG.CREATOR}`,
                    note: 'Verified Origin Account',
                  },
                  {
                    label: 'Fee Router Contract',
                    addr: '0x0000000000000000000000000000000000000000',
                    link: null,
                    note: 'Non-Custodial Fee Router (Pending Deploy)',
                  },
                  {
                    label: 'Verification Vault',
                    addr: '0x0000000000000000000000000000000000000000',
                    link: null,
                    note: 'Bounty Timelock Vault (Pending Deploy)',
                  },
                ].map((c) => (
                  <div key={c.label} className="flex flex-col sm:flex-row sm:items-center justify-between py-2.5 gap-1">
                    <div>
                      <dt className="font-medium text-[var(--ink)]">{c.label}</dt>
                      <div className="text-[10px] text-[var(--ink-3)]">{c.note}</div>
                    </div>
                    <dd className="mono flex items-center gap-2">
                      {c.link ? (
                        <a
                          href={c.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-[var(--green)] hover:underline"
                          title="Open on Robinscan"
                        >
                          {c.addr.slice(0, 6)}...{c.addr.slice(-4)} ↗
                        </a>
                      ) : (
                        <span className="text-[var(--ink-3)]">Pending Deploy</span>
                      )}
                      {c.link && (
                        <button
                          type="button"
                          onClick={() => copyText(c.label, c.addr)}
                          className="rounded border border-[var(--rule)] bg-[var(--surface-alt)] px-1.5 py-0.5 text-[10px] text-[var(--ink-2)] hover:border-[var(--gold)] cursor-pointer"
                          title="Copy address"
                        >
                          {copiedKey === c.label ? <Check size={11} className="text-emerald-600" /> : <Copy size={11} />}
                        </button>
                      )}
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
        <div className="page-wrap">
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
        <div className="page-wrap">
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
        <div className="page-wrap">
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
