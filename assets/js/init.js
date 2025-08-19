// Session gate: require Welcome preload for non-Home pages
const isWelcome = location.pathname.endsWith('/index.html') || location.pathname.endsWith('/') || location.pathname === '';
const isHome    = location.pathname.endsWith('/home.html');

if (!isWelcome && !isHome) {
  if (!sessionStorage.getItem('preloaded')) {
    location.replace('index.html');
  }
}

/* ---------- Utilities ---------- */
async function sha256Hex(str) {
  const enc = new TextEncoder().encode(str);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2,'0')).join('');
}

function drunkenBishop(hex, cols=17, rows=9) {
  const moves = [[-1,-1],[+1,-1],[-1,+1],[+1,+1]];
  const bytes = hex.match(/.{2}/g).map(h=>parseInt(h,16));
  const grid = Array.from({length:rows},()=>Array(cols).fill(0));
  let x = Math.floor(cols/2), y = Math.floor(rows/2);
  const bump = (xx,yy)=>{ if (xx>=0&&xx<cols&&yy>=0&&yy<rows) grid[yy][xx]++; };
  for (const b of bytes) for (let k=0;k<4;k++){
    const two = (b >> (k*2)) & 3, [dx,dy] = moves[two];
    x = Math.min(cols-1, Math.max(0, x+dx));
    y = Math.min(rows-1, Math.max(0, y+dy));
    bump(x,y);
  }
  // draw simple ascii map
  const symbols = " .o+=*BOX@%&#/^SE";
  let out = "";
  for (let yy=0; yy<rows; yy++){
    let line = "";
    for (let xx=0; xx<cols; xx++){
      const v = grid[yy][xx];
      line += symbols[Math.min(symbols.length-1, v)];
    }
    out += line + "\n";
  }
  return out.trim();
}

/* ---------- Identity loader (About/Contact optional) ---------- */
(async () => {
  try {
    const res = await fetch('site.json', { cache: 'no-store' });
    if (res.ok) {
      const cfg = await res.json();
      const addr = (cfg.admin_address || '').trim();
      const cap  = cfg.caption || "On-chain site identity";

      const artEl = document.getElementById('randomart');
      const capEl = document.getElementById('idcap');
      const tipEl = document.getElementById('tipaddr');

      if (addr) {
        const hex = await sha256Hex(addr);
        const art = drunkenBishop(hex, 17, 9);
        if (artEl) artEl.textContent = art + "\nsha256:" + hex.slice(0,16) + "…";
        if (capEl) capEl.textContent = cap + " — " + addr;
        if (tipEl) tipEl.textContent = addr;
      } else {
        if (artEl) artEl.textContent = "(identity load error: missing admin_address in site.json)";
      }
    }

    if (isHome) sessionStorage.setItem('preloaded', '1');
  } catch {
    const artEl = document.getElementById('randomart');
    if (artEl) artEl.textContent = "(identity load error)";
  }
})();
