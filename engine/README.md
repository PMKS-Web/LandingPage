# The PMKS+ engine, on the landing page

The mechanisms on this page are not animations of PMKS+. They are PMKS+.

`vendor/` is a byte-for-byte copy of the app's model layer, its two geometry
services, and the harness its MATLAB-verified test suite builds fixtures with,
taken from a local checkout of
[Planar-Mechanism-Kinematic-Simulator](https://github.com/PMKS-Web). Nothing in
it is edited here — a linkage that solves differently on the landing page than
it does in the app is the one failure this arrangement exists to make
impossible.

## The pieces

| Path | What it is |
| --- | --- |
| `sync.mjs` | Refreshes `vendor/` from a checkout of the app. |
| `vendor/` | The app's own source. Do not edit; edit it upstream and re-sync. |
| `shim/settings.service.ts` | Stands in for the Angular service the model reads `objectScale` from. Copied into `vendor/` by `sync.mjs`. |
| `shim/angular-core.ts` | Absorbs the `@Injectable` decorator on the two vendored services. |
| `src/linkages.ts` | The eight linkages the page runs, written as the app's own fixtures. |
| `src/precompute.ts` | Solves them and writes `public/mechanisms/*.json`. |
| `build.mjs` | Bundles and runs the above. |
| `shots.mjs` | Retakes the app screenshots the page embeds. |

## Regenerating the mechanisms

```bash
npm run mechanisms
```

Solves every linkage in `src/linkages.ts` with the app's `Mechanism` and
`PositionSolver`, then writes, per linkage: the joint positions at ninety poses
around the cycle, each rigid body's outline (`RealLink.d`, with any slot
channels already cut out of it) at its rest pose, the slider blocks and grounded
rails from `SliderMarkService`, the curve each traced joint draws, and the
velocity of the traced point as `MechanismService` scales it.

About a hundred kilobytes for all eight. The page ships no solver: the runtime's
whole job is to lay those pieces out and move them, which
`components/pmks/mechanism-view.tsx` does in the same nesting and the same layer
order the app's canvas uses.

Pass a path if the app is not checked out beside this repo:

```bash
node engine/sync.mjs ../some/other/path && node engine/build.mjs
```

## Retaking the screenshots

```bash
npm run shots
```

Needs the app's dev server on `http://localhost:4200` and a Playwright install
at `/tmp/pmks-playwright` — the arrangement `.claude/skills/ui-validate/SKILL.md`
in the app repo describes. Writes `public/images/app/`.

## What the page does not draw

The canvas draws the mechanism and nothing else: no link names, no joint tags,
no axis numbers. All three are in the app and all three are noise at the size a
library card runs at. Everything that *is* drawn comes from the app.
