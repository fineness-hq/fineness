import type { Band, Scores, Weights } from "./scoring/fineness";

export interface SourceEntry {
  name: string;
  url: string;
  type: string;
}

export type SourceRegistry = Record<string, SourceEntry>;

export interface ContractRef {
  label: string;
  address: string;
  verified: boolean;
}

export type PairingAssetType =
  | "none"
  | "tokenized-equity"
  | "inventory-index"
  | "collectible"
  | "synthetic";

export type Verifiability =
  | "on-chain"
  | "public-inventory"
  | "attestation"
  | "none";

export interface Pairing {
  assetType: PairingAssetType;
  custodian: string | null;
  redeemable: boolean;
  verifiability: Verifiability;
}

export interface VenueMetrics {
  cumulativeVolumeUsd: number | null;
  dailyVolumeUsd: number | null;
  fees24hUsd: number | null;
  tvlUsd: number | null;
  asOf: string;
  sourceIds: string[];
}

export type Rationale = Record<import("./scoring/fineness").Criterion, string>;

export type VenueStatus = "active" | "prelaunch" | "paused" | "struck";

export interface Venue {
  id: string;
  name: string;
  chain: string;
  resident: boolean;
  status: VenueStatus;
  /** Edition this venue was struck, if ever. Null otherwise. */
  struckDate: string | null;
  /** Movement vs the prior edition at house weights. Absent for new admissions. */
  delta?: {
    fineness: number;
    rank: number;
    bandChanged: boolean;
    crossedHallmark: boolean;
    basis: string;
  };
  admittedEdition: string;
  thesis: string;
  scores: Scores;
  fineness: number;
  band: Band;
  rank: number;
  rationale: Rationale;
  pairing: Pairing;
  metrics: VenueMetrics;
  contracts: ContractRef[];
  links: { site: string | null; docs: string | null };
  facts: [string, string][];
}

export interface CorrectionNote {
  date: string;
  note: string;
  originalFigure: string;
}

export interface EditionHeader {
  edition: string;
  published: string;
  dataAsOf: string;
  snapshotHash: string;
  houseWeights: Weights;
  disclosures: string[];
  /** Dated correction notes. Original figures stay in place, never edited. */
  corrections: CorrectionNote[];
}

export interface Edition extends EditionHeader {
  venues: Venue[];
}

export interface SnapshotVenue {
  id: string;
  cumulativeVolumeUsd: number | null;
  dailyVolumeUsd: number | null;
  fees24hUsd: number | null;
  tvlUsd: number | null;
  contracts: ContractRef[];
}

export interface Snapshot {
  snapshot: string;
  asOf: string;
  venues: SnapshotVenue[];
}
