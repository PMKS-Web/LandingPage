# pmksplus.com

The landing page for [PMKS+](https://app.pmksplus.com), a planar mechanism
kinematic simulator built at Worcester Polytechnic Institute. Next.js 13 (App
Router) and Tailwind, deployed as a static site.

Built originally on [Open](https://github.com/cruip/open-react-template) by
Cruip; the page itself has since been rewritten.

## Running it

```bash
npm install
npm run dev
```

## The mechanisms are the real thing

Every linkage that moves on this page — the four-bar in the hero, the quick
return beside the sharing panel, the six cards in the library — is solved and
drawn by PMKS+'s own code rather than by an animation of it. The app's model
layer is vendored under `engine/vendor`, the linkages are written as fixtures
against the app's own MATLAB-verified test harness, and a build step solves them
and writes the geometry into `public/mechanisms`. The page ships no solver: it
lays out what the app produced and moves it.

```bash
npm run mechanisms   # re-solve the linkages after editing engine/src/linkages.ts
npm run shots        # retake the app screenshots the Build and Analyze sections embed
```

Both read from a checkout of
[Planar-Mechanism-Kinematic-Simulator](https://github.com/PMKS-Web) beside this
repo; `npm run shots` also wants that app's dev server up on port 4200. See
[`engine/README.md`](engine/README.md) for what is vendored, how to re-sync it,
and what the canvas does and does not draw.

## Layout

| Path | What is in it |
| --- | --- |
| `app/(default)/page.tsx` | The page, as a list of its sections |
| `components/landing/` | Those sections |
| `components/pmks/` | The mechanism runtime: load, play, draw |
| `engine/` | The vendored PMKS+ engine and the two asset pipelines |
| `public/mechanisms/` | Generated — solved geometry, one file per linkage |
| `public/images/app/` | Generated — screenshots of the running app |

`app/(auth)/` still holds the template's sign-in pages. They are not linked from
anywhere and are kept only because nothing has replaced them yet.
