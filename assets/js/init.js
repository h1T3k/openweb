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

/* ---------- Init ---------- */
(async () => {
  try {
    /* Active nav */
    const currentFile = (() => {
      const f = location.pathname.split('/').pop();
      return f && f.length ? f : 'index.html';
    })();
    document.querySelectorAll('nav a[href]').forEach(a => {
      const hrefFile = a.getAttribute('href').split('/').pop();
      if (hrefFile === currentFile) {
        a.classList.add('current');
        a.setAttribute('aria-current','page');
      }
    });

    /* Randomart + caption + tip (only fills if elements exist) */
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

    /* News feed → Home + News (shared placeholder style) */
    let posts = [];
    try {
      const feedRes = await fetch('news.json', { cache: 'no-store' });
      if (feedRes.ok) {
        const feed = await feedRes.json();
        posts = Array.isArray(feed.posts) ? feed.posts.slice() : [];
      }
    } catch {}

    posts.sort((a,b)=> String(b.date||'').localeCompare(String(a.date||'')));

    // Home: show newest one post or placeholder
    const homeWrap = document.getElementById('home-latest');
    if (homeWrap) {
      if (posts.length) {
        const p = posts[0];
        homeWrap.innerHTML = `
          <h2>latest...</h2>
          <p><strong>${p.title||'Untitled'}</strong> — <a href="${p.url||'news.html'}">read</a></p>
          <p class="small">${p.date||''}</p>
        `;
      } else {
        homeWrap.innerHTML = `<h2>latest...</h2><p class="placeholder"><em>nothing here...</em></p>`;
      }
    }

    // News page: list all or placeholder
    const newsList = document.getElementById('news-list');
    if (newsList) {
      if (posts.length === 0) {
        newsList.innerHTML = `<p class="placeholder"><em>nothing here...</em></p>`;
      } else {
        newsList.innerHTML = posts.map(p=>`
          <article class="fullrow">
            <h3>${p.title||'Untitled'}</h3>
            <p class="small">${p.date||''}</p>
            ${p.excerpt ? `<p>${p.excerpt}</p>` : ``}
            <p><a href="${p.url||'news.html'}">open</a></p>
            <hr>
          </article>
        `).join('');
      }
    }

    if (isHome) sessionStorage.setItem('preloaded', '1');
  } catch {
    const artEl = document.getElementById('randomart');
    if (artEl) artEl.textContent = "(identity load error)";
  }
})();
