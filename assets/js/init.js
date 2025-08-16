// assets/js/init.js
// - Gate: force first-time visitors through Welcome to set sessionStorage.preloaded
// - Randomart from site.json.admin_address
// - Collapsed pages: breadcrumb takes you Home (no lateral nav)
// - Home: mirror the News feed by copying its .posts HTML
// - EVERY page: load shared dotted-line notice from assets/snippets/notice.html

const isWelcome = location.pathname.endsWith('/index.html') || location.pathname.endsWith('/') || location.pathname === '';
const isHome    = location.pathname.endsWith('/home.html');

if (!isWelcome && !isHome) {
  if (!sessionStorage.getItem('preloaded')) {
    location.replace('index.html'); // preload via Welcome first
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

async function loadNotice() {
  const slot = document.getElementById('notice');
  if (!slot) return;
  try {
    const html = await (await fetch('assets/snippets/notice.html', { cache:'no-store' })).text();
    slot.innerHTML = html;
  } catch {
    slot.innerHTML = '<strong>independent design and typography</strong>';
  }
}

(async () => {
  try {
    // Identity tile
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

    // Collapsed pages: breadcrumb always returns Home
    if (document.body.classList.contains('collapsed')) {
      const link = document.getElementById('pathlink');
      if (link) link.addEventListener('click', (e) => { e.preventDefault(); location.href = 'home.html'; });
    }

    // Mark session as preloaded when Home loads
    if (isHome) sessionStorage.setItem('preloaded', '1');

    // Shared dotted-line notice on every page
    await loadNotice();

    // Home mirrors News feed (spacing + content)
    if (isHome) {
      const slot = document.getElementById('home-latest');
      if (slot) {
        try {
          const text = await (await fetch('news.html', { cache:'no-store' })).text();
          const doc  = new DOMParser().parseFromString(text, 'text/html');
          const posts = doc.querySelector('.posts');
          slot.innerHTML = posts ? posts.innerHTML : '<p><em>(no posts)</em></p>';
        } catch {
          slot.innerHTML = '<p><em>(could not load latest)</em></p>';
        }
      }
    }

  } catch {
    const artEl = document.getElementById('randomart');
    if (artEl) artEl.textContent = "(identity load error)";
  }
})();
