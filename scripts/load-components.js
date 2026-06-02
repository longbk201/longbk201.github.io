/**
 * Fetches HTML partials from /components and injects them into mount points.
 */
export async function loadComponents(manifest) {
  const base = 'components/';

  await Promise.all(
    manifest.map(async ({ mount, file }) => {
      const el = document.getElementById(mount);
      if (!el) {
        console.warn('[FGS] Missing mount:', mount);
        return;
      }

      const res = await fetch(base + file);
      if (!res.ok) {
        throw new Error('Failed to load component: ' + file + ' (' + res.status + ')');
      }

      el.innerHTML = await res.text();
    })
  );
}
