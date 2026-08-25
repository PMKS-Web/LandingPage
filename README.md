# pmksplus.com

The landing page for PMKS+.

**The app itself is at [app.pmksplus.com](https://app.pmksplus.com)** — free, in
the browser, no account. Its source is in
[Planar-Mechanism-Kinematic-Simulator](https://github.com/PMKS-Web/Planar-Mechanism-Kinematic-Simulator).

## What PMKS+ is

A planar mechanism kinematic simulator, developed at Worcester Polytechnic
Institute by student project teams as the successor to PMKS by Prof. Matthew I.
Campbell at Oregon State. You draw a linkage the way you would sketch it, ground
the frame, choose the joint the motor turns, and it runs: four-bars,
slider-cranks, six-bars and whole machines, with welds, pins in slots, hydraulic
cylinders and tracer points. It gives back position, velocity and acceleration
for any joint or link, and joint reactions and motor torque in static
equilibrium or full dynamics — exportable as CSV, an Excel workbook or a print
ready report. A whole mechanism packs into one URL, so a class can pass them
around like messages. Free and open source under MIT.

## What this repo is

The marketing page in front of it: Next.js 13 (App Router) and Tailwind,
deployed as a static site. Built originally on
[Open](https://github.com/cruip/open-react-template) by Cruip; the page itself
has since been rewritten.

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
npm run shots        # retake the app screenshots the Build, Analyze and phone sections embed
```

Both read from a checkout of
[Planar-Mechanism-Kinematic-Simulator](https://github.com/PMKS-Web/Planar-Mechanism-Kinematic-Simulator)
beside this repo; `npm run shots` also wants that app's dev server up on port 4200. See
[`engine/README.md`](engine/README.md) for what is vendored, how to re-sync it,
and what the canvas does and does not draw.

## Layout

| Path | What is in it |
| --- | --- |
| `app/page.tsx` | The page, as a list of its sections |
| `components/landing/` | Those sections |
| `components/pmks/` | The mechanism runtime: load, play, draw |
| `engine/` | The vendored PMKS+ engine and the two asset pipelines |
| `public/mechanisms/` | Generated — solved geometry, one file per linkage |
| `public/images/app/` | Generated — screenshots of the running app |
