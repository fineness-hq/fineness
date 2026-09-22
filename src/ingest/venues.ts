// Venue-to-provider mapping for the monthly ingest. A venue without a
// mapping keeps null metrics, which the register treats as the normal
// case. Add slugs here only after confirming the provider lists the venue.

export interface VenueIngestConfig {
  /** DefiLlama protocol slug for fees/TVL. Omit when unlisted. */
  defillamaSlug?: string;
}

/** Known provider mappings. Empty today: no register venue is confirmed
 *  listed under its own DefiLlama slug, so every lookup stays null until
 *  mappings are verified one by one. */
export const VENUE_INGEST: Record<string, VenueIngestConfig> = {};
