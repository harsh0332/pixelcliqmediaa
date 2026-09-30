export interface ClientLogo {
  id: string;
  name: string;
  logo: string;
  /** True only when the client is signed AND has approved use of their mark. */
  approved: boolean;
}

/**
 * Client logos.
 *
 * This array is empty, and that is the correct value today. It previously held
 * twelve generated placeholder slots so a logo marquee would look populated —
 * which is precisely the pattern we refuse: tiling a small set of assets, or no
 * assets at all, to imply volume we do not have.
 *
 * When real clients are signed, add one entry per client. Never add a slot to
 * fill a row, never repeat a logo to lengthen a marquee, and never include the
 * Pixelcliq mark here to pad the count.
 *
 * Components must branch on `HAS_CLIENT_LOGOS` in site.ts and render a plain,
 * dignified line instead of an empty rail.
 */
export const clients: ClientLogo[] = [];

/** The only list a component may render. */
export const approvedClients = clients.filter((client) => client.approved);
