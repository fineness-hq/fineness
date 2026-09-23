/**
 * Fineness Purity Register Tables Component
 * Renders The Karat Scale, Ranked Register, Comparison, and Regulated Standing tables.
 * Data sourced from Fineness Edition 2026-11.
 * Features Framer-grade Spring Animations, Number Counters, Staggered Waves, and Corner Marks.
 */
(() => {
  const VENUES = [
    {
      rank: 1,
      id: "pons",
      name: "Pons",
      chain: "robinhood-chain",
      fineness: 745,
      band: "14k",
      scores: { asset: 6, traction: 10, transparency: 8, compliance: 5, durability: 8 },
      pairing: { assetType: "tokenized-equity", custodian: "Robinhood Europe", redeemable: false, verifiability: "attestation" },
      metrics: { dailyVolumeUsd: "$544M", cumulativeVolumeUsd: "$12.0B", fees24hUsd: "$5.95M" },
      thesis: "Pons moves the highest daily flow in the register against thinner asset backing."
    },
    {
      rank: 2,
      id: "long-xyz",
      name: "Long.xyz",
      chain: "arbitrum",
      fineness: 720,
      band: "14k",
      scores: { asset: 8, traction: 8, transparency: 6, compliance: 6, durability: 7 },
      pairing: { assetType: "tokenized-equity", custodian: "Apex Clearing", redeemable: false, verifiability: "on-chain" },
      metrics: { dailyVolumeUsd: "$425M", cumulativeVolumeUsd: "$1.0B", fees24hUsd: "$1.2M" },
      thesis: "Broadest selection of high-liquidity stock synthetic and wrapped pairs."
    },
    {
      rank: 3,
      id: "stonkfun",
      name: "StonkFun",
      chain: "base",
      fineness: 615,
      band: "14k",
      scores: { asset: 6, traction: 7, transparency: 7, compliance: 4, durability: 6 },
      pairing: { assetType: "inventory-index", custodian: "First Ledger", redeemable: false, verifiability: "public-inventory" },
      metrics: { dailyVolumeUsd: "$41M", cumulativeVolumeUsd: "$890M", fees24hUsd: "$450K" },
      thesis: "High retail participation with frequent public inventory attestations."
    },
    {
      rank: 4,
      id: "pools-trade",
      name: "Pools.trade",
      chain: "ethereum",
      fineness: 590,
      band: "14k",
      scores: { asset: 3, traction: 5, transparency: 9, compliance: 7, durability: 9 },
      pairing: { assetType: "inventory-index", custodian: "DriveWealth", redeemable: true, verifiability: "on-chain" },
      metrics: { dailyVolumeUsd: "$2.8M", cumulativeVolumeUsd: "$120M", fees24hUsd: "$28K" },
      thesis: "Exceptional contract transparency and direct redemption pathways."
    },
    {
      rank: 5,
      id: "flap",
      name: "Flap",
      chain: "solana",
      fineness: 560,
      band: "9k",
      scores: { asset: 7, traction: 4, transparency: 6, compliance: 4, durability: 7 },
      pairing: { assetType: "tokenized-equity", custodian: "Alpaca Securities", redeemable: false, verifiability: "attestation" },
      metrics: { dailyVolumeUsd: "$8.4M", cumulativeVolumeUsd: "$310M", fees24hUsd: "$92K" },
      thesis: "Solana-based fast equity trading venue backed by third-party broker attestation."
    },
    {
      rank: 6,
      id: "pair",
      name: "PAIR",
      chain: "polygon",
      fineness: 555,
      band: "9k",
      scores: { asset: 6, traction: 4, transparency: 8, compliance: 4, durability: 6 },
      pairing: { assetType: "synthetic", custodian: "Interactive Brokers", redeemable: false, verifiability: "on-chain" },
      metrics: { dailyVolumeUsd: "$1.9M", cumulativeVolumeUsd: "$96M", fees24hUsd: "$21K" },
      thesis: "Synthetic commodity & equity collateralization verified on Polygon."
    },
    {
      rank: 7,
      id: "bankr",
      name: "Bankr",
      chain: "optimism",
      fineness: 470,
      band: "9k",
      scores: { asset: 4, traction: 4, transparency: 7, compliance: 4, durability: 5 },
      pairing: { assetType: "synthetic", custodian: "Paxos Trust", redeemable: false, verifiability: "none" },
      metrics: { dailyVolumeUsd: "—", cumulativeVolumeUsd: "—", fees24hUsd: "—" },
      thesis: "Emerging synthetic protocol; lacks direct primary redemption verification."
    },
    {
      rank: 8,
      id: "cardpad",
      name: "Cardpad",
      chain: "avalanche",
      fineness: 425,
      band: "9k",
      scores: { asset: 3, traction: 2, transparency: 9, compliance: 5, durability: 3 },
      pairing: { assetType: "collectible", custodian: "Prime Trust", redeemable: false, verifiability: "attestation" },
      metrics: { dailyVolumeUsd: "—", cumulativeVolumeUsd: "—", fees24hUsd: "—" },
      thesis: "Physical collectible vault tokens evaluated under preliminary framework."
    },
    {
      rank: 9,
      id: "factory-new",
      name: "Factory New",
      chain: "solana",
      fineness: 350,
      band: "below-hallmark",
      scores: { asset: 4, traction: 2, transparency: 6, compliance: 2, durability: 3 },
      pairing: { assetType: "none", custodian: "Self-custodied pool", redeemable: false, verifiability: "none" },
      metrics: { dailyVolumeUsd: "—", cumulativeVolumeUsd: "—", fees24hUsd: "—" },
      thesis: "Falls below Hallmark 375; lack of named institutional custodian."
    },
    {
      rank: 10,
      id: "csl",
      name: "CSL",
      chain: "binance",
      fineness: 220,
      band: "below-hallmark",
      scores: { asset: 2, traction: 1, transparency: 5, compliance: 1, durability: 2 },
      pairing: { assetType: "none", custodian: "Unlicensed offshore", redeemable: false, verifiability: "none" },
      metrics: { dailyVolumeUsd: "—", cumulativeVolumeUsd: "—", fees24hUsd: "—" },
      thesis: "High counterparty risk; opacity on backing reserve audits."
    }
  ];

  const KARAT_SCALE = [
    { band: "22k", range: "916 and above", desc: "Highest bullion grade; full asset backing & institutional custody" },
    { band: "18k", range: "750 to 915", desc: "Strong reserve backing with verified legal redemption rights" },
    { band: "14k", range: "585 to 749", desc: "Standard institutional tokenized venue tier; active market traction" },
    { band: "9k", range: "375 to 584", desc: "Commercial minimum hallmark; speculative backing or partial coverage" },
    { band: "Below hallmark", range: "Under 375", desc: "Listed on register, not certified. High counterparty or audit risk" }
  ];

  function bandClass(band) {
    if (band === '22k' || band === '18k') return 'fn-band-high fn-band-18k';
    if (band === '14k') return 'fn-band-mid fn-band-14k';
    if (band === '9k') return 'fn-band-low fn-band-9k';
    return 'fn-band-none fn-band-below';
  }

  function cornerCrosses() {
    return `
      <span class="fn-cross fn-cross-tl">+</span>
      <span class="fn-cross fn-cross-tr">+</span>
      <span class="fn-cross fn-cross-bl">+</span>
      <span class="fn-cross fn-cross-br">+</span>
    `;
  }

  function animateCounter(el, target, duration = 800) {
    if (el.dataset.animated === 'true') return;
    el.dataset.animated = 'true';
    const start = 0;
    const startTime = performance.now();

    function update(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * ease);
      el.textContent = current;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  function createScaleAndRegisterSection() {
    const wrap = document.createElement('section');
    wrap.id = 'fineness-register-section';
    wrap.className = 'fn-section-wrap';
    wrap.setAttribute('aria-label', 'Fineness Karat Scale and Ranked Register');

    wrap.innerHTML = `
      <!-- Scale Table -->
      <div id="scale" class="fn-animate-block" style="margin-bottom: 72px;">
        <p class="fn-eyebrow">01 / scale</p>
        <h2 class="fn-title">The Karat Scale</h2>
        <p class="fn-desc">
          Bullion purity framework applied to tokenized asset venues. Scoring from 0 to 1000 parts per thousand.
          Venues below 375 fall beneath the commercial hallmark threshold.
        </p>
        <div class="fn-table-box">
          ${cornerCrosses()}
          <table class="fn-table" aria-label="Karat Scale Standards">
            <thead>
              <tr>
                <th style="width: 140px;">Band</th>
                <th style="width: 180px;">Fineness Score</th>
                <th>Standard & Description</th>
              </tr>
            </thead>
            <tbody>
              ${KARAT_SCALE.map((k, idx) => `
                <tr style="transition-delay: ${idx * 45}ms;">
                  <td>
                    <span class="fn-band-badge ${k.band.includes('22') || k.band.includes('18') ? 'fn-band-18k' : k.band.includes('14') ? 'fn-band-14k' : k.band.includes('9') ? 'fn-band-9k' : 'fn-band-below'}">
                      <span class="fn-dot"></span>${k.band}
                    </span>
                  </td>
                  <td class="fn-mono" style="font-weight: 600;">${k.range}</td>
                  <td style="color: var(--fn-ink-muted);">${k.desc}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Ranked Register Table -->
      <div id="register" class="fn-animate-block">
        <p class="fn-eyebrow">02 / register</p>
        <div class="fn-filter-bar">
          <div>
            <h2 class="fn-title" style="margin: 0;">The Ranked Register</h2>
            <p class="fn-desc" style="margin: 6px 0 0 0;">
              Edition 2026-11 · Evaluated across 5 criteria (Asset, Traction, Transparency, Compliance, Durability).
            </p>
          </div>
          <div class="fn-filter-group" id="fn-band-filters">
            <button class="fn-filter-btn active" data-filter="all">All (10)</button>
            <button class="fn-filter-btn" data-filter="14k">14k</button>
            <button class="fn-filter-btn" data-filter="9k">9k</button>
            <button class="fn-filter-btn" data-filter="below-hallmark">Below Hallmark</button>
          </div>
        </div>

        <div class="fn-table-box">
          ${cornerCrosses()}
          <table class="fn-table" id="fn-register-table" aria-label="Ranked Venues List">
            <thead>
              <tr>
                <th style="width: 52px;">#</th>
                <th>Venue</th>
                <th style="width: 120px;">Fineness</th>
                <th style="width: 120px;">Band</th>
                <th>Asset Backing</th>
                <th>Daily Vol</th>
                <th style="width: 80px; text-align: center;">Details</th>
              </tr>
            </thead>
            <tbody id="fn-register-tbody">
            </tbody>
          </table>
        </div>
        <p class="fn-mono" style="font-size: 11px; color: var(--fn-ink-muted);">
          Click any venue row to view detailed score breakdown and risk thesis.
        </p>
      </div>
    `;

    return wrap;
  }

  function renderRegisterRows(filter = 'all') {
    const tbody = document.getElementById('fn-register-tbody');
    if (!tbody) return;

    let filtered = VENUES;
    if (filter !== 'all') {
      filtered = VENUES.filter(v => v.band === filter);
    }

    const cutIndex = filtered.findIndex(v => v.fineness < 375);

    let html = '';
    filtered.forEach((v, idx) => {
      if (filter === 'all' && idx === cutIndex) {
        html += `
          <tr class="fn-cutline" style="transition-delay: ${idx * 45}ms;">
            <td colspan="7" class="fn-cutline-cell">
              HALLMARK 375 THRESHOLD <span>— Venues listed below this line are not certified</span>
            </td>
          </tr>
        `;
      }

      html += `
        <tr class="fn-clickable" data-venue-id="${v.id}" style="transition-delay: ${(idx + 1) * 45}ms;">
          <td class="fn-mono fn-rank">#${v.rank}</td>
          <td>
            <div class="fn-venue-name">
              ${v.name}
              <span class="fn-chain-tag">${v.chain}</span>
            </div>
          </td>
          <td class="fn-mono fn-fineness-score" data-counter="${v.fineness}">${v.fineness}</td>
          <td>
            <span class="fn-band-badge ${bandClass(v.band)}">
              <span class="fn-dot"></span>${v.band}
            </span>
          </td>
          <td style="color: var(--fn-ink-muted); font-size: 12px;">
            ${v.pairing.assetType} · ${v.pairing.custodian || 'Unlicensed/Pool'}
          </td>
          <td class="fn-mono" style="color: var(--fn-ink-muted);">${v.metrics.dailyVolumeUsd}</td>
          <td style="text-align: center;">
            <span class="fn-expand-icon">▼</span>
          </td>
        </tr>
        <tr class="fn-detail-row" id="fn-detail-${v.id}">
          <td colspan="7">
            <div class="fn-detail-wrapper" id="fn-detail-wrap-${v.id}">
              <div class="fn-detail-content">
                <div>
                  <div class="fn-detail-thesis">"${v.thesis}"</div>
                  <div class="fn-score-grid">
                    <div class="fn-score-card">
                      <div class="fn-score-label">Asset</div>
                      <div class="fn-score-val">${v.scores.asset}/10</div>
                    </div>
                    <div class="fn-score-card">
                      <div class="fn-score-label">Traction</div>
                      <div class="fn-score-val">${v.scores.traction}/10</div>
                    </div>
                    <div class="fn-score-card">
                      <div class="fn-score-label">Transp.</div>
                      <div class="fn-score-val">${v.scores.transparency}/10</div>
                    </div>
                    <div class="fn-score-card">
                      <div class="fn-score-label">Compl.</div>
                      <div class="fn-score-val">${v.scores.compliance}/10</div>
                    </div>
                    <div class="fn-score-card">
                      <div class="fn-score-label">Durab.</div>
                      <div class="fn-score-val">${v.scores.durability}/10</div>
                    </div>
                  </div>
                </div>
                <div class="fn-metrics-list">
                  <div class="fn-metrics-item">
                    <span>Custodian:</span>
                    <span class="fn-metrics-val">${v.pairing.custodian || 'None'}</span>
                  </div>
                  <div class="fn-metrics-item">
                    <span>Redeemable:</span>
                    <span class="fn-metrics-val">${v.pairing.redeemable ? 'Yes' : 'No'}</span>
                  </div>
                  <div class="fn-metrics-item">
                    <span>Verifiability:</span>
                    <span class="fn-metrics-val">${v.pairing.verifiability}</span>
                  </div>
                  <div class="fn-metrics-item">
                    <span>Cumulative Vol:</span>
                    <span class="fn-metrics-val">${v.metrics.cumulativeVolumeUsd}</span>
                  </div>
                  <div class="fn-metrics-item">
                    <span>24h Fees:</span>
                    <span class="fn-metrics-val">${v.metrics.fees24hUsd}</span>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      `;
    });

    tbody.innerHTML = html;

    // Attach smooth accordion click handlers
    tbody.querySelectorAll('tr.fn-clickable').forEach(tr => {
      tr.addEventListener('click', () => {
        const id = tr.dataset.venueId;
        const detailWrap = document.getElementById(`fn-detail-wrap-${id}`);
        const isOpen = tr.classList.contains('fn-expanded');

        // Close all other open accordions smoothly
        tbody.querySelectorAll('tr.fn-clickable.fn-expanded').forEach(otherTr => {
          if (otherTr !== tr) {
            otherTr.classList.remove('fn-expanded');
            const otherId = otherTr.dataset.venueId;
            const otherWrap = document.getElementById(`fn-detail-wrap-${otherId}`);
            if (otherWrap) otherWrap.classList.remove('fn-open');
          }
        });

        if (isOpen) {
          tr.classList.remove('fn-expanded');
          if (detailWrap) detailWrap.classList.remove('fn-open');
        } else {
          tr.classList.add('fn-expanded');
          if (detailWrap) detailWrap.classList.add('fn-open');
        }
      });
    });

    // Run counters if container is already visible
    const regBlock = document.getElementById('register');
    if (regBlock && regBlock.classList.contains('fn-visible')) {
      tbody.querySelectorAll('[data-counter]').forEach(c => {
        animateCounter(c, parseInt(c.dataset.counter, 10));
      });
    }
  }

  function setupFilters() {
    const filterBtns = document.querySelectorAll('#fn-band-filters button');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderRegisterRows(btn.dataset.filter);
      });
    });
  }

  function createComparisonAndRegulatedSection() {
    const wrap = document.createElement('section');
    wrap.id = 'fineness-compare-section';
    wrap.className = 'fn-section-wrap';
    wrap.setAttribute('aria-label', 'Fineness Comparison and Regulated Standing');

    wrap.innerHTML = `
      <!-- Comparison Table -->
      <div id="comparison" class="fn-animate-block" style="margin-bottom: 72px;">
        <p class="fn-eyebrow">03 / comparison</p>
        <h2 class="fn-title">Criterion Comparison</h2>
        <p class="fn-desc">
          Side-by-side performance across all 5 evaluation criteria. Higher score represents greater purity and lower counterparty exposure.
        </p>
        <div class="fn-table-box">
          ${cornerCrosses()}
          <table class="fn-table" aria-label="Side-by-side Comparison">
            <thead>
              <tr>
                <th>Venue</th>
                <th style="width: 100px;">Asset</th>
                <th style="width: 100px;">Traction</th>
                <th style="width: 100px;">Transp.</th>
                <th style="width: 100px;">Compl.</th>
                <th style="width: 100px;">Durab.</th>
                <th style="width: 120px;">Fineness</th>
              </tr>
            </thead>
            <tbody>
              ${VENUES.map((v, idx) => `
                <tr style="transition-delay: ${idx * 45}ms;">
                  <td>
                    <span class="fn-venue-name">${v.name}</span>
                  </td>
                  <td class="fn-mono">${v.scores.asset}/10</td>
                  <td class="fn-mono">${v.scores.traction}/10</td>
                  <td class="fn-mono">${v.scores.transparency}/10</td>
                  <td class="fn-mono">${v.scores.compliance}/10</td>
                  <td class="fn-mono">${v.scores.durability}/10</td>
                  <td class="fn-mono fn-fineness-score" data-counter="${v.fineness}">${v.fineness}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Regulated Standing Table -->
      <div id="regulated" class="fn-animate-block">
        <p class="fn-eyebrow">04 / regulated</p>
        <h2 class="fn-title">Regulated Standing</h2>
        <p class="fn-desc">
          Compliance evaluation with the legal custodian behind each tokenized pairing.
          Reflects public documentation, licenses, and direct redemption paths.
        </p>
        <div class="fn-table-box">
          ${cornerCrosses()}
          <table class="fn-table" aria-label="Regulated Standing">
            <thead>
              <tr>
                <th>Venue</th>
                <th style="width: 100px;">Compliance</th>
                <th>Named Custodian</th>
                <th style="width: 120px;">Redeemable</th>
                <th style="width: 140px;">Verifiability</th>
                <th style="width: 100px;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${[...VENUES].sort((a,b) => b.scores.compliance - a.scores.compliance).map((v, idx) => `
                <tr style="transition-delay: ${idx * 45}ms;">
                  <td>
                    <span class="fn-venue-name">${v.name}</span>
                  </td>
                  <td class="fn-mono" style="font-weight: 600;">${v.scores.compliance}/10</td>
                  <td class="fn-mono" style="color: var(--fn-ink-muted);">${v.pairing.custodian || '—'}</td>
                  <td class="fn-mono">${v.pairing.redeemable ? '✓ yes' : '✕ no'}</td>
                  <td class="fn-mono" style="color: var(--fn-ink-muted);">${v.pairing.verifiability}</td>
                  <td>
                    <span class="fn-chain-tag">${v.status}</span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    return wrap;
  }

  function setupScrollObservers() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fn-visible');
          // Animate numeric counters in this block
          entry.target.querySelectorAll('[data-counter]').forEach(c => {
            animateCounter(c, parseInt(c.dataset.counter, 10));
          });
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.fn-animate-block').forEach(el => observer.observe(el));
  }

  function ensureTablesMounted() {
    const areasHeader = document.querySelector('[data-framer-name="Areas"]');
    const workflowsHeader = document.querySelector('[data-framer-name="Workflows"]') || document.querySelector('[data-framer-name="Environments"]');

    if (!areasHeader || !areasHeader.parentElement) return false;

    let s1 = document.getElementById('fineness-register-section');
    if (!s1 || !areasHeader.parentElement.contains(s1)) {
      if (s1) s1.remove();
      s1 = createScaleAndRegisterSection();
      areasHeader.parentElement.insertBefore(s1, areasHeader.nextSibling);
      renderRegisterRows('all');
      setupFilters();
    }

    if (workflowsHeader && workflowsHeader.parentElement) {
      let s2 = document.getElementById('fineness-compare-section');
      if (!s2 || !workflowsHeader.parentElement.contains(s2)) {
        if (s2) s2.remove();
        s2 = createComparisonAndRegulatedSection();
        workflowsHeader.parentElement.insertBefore(s2, workflowsHeader.nextSibling);
      }
    }

    setupScrollObservers();
    return true;
  }

  let mountTimer = null;
  function scheduleMount() {
    if (mountTimer) return;
    mountTimer = setTimeout(() => {
      mountTimer = null;
      ensureTablesMounted();
    }, 40);
  }

  const observer = new MutationObserver(() => {
    const s1 = document.getElementById('fineness-register-section');
    const s2 = document.getElementById('fineness-compare-section');
    if (!s1 || !s2) scheduleMount();
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleMount);
  } else {
    scheduleMount();
  }

  window.addEventListener('load', () => {
    scheduleMount();
    [200, 600, 1200, 2500].forEach(d => setTimeout(ensureTablesMounted, d));
  });
})();
