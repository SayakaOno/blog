/**
 * Normalize an internal path so it ends in exactly one trailing slash.
 *
 * The site builds with Astro's default `build.format: 'directory'`, so every
 * page is served at a directory URL (`/lifelog/ja/`). Linking without the
 * slash makes the host 301-redirect to the slashed form, which Google Search
 * Console reports as "Page with redirect".
 *
 * Only for internal paths — external URLs are passed through unchanged.
 */
export default function withSlash(path: string): string {
  if (!path) {
    return '/';
  }
  if (/^[a-z]+:/i.test(path) || path.startsWith('//')) {
    return path;
  }
  return path.endsWith('/') ? path : `${path}/`;
}
