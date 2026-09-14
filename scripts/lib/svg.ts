// Renders the organization/account map as a standalone SVG string.
//
// Design goals:
//  - Readable in both GitHub's light and dark themes. Rather than painting a
//    background rect (which would look wrong in whichever theme it wasn't
//    tuned for), the canvas stays transparent and text/stroke colors are
//    swapped via `@media (prefers-color-scheme: dark)`. Rasterizers used for
//    the GIF (see gif.ts) generally do not evaluate media queries, so they
//    fall back to the light-mode defaults below, which is an acceptable and
//    intentional trade-off for a still-image history frame.
//  - Size grows with content, and any group whose repo list gets long wraps
//    into additional internal columns (rather than growing arbitrarily
//    tall), so the overall canvas stays roughly landscape.

import type { DisplaySafeRepo } from './mask.js';

/**
 * Display-safe repo groups (private repo names already masked, private
 * description/topics already dropped — see mask.ts).
 */
export interface Group {
  login: string;
  type: 'account' | 'org';
  repos: DisplaySafeRepo[];
}

interface RenderedGroup {
  markup: string;
  width: number;
  height: number;
}

interface GroupLayout {
  columnsData: DisplaySafeRepo[][];
  columns: number;
  rowsPerColumn: number;
  width: number;
  height: number;
}

const FONT_STACK =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

const LAYOUT = {
  margin: 32,
  titleHeight: 64,
  // Extra vertical space reserved above the groups when a summary metrics
  // block is rendered (public variant only — see `renderSummary`).
  summaryHeight: 44,
  groupGap: 36,
  columnWidth: 300,
  columnGap: 24,
  headerHeight: 40,
  rowHeight: 24,
  maxRowsPerColumn: 22,
  dotRadius: 4,
};

const STYLE_BLOCK = `
    text { font-family: ${FONT_STACK}; }
    .om-title { fill: #1f2328; font-size: 20px; font-weight: 600; }
    .om-date { fill: #57606a; font-size: 13px; }
    .om-group-title { fill: #1f2328; font-size: 15px; font-weight: 600; }
    .om-group-meta { fill: #57606a; font-size: 11px; }
    .om-repo-name { fill: #1f2328; font-size: 13px; }
    .om-repo-muted { fill: #8c959f; font-size: 13px; }
    .om-dot-private { fill: #cf222e; stroke: none; }
    .om-dot-public { fill: none; stroke: #1a7f37; stroke-width: 1.5; }
    .om-empty { fill: #8c959f; font-style: italic; font-size: 12px; }
    .om-summary-counts { fill: #1f2328; font-size: 13px; font-weight: 600; }
    .om-summary-lang { fill: #57606a; font-size: 12px; }

    @media (prefers-color-scheme: dark) {
      .om-title { fill: #e6edf3; }
      .om-date { fill: #8b949e; }
      .om-group-title { fill: #e6edf3; }
      .om-group-meta { fill: #8b949e; }
      .om-repo-name { fill: #e6edf3; }
      .om-repo-muted { fill: #6e7681; }
      .om-dot-private { fill: #f85149; }
      .om-dot-public { stroke: #3fb950; }
      .om-empty { fill: #6e7681; }
      .om-summary-counts { fill: #e6edf3; }
      .om-summary-lang { fill: #8b949e; }
    }
`;

/** Escape text for safe inclusion inside SVG element content/attributes. */
export function escapeXml(value: unknown): string {
  return String(value).replace(/[&<>"']/g, (ch) => {
    switch (ch) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      case "'":
        return '&apos;';
      default:
        return ch;
    }
  });
}

/**
 * Split one group's repo list into internal columns of at most
 * `LAYOUT.maxRowsPerColumn` rows each, distributed as evenly as possible so
 * a tall group doesn't dominate the overall canvas height.
 */
function layoutGroup(group: Group): GroupLayout {
  const repoCount = group.repos.length;

  if (repoCount === 0) {
    return {
      columnsData: [[]],
      columns: 1,
      rowsPerColumn: 1,
      width: LAYOUT.columnWidth,
      height: LAYOUT.headerHeight + LAYOUT.rowHeight,
    };
  }

  const columns = Math.max(1, Math.ceil(repoCount / LAYOUT.maxRowsPerColumn));
  const rowsPerColumn = Math.ceil(repoCount / columns);

  const columnsData: DisplaySafeRepo[][] = [];
  for (let c = 0; c < columns; c++) {
    const start = c * rowsPerColumn;
    const end = Math.min(start + rowsPerColumn, repoCount);
    columnsData.push(group.repos.slice(start, end));
  }

  return {
    columnsData,
    columns,
    rowsPerColumn,
    width: columns * LAYOUT.columnWidth + (columns - 1) * LAYOUT.columnGap,
    height: LAYOUT.headerHeight + rowsPerColumn * LAYOUT.rowHeight,
  };
}

function renderRepoRow(
  repo: DisplaySafeRepo,
  colX: number,
  rowY: number,
  showForkArchivedInfo: boolean
): string {
  const cy = rowY + LAYOUT.rowHeight / 2 - 2;
  // Scoped to private repos only: a public repo's fork/archived status is
  // already visible on GitHub alongside its real name/description/topics,
  // so suppressing it there would remove information without any privacy
  // benefit. Only a *private* repo's fork/archived status is itself new
  // information the public map must not add on top of the mask.
  const suppressForThisRepo = !showForkArchivedInfo && repo.isPrivate;
  const nameClass =
    !suppressForThisRepo && (repo.archived || repo.fork) ? 'om-repo-muted' : 'om-repo-name';
  const dotClass = repo.isPrivate ? 'om-dot-private' : 'om-dot-public';
  const suffix = suppressForThisRepo
    ? ''
    : repo.fork
      ? ' (fork)'
      : repo.archived
        ? ' (archived)'
        : '';

  return (
    `<circle cx="${colX + 8}" cy="${cy}" r="${LAYOUT.dotRadius}" class="${dotClass}" />` +
    `<text x="${colX + 22}" y="${cy + 4}" class="${nameClass}">` +
    `${escapeXml(repo.name)}${escapeXml(suffix)}</text>`
  );
}

function renderGroup(
  group: Group,
  x: number,
  groupTop: number,
  showForkArchivedInfo: boolean
): RenderedGroup {
  const layout = layoutGroup(group);
  const typeLabel = group.type === 'account' ? 'Account' : 'Organization';
  const repoCount = group.repos.length;
  const countLabel = `${repoCount} repo${repoCount === 1 ? '' : 's'}`;

  const headerY = groupTop;
  const rowsTop = headerY + LAYOUT.headerHeight;

  let body: string;
  if (repoCount === 0) {
    body = `<text x="${x}" y="${rowsTop + 14}" class="om-empty">No repositories</text>`;
  } else {
    const rowsMarkup: string[] = [];
    layout.columnsData.forEach((columnRepos, colIndex) => {
      const colX = x + colIndex * (LAYOUT.columnWidth + LAYOUT.columnGap);
      columnRepos.forEach((repo, rowIndex) => {
        const rowY = rowsTop + rowIndex * LAYOUT.rowHeight;
        rowsMarkup.push(renderRepoRow(repo, colX, rowY, showForkArchivedInfo));
      });
    });
    body = rowsMarkup.join('\n        ');
  }

  const markup = `
      <g>
        <text x="${x}" y="${headerY + 18}" class="om-group-title">${escapeXml(group.login)}</text>
        <text x="${x}" y="${headerY + 34}" class="om-group-meta">${escapeXml(typeLabel)} · ${escapeXml(countLabel)}</text>
        ${body}
      </g>`;

  return { markup, width: layout.width, height: layout.height };
}

/**
 * Summary metrics rendered below the title. `languages` MUST be computed
 * from public repositories alone (see scripts/generate.ts) — this module
 * just renders whatever it is given, so that invariant is enforced by the
 * caller, not here.
 */
export interface SummaryMetrics {
  publicCount: number;
  privateCount: number;
  /** Language -> repo count, public repos only, most common first. */
  languages: { language: string; count: number }[];
}

/**
 * Render the counts + public-only language distribution block. Presence of
 * `summary` in `BuildSvgParams` is what turns this on — there is no
 * separate "variant" flag, since the caller already knows which fields are
 * safe to hand in.
 */
function renderSummary(summary: SummaryMetrics, x: number, y: number): string {
  const countsLine = `${summary.publicCount} public repo${summary.publicCount === 1 ? '' : 's'} · ${
    summary.privateCount
  } private repo${summary.privateCount === 1 ? '' : 's'}`;

  const languagesLine =
    summary.languages.length > 0
      ? `Languages (public repos only): ${summary.languages
          .map((l) => `${l.language} ${l.count}`)
          .join(', ')}`
      : 'Languages (public repos only): —';

  return `
      <text x="${x}" y="${y}" class="om-summary-counts">${escapeXml(countsLine)}</text>
      <text x="${x}" y="${y + 18}" class="om-summary-lang">${escapeXml(languagesLine)}</text>`;
}

export interface BuildSvgParams {
  /** YYYY-MM-DD date label for this snapshot. */
  date: string;
  /** The account login (shown in full). */
  account: string;
  groups: Group[];
  /**
   * Summary metrics block. Omit to skip rendering it. Never pass repo-level
   * data derived from private repos here (see `SummaryMetrics`'s doc
   * comment).
   */
  summary?: SummaryMetrics;
  /**
   * Whether *private* repo rows render the fork/archived suffix (` (fork)` /
   * ` (archived)`) and the corresponding muted text style. Defaults to
   * `true`; scripts/generate.ts always passes `false` here, since a private
   * repo's fork/archived status is itself information about that repo that
   * a public artifact should not carry on top of the mask. Public repo rows
   * are never affected by this flag — their fork/archived status is already
   * visible on GitHub next to their real name, so there is nothing to
   * protect there. Deciding this here via an explicit flag keeps the row
   * renderer itself unaware of who sets it.
   */
  showForkArchivedInfo?: boolean;
}

/** Build the full organization map SVG. */
export function buildSvg({
  date,
  account,
  groups,
  summary,
  showForkArchivedInfo = true,
}: BuildSvgParams): string {
  let x = LAYOUT.margin;
  const groupTop = LAYOUT.margin + LAYOUT.titleHeight + (summary ? LAYOUT.summaryHeight : 0);

  const rendered = groups.map((group) => {
    const result = renderGroup(group, x, groupTop, showForkArchivedInfo);
    x += result.width + LAYOUT.groupGap;
    return result;
  });

  const contentWidth = rendered.reduce(
    (sum, r, i) => sum + r.width + (i > 0 ? LAYOUT.groupGap : 0),
    0
  );
  const contentHeight = rendered.length > 0 ? Math.max(...rendered.map((r) => r.height)) : LAYOUT.headerHeight;

  const width = Math.max(LAYOUT.margin * 2 + contentWidth, 480);
  const height = LAYOUT.margin * 2 + LAYOUT.titleHeight + (summary ? LAYOUT.summaryHeight : 0) + contentHeight;

  const summaryMarkup = summary ? renderSummary(summary, LAYOUT.margin, LAYOUT.margin + LAYOUT.titleHeight + 14) : '';

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" role="img" aria-label="${escapeXml(
    `GitHub organization map for ${account} on ${date}`
  )}">
  <style><![CDATA[${STYLE_BLOCK}]]></style>
  <text x="${LAYOUT.margin}" y="${LAYOUT.margin + 20}" class="om-title">GitHub Organization Map — ${escapeXml(account)}</text>
  <text x="${LAYOUT.margin}" y="${LAYOUT.margin + 40}" class="om-date">${escapeXml(date)}</text>${summaryMarkup}
${rendered.map((r) => r.markup).join('\n')}
</svg>
`;
}
