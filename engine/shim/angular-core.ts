/**
 * Enough of @angular/core for the two vendored services to load outside Angular.
 *
 * `SliderMarkService` is a plain class that happens to carry an `@Injectable`
 * decorator; nothing in the mark geometry touches the framework. Aliasing the
 * import here keeps the vendored file byte-identical to the app's, so a resync
 * stays a straight copy.
 */
export function Injectable(_config?: unknown) {
  return function (target: unknown) {
    return target as never;
  };
}
