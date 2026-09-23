// LLM upstream client (OpenAI-compatible chat completions).
// Credentials never live in this repo: they come from the environment,
// optionally loaded from an outside env file (see scripts/monthly.ts).
// Any failure resolves to null so the run falls back to carried scores.

import { readFileSync } from 'node:fs';

export interface LlmConfig {
  url: string;
  key: string;
  model: string;
}

function readEnvFile(path: string): void {
  let raw: string;
  try {
    raw = readFileSync(path, 'utf8');
  } catch {
    return;
  }
  for (const line of raw.split('\n')) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/);
    if (match && process.env[match[1]] === undefined) {
      process.env[match[1]] = match[2];
    }
  }
}

export function loadLlmEnv(): void {
  const file = process.env['LLM_ENV_FILE'];
  if (typeof file === 'string' && file.length > 0) readEnvFile(file);
}

export function llmConfig(): LlmConfig | null {
  const url = process.env['LLM_API_URL'];
  const key = process.env['LLM_API_KEY'];
  const model = process.env['LLM_MODEL'];
  if (
    typeof url !== 'string' ||
    url.length === 0 ||
    typeof key !== 'string' ||
    key.length === 0 ||
    typeof model !== 'string' ||
    model.length === 0
  ) {
    return null;
  }
  return { url, key, model };
}

/** Single chat completion, reply text or null on any failure. */
export async function complete(
  cfg: LlmConfig,
  system: string,
  user: string,
  maxTokens = 4000,
): Promise<string | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 120000);
  try {
    const res = await fetch(cfg.url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${cfg.key}` },
      body: JSON.stringify({
        model: cfg.model,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
        temperature: 0,
        max_tokens: maxTokens,
      }),
      signal: controller.signal,
    });
    if (!res.ok) return null;
    const data = (await res.json()) as {
      choices?: { message?: { content?: unknown } }[];
    };
    const content = data.choices?.[0]?.message?.content;
    return typeof content === 'string' && content.length > 0 ? content : null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}
