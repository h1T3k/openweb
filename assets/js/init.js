// ---------- Welcome gate ----------
const isWelcome = location.pathname.endsWith('/index.html') || location.pathname.endsWith('/') || location.pathname === '';
const isHome    = location.pathname.endsWith('/home.html');

if (!isWelcome && !isHome) {
  if (!sessionStorage.getItem('preloaded')) {
    location.replace('index.html');
  }
}

// ---------- Helpers ----------
async function sha256Hex(str) {
  const enc = new TextEncoder().encode(str);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2,'0')).join('');
}
function mulberry32(a){ // tiny PRNG
  return function(){ let t=a+=0x6D2B79F5; t=Math.imul(t^t>>>15, t|1); t^=t+Math.imul(t^t>>>7, t|61); return ((t^t>>>14)>>>0)/4294967296; }
}

function gatherEntropyStr() {
  const parts = [];
  try { parts.push(navigator.userAgent || ''); } catch {}
  try { parts.push(navigator.language || ''); } catch {}
  try { parts.push((Intl.DateTimeFormat().resolvedOptions().timeZone) || ''); } catch {}
  try { parts.push(`${screen.width}x${screen.height}x${screen.colorDepth}`); } catch {}
  // stable across sessions on the same device: persist a uuid-ish salt
  let devSalt = localStorage.getItem('iconDevSalt');
  if (!devSalt) {
    devSalt = Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem('iconDevSalt', devSalt);
  }
  parts.push(devSalt);
  return parts.join('|');
}

// Make N×N green-on-black pixel SVG, using seeded RNG
function makeIconSVGDataURL(seed32, N=8) {
  const rnd = mulberry32(seed32);
  const cell = 6;         // px per cell
  const pad  = 2;         // outer padding
  const W = N*cell + pad*2, H = W;
  const on = [];          // list of rects when pixel is "on"
  for (let y=0; y<N; y++){
    for (let x=0; x<N; x++){
      const r = rnd();
      // 50% fill; tweak threshold if you want denser/sparser art
      if (r > 0.5) on.push(`<rect x="${pad + x*cell}" y="${pad + y*cell}" width="${cell}" height="${cell}" />`);
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="100%" height="100%" fill="#000"/>
    <g fill="#0f0" shape-rendering="crispEdges">${on.join('')}</g>
    <rect x="0.5" y="0.5" width="${W-1}" height="${H-1}" fill="none" stroke="#0f0" stroke-width="1"/>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

(async () => {
  // Load site config (optional)
  let address = '';
  let iconGrid = 8; // default 8x8; set to 4 for 4x4
  try {
    const res = await fetch('site.json', { cache: 'no-store' });
    if (res.ok) {
      const cfg = await res.json();
      address  = (cfg.admin_address || '').trim();
      iconGrid = (+cfg.icon_grid === 4) ? 4 : 8;
    }
  } catch {}

  // Seed: admin_address + device entropy (non-intrusive), then SHA-256 → first 4 bytes
  const seedMaterial = [address, gatherEntropyStr()].join('|');
  const hex = await sha256Hex(seedMaterial);
  const seed32 = parseInt(hex.slice(0,8), 16) >>> 0;

  // Build icon and mount it in the nav
  const icon = document.getElementById('site-icon');
  if (icon) {
    icon.src = makeIconSVGDataURL(seed32, iconGrid);
    icon.alt = `icon ${iconGrid}x${iconGrid}`;
    icon.title = `randomart ${iconGrid}×${iconGrid}`;
  }

  if (isHome) sessionStorage.setItem('preloaded', '1');
})();
