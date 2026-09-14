# github-org-map-public

Generates a dated public map of the repositories owned by a GitHub account
and its organizations: an SVG snapshot for "today", a dated history of past
snapshots, and a GIF assembled from that history so you can see how the
account/org map has changed over time.

Every repository whose visibility is private has its name replaced with a
masked label; public repos are shown with their real names, since that
information is already public on GitHub. Some repositories are omitted from
the map entirely. `org-map.svg`, `org-map.gif`, and `history/<date>.svg` are
committed to this repository's own root by the workflow below.

## Required secrets

A fine-grained personal access token has exactly one resource owner, so one
token cannot read both the account's own repositories and an organization's
repositories. The workflow needs three repository secrets:

- `USER_READ_TOKEN`: a fine-grained token with resource owner set to the
  tracked account, **All repositories** access, and **Metadata** read-only
  permission — enough to list the account's own repositories, including
  private ones.
- `ORG_READ_TOKEN`: a fine-grained token with resource owner set to the
  tracked organization, the same **All repositories** access and
  **Metadata** read-only permission — enough to list the org's repositories.
- `MASK_SALT`: a private random string used to salt the masking hash.
  Required; generation fails closed (throws, writes nothing) if it is
  missing.

Both GitHub tokens are passed to the generator only via the environment,
never on the command line.

## Schedule

`.github/workflows/refresh.yml` runs on a daily schedule and on demand via
`workflow_dispatch`. The workflow is split into two jobs so the credentials
that read GitHub and the credential that pushes to this repository are never
held by the same job:

- **`generate`** (`contents: read`, holds `USER_READ_TOKEN`, `ORG_READ_TOKEN`,
  `MASK_SALT`): fetches the current repo list, runs the tests, renders
  today's SVG, appends it to `history/`, rebuilds `org-map.gif`, and uploads
  the result as a workflow artifact. It never has push access to this
  repository.
- **`commit`** (`contents: write`, no secrets): downloads that artifact and
  commits/pushes it if anything changed. It never sees any of the secrets
  above.

## Running locally

```sh
npm install
USER_READ_TOKEN=ghp_xxx ORG_READ_TOKEN=ghp_yyy MASK_SALT=<the salt> npm run generate
```

This writes/updates `org-map.svg`, `org-map.gif`, and `history/<date>.svg` in
place. Rerunning it on the same day overwrites that day's history entry
rather than adding a duplicate.

The generator is written in TypeScript and run directly via
[`tsx`](https://github.com/privatenumber/tsx) — no separate build step is
needed. `npm run typecheck` runs `tsc --noEmit` to type-check the project
without emitting anything.

## Configuration

Edit `data/config.json` to change the tracked account, organizations,
timezone, or GIF timing (`frameMs`, `lastFrameMs`, `maxFrames`).

`tokenEnv` maps an owner login (the account, or an org name) to the name of
the environment variable holding that owner's token, since one fine-grained
token cannot cover both the account and an org. An owner with no entry here
falls back to `ORG_READ_TOKEN`, then `GITHUB_TOKEN`.

## Tests

```sh
npm test
```
