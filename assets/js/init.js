// Session gate: require Welcome preload for non-Home pages
const isWelcome = location.pathname.endsWith('/index.html') || location.pathname.endsWith('/') || location.pathname === '';
const isHome    = location.pathname.endsWith('/home.html');

if (!isWelcome && !isHome) {
  if (!sessionStorage.getItem('preloaded')) {
    location.replace('index.html');
  }
}

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
  const palette = " .o+=*BOX@%&#/^";
  const maxv = Math.max(1, ...grid.flat());
  const art = grid.map(r=>r.slice());
  art[Math.floor(rows/2)][Math.floor(cols/2)] = 'S';
  art[y][x] = 'E';
  const lines = [];
  lines.push("+" + "-".repeat(cols) + "+");
  for (let r=0;r<rows;r++){
    let line="|";
    for (let c=0;c<cols;c++){
      const v = art[r][c];
      if (v==='S'||v==='E'){ line+=v; continue; }
      const idx = Math.round((grid[r][c]/maxv) * (palette.length-1));
      line += palette[idx];
    }
    line += "|";
    lines.push(line);
  }
  lines.push("+" + "-".repeat(cols) + "+");
  return lines.join("\n");
}

(async () => {
  try {
    const cfg = await (await fetch('site.json')).json();
    const addr = (cfg.admin_address||'').trim();
    const cap  = cfg.caption || "On-chain site identity";
    if (addr) {
      const hex = await sha256Hex(addr);
      const art = drunkenBishop(hex, 17, 9);
      const artEl = document.getElementById('randomart');
      const capEl = document.getElementById('idcap');
      const tipEl = document.getElementById('tipaddr');
      if (artEl) artEl.textContent = art + "\nsha256:" + hex.slice(0,16) + "…";
      if (capEl) capEl.textContent = cap + " — " + addr;
      if (tipEl) tipEl.textContent = addr;
    }
    if (isHome) sessionStorage.setItem('preloaded', '1');
  } catch {
    const artEl = document.getElementById('randomart');
    if (artEl) artEl.textContent = "(identity load error)";
  }
})();
