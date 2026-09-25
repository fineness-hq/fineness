// End-to-end check: boots production server, asserts all routes, then stops.
// English only. Run: npm run e2e (requires `npm run build` first).
import { execFile, spawn } from 'node:child_process';
import fs from 'node:fs';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);
const PORT = 3199;
const BASE = `http://127.0.0.1:${PORT}`;
const FETCH_TIMEOUT_MS = 10000;
let failures = 0;
const t0 = Date.now();
const elapsed = () => `${((Date.now() - t0) / 1000).toFixed(1)}s`;

function check(name, cond, detail = '') {
  if (cond) console.log(`PASS ${name}`);
  else {
    failures += 1;
    console.log(`FAIL ${name} ${detail}`);
  }
}

/** Free the port before starting: kill any leftover holder (Windows). */
async function freePort() {
  try {
    const { stdout } = await execFileAsync('netstat', ['-ano']);
    const pids = new Set();
    for (const line of stdout.split('\n')) {
      const m = line.match(/TCP\s+\S+:3199\s+\S+\s+LISTENING\s+(\d+)/);
      if (m) pids.add(m[1]);
    }
    for (const pid of pids) {
      if (Number(pid) === process.pid) continue;
      try {
        await execFileAsync('taskkill', ['/PID', pid, '/T', '/F']);
        console.log(`freed stale holder PID ${pid} on :${PORT}`);
      } catch { /* already gone */ }
    }
  } catch (e) {
    console.log(`port preflight skipped: ${e.message}`);
  }
}

async function waitForServer(timeoutMs = 30000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const r = await fetch(`${BASE}/`, { signal: AbortSignal.timeout(2000) });
      if (r.ok) return true;
    } catch { /* not ready */ }
    await new Promise((r) => setTimeout(r, 400));
  }
  return false;
}

/** Kill the whole process tree on Windows, fall back to SIGKILL. */
async function stopServer(proc) {
  if (!proc || proc.exitCode !== null) return;
  try {
    await execFileAsync('taskkill', ['/PID', String(proc.pid), '/T', '/F']);
  } catch { /* already gone */ }
  try { proc.kill('SIGKILL'); } catch { /* already gone */ }
}

async function main() {
  await freePort();

  // Spawn next directly (no cmd wrapper) so the handle kills the real server.
  const proc = spawn(
    process.execPath,
    ['node_modules/next/dist/bin/next', 'start', '--port', String(PORT)],
    {
      cwd: process.cwd(),
      stdio: ['ignore', 'pipe', 'pipe'],
      windowsHide: true,
    },
  );
  let out = '';
  proc.stdout.on('data', (d) => { out += d.toString(); });
  proc.stderr.on('data', (d) => { out += d.toString(); });

  const ready = await waitForServer();
  check('server boots', ready, out.slice(-400));
  console.log(`boot phase done at ${elapsed()}`);
  if (!ready) {
    await stopServer(proc);
    process.exit(1);
  }

  const get = async (path) => {
    const res = await fetch(`${BASE}${path}`, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
    const text = await res.text();
    return { status: res.status, text };
  };

  try {
    // Latest frozen edition drives home expectations : no hardcoded figures.
    const editionFiles = fs.readdirSync('data/editions').filter((f) => f.endsWith('.json')).sort();
    const latest = JSON.parse(fs.readFileSync(`data/editions/${editionFiles[editionFiles.length - 1]}`, 'utf8'));
    const top = latest.venues[0];
    // 1. Home renders full register content (no-JS SSR).
    const home = await get('/');
    check('GET / 200', home.status === 200, `got ${home.status}`);
    for (const s of [top.name, String(top.fineness), 'not published', '375', 'Fineness']) {
      check(`GET / contains ${s}`, home.text.includes(s));
    }
    check('GET / contains hallmark line', /hallmark/i.test(home.text));
    // Default house weights hide the custom banner by design.
    check('GET / hides custom banner on house weights', !home.text.includes('Custom weights'));

    // 2. Permanent edition page.
    const edition = await get('/editions/2026-09');
    check('GET /editions/2026-09 200', edition.status === 200, `got ${edition.status}`);
    check('edition page contains Pons 715', edition.text.includes('Pons') && edition.text.includes('715'));

    // 3. Machine-readable JSON matches the shipped file (semantically).
    const jsonRoute = await get('/editions/2026-09.json');
    check('GET /editions/2026-09.json 200', jsonRoute.status === 200, `got ${jsonRoute.status}`);
    const fileRaw = fs.readFileSync('data/editions/2026-09.json', 'utf8');
    let routeJson = null;
    let fileJson = null;
    try { routeJson = JSON.parse(jsonRoute.text); } catch { /* fallthrough */ }
    try { fileJson = JSON.parse(fileRaw); } catch { /* fallthrough */ }
    check('edition JSON parses', !!routeJson && !!fileJson);
    check('edition JSON venues = 10', routeJson?.venues?.length === 10, `got ${routeJson?.venues?.length}`);
    check('edition JSON first fineness = 720', routeJson?.venues?.[0]?.fineness === 720);
    check('edition JSON equals shipped file', JSON.stringify(routeJson) === JSON.stringify(fileJson));

    // 4. Custom weights URL applies before first paint (SSR ranking + banner).
    const custom = await get('/?w=10,0,0,0,0');
    check('GET /?w= custom 200', custom.status === 200, `got ${custom.status}`);
    check('custom weights banner visible', custom.text.includes('Custom'));
    check('custom weights reset visible', /Reset/i.test(custom.text));

    // 5. Method page.
    const method = await get('/method');
    check('GET /method 200', method.status === 200, `got ${method.status}`);
    check('method explains scoring', /fineness/i.test(method.text) && /weight/i.test(method.text));

    // 6. Venue history pages render with latest fineness (data-driven).
    const ids = latest.venues.map((v) => v.id);
    const expected = Object.fromEntries(latest.venues.map((v) => [v.id, String(v.fineness)]));
    for (const id of ids) {
      const v = await get(`/venues/${id}`);
      check(`GET /venues/${id} 200`, v.status === 200, `got ${v.status}`);
    }
    for (const [id, fin] of Object.entries(expected)) {
      const v = await get(`/venues/${id}`);
      check(`venue ${id} shows ${fin}`, v.text.includes(fin));
    }

    // 7. Unknown edition and venue 404.
    const missingEdition = await get('/editions/1999-01');
    check('unknown edition 404', missingEdition.status === 404, `got ${missingEdition.status}`);
    const missingVenue = await get('/venues/nope-not-real');
    check('unknown venue 404', missingVenue.status === 404, `got ${missingVenue.status}`);
  } finally {
    await stopServer(proc);
  }
  console.log(`checks done at ${elapsed()}`);

  if (failures > 0) {
    console.log(`E2E FAILED: ${failures} check(s) failed`);
    process.exit(1);
  }
  console.log('E2E PASSED: all route checks green');
}

main().catch(async (e) => {
  console.error(`E2E ERROR: ${e?.message ?? e}`);
  process.exit(1);
});
