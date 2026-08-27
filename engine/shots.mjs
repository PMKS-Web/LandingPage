#!/usr/bin/env node
/**
 * The screenshots of the app that the landing page embeds, taken from the app.
 *
 *   node engine/shots.mjs [path-to-app-checkout]
 *
 * Preconditions: the app's dev server on http://localhost:4200 (`npm start` in
 * the app checkout) and a Playwright install at /tmp/pmks-playwright — the
 * arrangement `.claude/skills/ui-validate/SKILL.md` in that repo describes. The
 * social card also wants this page itself running (`npm run dev`), because it
 * is a photograph of it.
 *
 * This is the app's own `e2e/readme-shots.mjs` aimed at a different target: the
 * README's pictures are documentation and are taken at documentation sizes,
 * while a landing page puts one of these behind a rounded card half a column
 * wide on a retina display. So they are taken here at twice the pixel density,
 * framed for that card, from real templates, with the mechanism left in a pose
 * that shows what the panel beside it is talking about — and then resampled
 * down to `deliver`, which is what the page actually serves.
 *
 * Not a check: it writes assets. Run it when the app's chrome moves.
 */
import { readFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const app = resolve(process.argv[2] ?? join(here, '../../Planar-Mechanism-Kinematic-Simulator'));
const BASE = process.env.PMKS_BASE_URL ?? 'http://localhost:4200';
/** Where this landing page itself is running, for the social card. */
const SITE = process.env.PMKS_SITE_URL ?? 'http://localhost:3000';
const OUT = join(here, '../public/images/app');

const { chromium, devices } = await import(
  (process.env.PMKS_PLAYWRIGHT_DIR ?? '/tmp/pmks-playwright') + '/node_modules/playwright/index.mjs'
);
const { waitForReady } = await import(join(app, 'e2e/app-ready.mjs'));

const source = readFileSync(
  join(app, 'src/app/component/MODALS/templates/template-linkages.ts'),
  'utf8'
);
const payloads = Object.fromEntries(
  [...source.matchAll(/^ {2}'?([\w-]+)'?:\n {4}'([^']+)',$/gm)].map(([, id, p]) => [
    id,
    p.replace(/\\\\/g, '\\'),
  ])
);

const SHOTS = [
  {
    /**
     * The social card, from the page that exists to be it.
     *
     * Still a photograph of the real thing — the mechanism on it is solved and
     * drawn by the same engine as the one in the hero — but composed for a feed
     * rather than cropped out of a page. At the ~500px a card is actually shown
     * at, a screenshot of the whole hero turned its nav, buttons and paragraph
     * into texture.
     *
     * This one wants the landing page running, not the app: `npm run dev` here,
     * or PMKS_SITE_URL=... for a deploy preview.
     */
    name: 'og',
    site: '/og-card',
    width: 1200,
    height: 630,
    deliver: 1200,
    steps: [['wait', 2500]],
  },
  {
    // The phone build, on a phone: a real iPhone profile with touch events, so
    // the layout that answers is the one a student actually gets.
    name: 'phone-grid',
    deliver: 700,
    // A scissor lift, because a phone is tall and so is this: a mechanism that
    // is wider than it is high leaves most of a portrait screen empty grid.
    template: 'Scissor_Lift',
    device: 'iPhone 13',
    expect: 'analysis',
    steps: [
      ['tab', 'Kinematic'],
      ['pose', 170],
      ['resetView'],
      ['wait', 700],
    ],
  },
  {
    // The mode panel as a sheet: what replaces a desktop side panel when there
    // is no side to put it on.
    name: 'phone-panel',
    deliver: 700,
    template: 'Backhoe_Bucket',
    device: 'iPhone 13',
    expect: 'analysis',
    steps: [
      ['tab', 'Kinematic'],
      ['pose', 120],
      ['selectJoint', 'K'],
      // The mode panel is a sheet on a phone: shut until it is pulled up, and
      // never more than half the window when it is. Opening it reframes the
      // drawing into the half that is left, which is the point of the picture.
      ['click', '.sheetHandle'],
      ['wait', 1200],
    ],
  },
  {
    // What the Build section is about: a welded bucket, and the Edit panel open
    // on one of its joints so the states a joint can be in are all on screen.
    name: 'build',
    template: 'Loader_Bucket',
    width: 1440,
    height: 900,
    deliver: 1440,
    steps: [
      // Back to the start first. Edit is only Edit while the mechanism is at
      // rest: away from sample zero the panel replaces itself with a warning
      // that editing is paused, which is not what a section called Build
      // should be a picture of.
      ['pose', 0],
      ['tab', 'Edit'],
      ['selectJoint', 'B'],
      ['resetView'],
      ['park'],
      ['wait', 600],
    ],
    expect: 'edit',
  },
  {
    // What the Analyze section is about: a quick return part way through its
    // stroke, with position, velocity and acceleration plotted beside it.
    name: 'analyze',
    template: 'Whitworth_Quick_Return',
    width: 1440,
    height: 980,
    deliver: 1440,
    expect: 'analysis',
    steps: [
      ['tab', 'Kinematic'],
      // Sample 36 of 361. The crank and the slotted lever it drives are within
      // twenty degrees of each other all the way round this mechanism, and at
      // the pose either of them crosses the axis the two lie on top of one
      // another and the drawing says nothing. This is where they are furthest
      // apart — and it is also a pose where no readout beside it is a rounding
      // error printed to seven decimal places.
      ['pose', 36],
      ['vectors', 'D'],
      ['selectJoint', 'D'],
      ['expandGraphs', 3],
      ['resetView'],
      ['zoomOut', 1],
      ['park'],
      ['wait', 900],
    ],
  },
];

/**
 * Resample a shot down to the width the page serves it at.
 *
 * The page ships these as they are — `next/image` is set to `unoptimized`, so
 * nothing resizes them on the way out — and a 2880-pixel picture behind a
 * 617-pixel card is two megabytes of detail nobody sees. Captured at twice the
 * density and reduced here, rather than captured small: a downsampled 2x shot
 * of a UI reads better than a native 1x one.
 *
 * `sips` is macOS's own and needs nothing installed. Somewhere without it the
 * shot is still written, just at capture size, and says so.
 */
function deliverAt(file, width) {
  if (!width) return;
  try {
    execFileSync('sips', ['--resampleWidth', String(width), file, '--out', file], {
      stdio: 'ignore',
    });
  } catch {
    console.warn(`  (could not resample ${file} to ${width}px — no sips?)`);
  }
}

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const missed = [];

const only = process.env.ONLY?.split(',').map((name) => name.trim());

for (const shot of SHOTS) {
  if (only && !only.includes(shot.name)) continue;
  const context = await browser.newContext(
    shot.device
      ? { ...devices[shot.device], isMobile: true, hasTouch: true }
      : {
          viewport: { width: shot.width, height: shot.height },
          // Twice, not the README's 1.2: these sit in a card at roughly half a
          // 1440-wide page and have to hold up on a retina screen.
          deviceScaleFactor: 2,
        }
  );
  await context.addInitScript(() => localStorage.setItem('tutorialSeen', 'true'));
  const page = await context.newPage();
  if (shot.site) {
    // Not fatal: the app's own pictures should still be taken by a run started
    // without this page up.
    const reached = await page
      .goto(SITE + (shot.site === true ? '' : shot.site), { waitUntil: 'networkidle' })
      .then(() => true)
      .catch(() => false);
    if (!reached) {
      missed.push(`${shot.name}: nothing answering at ${SITE} — is \`npm run dev\` up?`);
      await context.close();
      continue;
    }
    // The hero solves and draws itself on the client; nothing worth
    // photographing exists until it has.
    await page
      .waitForSelector('svg[aria-hidden]', { timeout: 15000 })
      .catch(() => missed.push(`${shot.name}: no mechanism drew at ${SITE}`));
    await page.mouse.move(6, shot.height - 10);
  } else {
    const payload = payloads[shot.template];
    if (!payload) missed.push(`${shot.name}: no template named ${shot.template}`);
    await page.goto(`${BASE}/${payload ? '?' + payload : ''}`, { waitUntil: 'domcontentloaded' });
    await waitForReady(page).catch(() => undefined);
    await page.waitForTimeout(700);
  }

  try {
    for (const [verb, argument] of shot.steps) {
      if (verb === 'tab') {
        // Pressed until it takes. A mode press lands on a control the app may
        // still be wiring up, and a press that does nothing leaves every step
        // after it working on the wrong panel — which is exactly how a picture
        // of the Analyze mode came out showing the Edit one.
        const tab = page.locator('.tabButton', { hasText: argument }).first();
        for (let go = 0; go < 4; go += 1) {
          await tab.click({ force: true });
          await page.waitForTimeout(400);
          const landed = await page.evaluate(
            (want) => new RegExp(want, 'i').test(document.querySelector('#bottomBar')?.textContent ?? ''),
            argument
          );
          if (landed) break;
          if (go === 3) missed.push(`${shot.name}: the ${argument} tab would not take`);
        }
      }
      else if (verb === 'click') await page.locator(argument).first().click({ force: true });
      else if (verb === 'wait') await page.waitForTimeout(Number(argument));
      // A pose by sample rather than by how long playback was left running:
      // where a mechanism is standing is the whole content of the picture, and
      // "play for 1500ms" is not a way of saying which pose that is.
      else if (verb === 'pose')
        await page.evaluate((sample) => {
          const grid = window.ng.getComponent(document.querySelector('app-new-grid'));
          grid.mechanismSrv.animate(Number(sample), false);
        }, argument);
      else if (verb === 'park') await page.mouse.move(6, (shot.height ?? 800) - 40);
      else if (verb === 'traces')
        await page.evaluate(() => {
          const grid = window.ng.getComponent(document.querySelector('app-new-grid'));
          grid.mechanismSrv.joints.forEach((joint) => (joint.showCurve = true));
        });
      // Velocity drawn on the mechanism itself, which is the sentence the
      // Analyze section makes beside this picture.
      else if (verb === 'vectors')
        await page.evaluate((id) => {
          const grid = window.ng.getComponent(document.querySelector('app-new-grid'));
          const joint = grid.mechanismSrv.joints.find((candidate) => candidate.id === id);
          if (joint) grid.mechanismSrv.toggleVectorTrace(joint, 'velocity');
        }, argument);
      else if (verb === 'expandGraphs') {
        const headers = page.locator('.graphHeader');
        const count = Math.min(await headers.count(), Number(argument) || 3);
        for (let index = 0; index < count; index += 1)
          await headers.nth(index).click({ force: true });
      } else if (verb === 'resetView')
        await page.locator('app-view-controls button').last().click({ force: true });
      // The fit frames the linkage, and the vector trace reaches well outside
      // it, so a picture with arrows in it has to give back some of that fit.
      else if (verb === 'zoomOut')
        for (let step = 0; step < Number(argument); step += 1) {
          await page.locator('app-view-controls button').nth(3).click({ force: true });
          await page.waitForTimeout(200);
        }
      // A phone is tall and a linkage is wide, so a plain fit leaves most of the
      // screen empty grid.
      else if (verb === 'zoomIn')
        for (let step = 0; step < Number(argument); step += 1) {
          await page.locator('app-view-controls button').nth(4).click({ force: true });
          await page.waitForTimeout(200);
        }
      else if (verb === 'selectJoint')
        await page.evaluate((id) => {
          const grid = window.ng.getComponent(document.querySelector('app-new-grid'));
          const joint = grid.mechanismSrv.joints.find((candidate) => candidate.id === id);
          if (joint) grid.activeObjService.updateSelectedObj(joint);
        }, argument);
      else if (verb === 'play') {
        await page.locator('.playButton').first().click({ force: true });
        await page.waitForTimeout(Number(argument));
        await page.locator('.playButton').first().click({ force: true });
      }
      await page.waitForTimeout(350);
    }
  } catch (error) {
    missed.push(`${shot.name}: ${String(error).split('\n')[0]}`);
  }

  // A silently-failed step is the failure mode this whole script has: a tab
  // click that did not land leaves the app in some other mode and the shot
  // still gets written, looking almost right. So every picture says what it is
  // supposed to be showing, and is asked before the shutter.
  if (shot.expect) {
    const wrong = await page.evaluate((want) => {
      const mode = document.querySelector('#bottomBar')?.textContent ?? '';
      // The Edit panel replaces itself with this when the mechanism is not at
      // the start of its cycle. It is a correct thing for the app to say and a
      // useless thing for a screenshot to show. Asked of what is on screen, not
      // of what is in the document: the panels the app is not showing are still
      // built, and one of them is always the Edit panel.
      const paused = document.querySelector('#placeholderContainer');
      if (paused && paused.getClientRects().length > 0) return 'editing is paused';
      if (want === 'edit') return /Edit/.test(mode) ? '' : `mode is "${mode.trim()}"`;
      return /Kinematic|Force/.test(mode) ? '' : `mode is "${mode.trim()}"`;
    }, shot.expect);
    if (wrong) missed.push(`${shot.name}: ${wrong}`);
  }

  const file = shot.site
    ? join(here, '../public/images/social-card.png')
    : join(OUT, `${shot.name}.png`);
  await page.screenshot({ path: file });
  deliverAt(file, shot.deliver);
  console.log(file.slice(file.indexOf('public/')));
  await context.close();
}

await browser.close();
if (missed.length) {
  console.log('\nsteps that did not run:');
  for (const line of missed) console.log('  ' + line);
  process.exitCode = 1;
}
