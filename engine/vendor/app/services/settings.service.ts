/**
 * Build-time stand-in for the app's Angular `SettingsService`.
 *
 * Four vendored model files and the fixture harness reach for
 * `SettingsService.objectScale` — the size the drawn marks are struck at — and
 * that is the only member any of them touches. Pulling the real service in
 * would drag @angular/core, rxjs and the whole settings graph into a script
 * that only wants geometry, so this supplies the one number, read from the same
 * leaf module the real service reads it from.
 *
 * engine/sync.mjs copies this over vendor/app/services/settings.service.ts, so
 * the vendored files' own relative import lands here untouched.
 */
import { OBJECT_SCALE } from '../model/object-scale';

export class SettingsService {
  static _objectScale = OBJECT_SCALE;
  static objectScaleChosen = false;

  static get objectScale(): number {
    return SettingsService._objectScale.value;
  }

  get objectScale(): number {
    return SettingsService._objectScale.value;
  }
}
