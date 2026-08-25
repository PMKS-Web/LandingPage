#!/usr/bin/env node
/**
 * The screenshots of the app that the landing page embeds, taken from the app.
 *
 *   node engine/shots.mjs [path-to-app-checkout]
 *
 * Preconditions: the app's dev server on http://localhost:4200 (`npm start` in
 * the app checkout) and a Playwright install at /tmp/pmks-playwright — the
 * arrangement `.claude/skills/ui-validate/SKILL.md` in that repo describes.
 *
 * This is the app's own `e2e/readme-shots.mjs` aimed at a different target: the
 * README's pictures are documentation and are taken at documentation sizes,
 * while a landing page puts one of these behind a rounded card half a column
 * wide on a retina display. So they are retaken here at twice the pixel density
 * and framed for that card, from real templates, with the mechanism left in a
 * pose that shows what the panel beside it is talking about.
 *
 * Not a check: it writes assets. Run it when the app's chrome moves.
 */
import { readFileSync, mkdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const app = resolve(process.argv[2] ?? join(here, '../../Planar-Mechanism-Kinematic-Simulator'));
const BASE = process.env.PMKS_BASE_URL ?? 'http://localhost:4200';
const OUT = join(here, '../public/images/app');

const { chromium } = await import(
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
    // What the Build section is about: a welded bucket, and the Edit panel open
    // on one of its joints so the states a joint can be in are all on screen.
    name: 'build',
    template: 'Loader_Bucket',
    width: 1440,
    height: 900,
    steps: [
      ['tab', 'Edit'],
      ['selectJoint', 'B'],
      ['resetView'],
      ['park'],
      ['wait', 600],
    ],
  },
  {
    // What the Analyze section is about: a quick return part way through its
    // stroke, with position, velocity and acceleration plotted beside it.
    name: 'analyze',
    template: 'Whitworth_Quick_Return',
    width: 1440,
    height: 980,
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

mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
const missed = [];

const only = process.env.ONLY?.split(',').map((name) => name.trim());

for (const shot of SHOTS) {
  if (only && !only.includes(shot.name)) continue;
  const context = await browser.newContext({
    viewport: { width: shot.width, height: shot.height },
    // Twice, not the README's 1.2: these sit in a card at roughly half a
    // 1440-wide page and have to hold up on a retina screen.
    deviceScaleFactor: 2,
  });
  await context.addInitScript(() => localStorage.setItem('tutorialSeen', 'true'));
  const page = await context.newPage();
  const payload = payloads[shot.template];
  if (!payload) missed.push(`${shot.name}: no template named ${shot.template}`);
  await page.goto(`${BASE}/${payload ? '?' + payload : ''}`, { waitUntil: 'domcontentloaded' });
  await waitForReady(page).catch(() => undefined);
  await page.waitForTimeout(700);

  try {
    for (const [verb, argument] of shot.steps) {
      if (verb === 'tab')
        await page.locator('.tabButton', { hasText: argument }).first().click({ force: true });
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
      else if (verb === 'park') await page.mouse.move(6, shot.height - 40);
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

  await page.screenshot({ path: join(OUT, `${shot.name}.png`) });
  console.log(join('public/images/app', `${shot.name}.png`));
  await context.close();
}

await browser.close();
if (missed.length) {
  console.log('\nsteps that did not run:');
  for (const line of missed) console.log('  ' + line);
  process.exitCode = 1;
}
