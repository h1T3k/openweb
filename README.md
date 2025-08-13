# openweb

⸻

A) Create the (private) repo on your iPhone
	1.	GitHub (Safari/app) → New repository
	•	Name: abject-limousine (or keep what you already started)
	•	Visibility: Private
	•	Initialize with no README (not required)
	2.	Add files and folders (GitHub creates folders from the path):
	•	Tap Add file → Create new file.
	•	Use each path below, paste content, then Commit changes. Repeat.

styles/main.css

:root { --col:#000; --bg:#fff; --rule:1px solid #000; --w:720px; --pad:16px; }
* { box-sizing: border-box; }
html, body { margin:0; padding:0; background:var(--bg); color:var(--col); font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; }
.wrap { max-width: var(--w); margin: 0 auto; padding: var(--pad); }
nav { display:flex; gap:12px; align-items:center; border-bottom: var(--rule); padding: 8px 0; }
nav a { color:#06c; text-decoration: underline; }
header.site { text-align:center; margin:18px 0; }
hr { border:none; border-top:var(--rule); margin:14px 0; }
figure { margin:0 0 12px 0; }
img { max-width:100%; height:auto; display:block; border:1px solid #000; }
footer { border-top:var(--rule); margin-top:16px; padding-top:12px; text-align:center; color:#333; }
.small { font-size:12px; color:#333; }
.center { text-align:center; }
.notice { background:#fafafa; border:1px dashed #000; padding:8px; }

index.html

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Welcome</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="preload" href="styles/main.css?v=1" as="style">
<link rel="preload" href="home.html" as="document">
<link rel="preload" href="news.html" as="document">
<link rel="preload" href="about.html" as="document">
<link rel="preload" href="contact.html" as="document">
<link rel="stylesheet" href="styles/main.css?v=1">
<style>
  body { background:#000; color:#0f0; display:grid; place-items:center; min-height:100vh; }
  a { color:#0f0; text-decoration:none; font-weight:bold; }
  .stack { display:grid; gap:12px; place-items:center; }
</style>
</head>
<body>
  <div class="stack">
    <img src="assets/welcome/default.svg" alt="welcome" width="220" height="80">
    <div class="center"><a href="home.html">Enter → Home</a></div>
    <div class="small center" style="color:#7f7;">preload: home / news / about / contact</div>
  </div>
</body>
</html>

home.html

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Home</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="styles/main.css?v=1">
</head>
<body>
  <div class="wrap">
    <nav>
      <img src="assets/icons/logo.svg" alt="logo" width="24" height="24">
      <a href="home.html">Home</a>
      <a href="news.html">News</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </nav>

    <header class="site">
      <h1>Keaton Raser — Portfolio</h1>
      <div class="small">simple. fast. censorship-resistant.</div>
    </header>

    <hr>

    <section class="notice center">
      <strong>Mission:</strong> straight-to-the-point design & typography.
    </section>

    <hr>

    <section>
      <h2>Latest</h2>
      <p><em>No posts yet.</em></p>
    </section>

    <footer>
      <div>© 2025 K.R.</div>
      <div class="small">Tip: <code>0xYourWalletHere</code></div>
    </footer>
  </div>
</body>
</html>

news.html

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>News</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="styles/main.css?v=1">
</head>
<body>
  <div class="wrap">
    <nav>
      <img src="assets/icons/logo.svg" alt="logo" width="24" height="24">
      <a href="home.html">Home</a>
      <a href="news.html">News</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </nav>

    <header class="site">
      <h1>News</h1>
      <div class="small">articles & updates</div>
    </header>

    <hr>

    <section class="posts">
      <p><em>No posts yet.</em></p>
    </section>

    <footer class="center small">
      <a href="news.welcome.html">Open via Welcome first</a>
    </footer>
  </div>
</body>
</html>

about.html

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>About</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="styles/main.css?v=1">
</head>
<body>
  <div class="wrap">
    <nav>
      <img src="assets/icons/logo.svg" alt="logo" width="24" height="24">
      <a href="home.html">Home</a>
      <a href="news.html">News</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </nav>

    <header class="site">
      <h1>About</h1>
    </header>

    <hr>

    <section>
      <p>Designer focused on type, branding, and straightforward systems. Based in Los Angeles.</p>
    </section>

    <footer class="center small">
      <a href="about.welcome.html">Open via Welcome first</a>
    </footer>
  </div>
</body>
</html>

contact.html

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Contact</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="styles/main.css?v=1">
</head>
<body>
  <div class="wrap">
    <nav>
      <img src="assets/icons/logo.svg" alt="logo" width="24" height="24">
      <a href="home.html">Home</a>
      <a href="news.html">News</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </nav>

    <header class="site">
      <h1>Contact</h1>
    </header>

    <hr>

    <section>
      <p>Email: <a href="mailto:r.a.s.e.r.keaton@yahoo.com">r.a.s.e.r.keaton@yahoo.com</a></p>
      <p class="small">Wallet (tips): <code>0xYourWalletHere</code></p>
    </section>

    <footer class="center small">
      <a href="contact.welcome.html">Open via Welcome first</a>
    </footer>
  </div>
</body>
</html>

news.welcome.html

<!DOCTYPE html><meta http-equiv="refresh" content="0; url=index.html"><title>Redirecting…</title>

about.welcome.html

<!DOCTYPE html><meta http-equiv="refresh" content="0; url=index.html"><title>Redirecting…</title>

contact.welcome.html

<!DOCTYPE html><meta http-equiv="refresh" content="0; url=index.html"><title>Redirecting…</title>

assets/icons/logo.svg

<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64"><rect width="100%" height="100%" fill="black"/><text x="50%" y="54%" fill="#0f0" font-family="monospace" font-size="24" text-anchor="middle">KR</text></svg>

assets/welcome/default.svg

<svg xmlns="http://www.w3.org/2000/svg" width="220" height="80"><rect width="100%" height="100%" fill="black"/><text x="50%" y="58%" fill="#0f0" font-family="monospace" font-size="28" text-anchor="middle">welcome</text></svg>

assets/welcome/direct.svg (same as default)

<svg xmlns="http://www.w3.org/2000/svg" width="220" height="80"><rect width="100%" height="100%" fill="black"/><text x="50%" y="58%" fill="#0f0" font-family="monospace" font-size="28" text-anchor="middle">welcome</text></svg>

.gitignore

.serve.pid

Makefile (preview helpers; add now so you can use it later)

# --- Preview helpers for PinePhone ---
SHELL := /bin/bash
PORT ?= 3000

.PHONY: ip pull preview stop status

ip:
	@ip -4 addr show | awk '/inet / && $$NF !~ /lo/ {print $$2}' | cut -d/ -f1

pull:
	@git pull --rebase

status:
	@if [ -f .serve.pid ] && kill -0 $$(cat .serve.pid) 2>/dev/null; then \
	  echo "Preview running at http://$$(make -s ip | head -n1):$(PORT) (PID $$(cat .serve.pid))"; \
	else echo "No preview running."; fi

preview:
	@if [ -f .serve.pid ] && kill -0 $$(cat .serve.pid) 2>/dev/null; then \
	  echo "Already running → http://$$(make -s ip | head -n1):$(PORT)"; \
	else \
	  command -v serve >/dev/null 2^>/dev/null || { echo "Install serve: npm i -g serve"; exit 1; }; \
	  echo "Starting preview on http://$$(make -s ip | head -n1):$(PORT)"; \
	  serve -l $(PORT) . >/dev/null 2>&1 & echo $$! > .serve.pid; \
	fi

stop:
	@if [ -f .serve.pid ]; then kill $$(cat .serve.pid) >/dev/null 2>&1 || true; rm -f .serve.pid; echo "Preview stopped."; \
	else echo "No preview to stop."; fi

Resulting structure (just to sanity-check):

abject-limousine/
  index.html
  home.html
  news.html
  about.html
  contact.html
  news.welcome.html
  about.welcome.html
  contact.welcome.html
  styles/
    main.css
  assets/
    icons/logo.svg
    welcome/default.svg
    welcome/direct.svg
  .gitignore
  Makefile


⸻

B) Give your PinePhone access to the private repo (SSH)

On PinePhone (Terminal):

ssh-keygen -t ed25519 -C "pinephone-preview"    # press Enter to accept defaults
cat ~/.ssh/id_ed25519.pub                       # copy the WHOLE line

On iPhone → GitHub:
Profile → Settings → SSH and GPG keys → New SSH key
	•	Title: PinePhone
	•	Paste the key → Add SSH key

Back on PinePhone (test + clone):

ssh -T [email protected]       # should say "Hi <username>!"
cd ~
git clone git@github.com:<your-username>/abject-limousine.git
cd abject-limousine


⸻

C) Install preview tools on PinePhone

sudo apt update
sudo apt install -y git curl nodejs npm make
sudo npm -g i serve


⸻

D) Start LAN preview and open it on your iPhone

On PinePhone:

make preview          # starts server, prints the exact URL
# (or) serve -l 3000 .

Get PinePhone’s LAN IP (if you didn’t use make preview):

make ip
# copy the first 192.168.x.x or 10.x.x.x

On iPhone (same Wi-Fi):
Open Safari → http://<that-LAN-IP>:3000/ → browse the site.
Add Bookmark / Add to Home Screen for 1-tap access while you iterate.

Update loop (while tweaking visuals):
	•	Edit on iPhone (GitHub) → Commit changes
	•	On PinePhone → make pull
	•	On iPhone Safari → pull to refresh
	•	If CSS looks cached, bump ?v=2 in the <link href="styles/main.css?v=2"> and commit.

Stop preview (when done):

make stop


⸻

E) “Nail the visuals” checklist (fast passes on iPhone)
	1.	Grid width: in styles/main.css, change --w: (e.g., 720px → 680/760), commit, make pull, refresh.
	2.	Nav rhythm: adjust nav { gap:12px; padding: 8px 0; } and link color.
	3.	Type color/contrast: tweak --col, --bg (try #111/#fafafa).
	4.	Mission box: edit .notice { ... } padding/border; check feel.
	5.	SVG crispness: confirm logo.svg looks sharp at 24×24; change fill/size inside the SVG if needed.
	6.	Welcome screen: in index.html inline <style>, push background to charcoal (#080808) or brighten link color slightly.
	7.	iPhone home-screen icon (optional): later, add apple-touch-icon.png and a <link rel="apple-touch-icon" href="apple-touch-icon.png">.
	8.	OG/Twitter card (optional): add <meta property="og:title" ...> etc. when you want rich unfurls.

Do quick micro-commits per change; it keeps your eye honest.

⸻

F) Ready to publish on-chain (Arbitrum Nova) — minimal steps

(Do this only after your visuals feel locked.)

1) Install EthFS CLI (PinePhone)

sudo npm -g i ethfs-cli
ethfs-cli --help

2) Estimate bytes + gas (Nova)

# from repo root
find . -type f -not -path './.git/*' -printf '%s\n' | awk '{s+=$1} END{print s " bytes"}'

# estimate (no tx sent)
ethfs-cli upload -f . -a 0x0000000000000000000000000000000000000000 -p 0xdead \
  -c 42170 -r https://nova.arbitrum.io/rpc -e

Buy a tiny buffer above the estimate.

3) Fund once via Kraken (fast in/out)
	•	Deposit USD → Buy ETH (spot) → Withdraw to your MetaMask address on Arbitrum Nova.
	•	Close Kraken.

4) Create the on-chain directory + upload

# env
export RPC="https://nova.arbitrum.io/rpc"
export CHAIN=42170
export PK=0xYOUR_PRIVATE_KEY

# create (prints contract address)
ethfs-cli create -p $PK -c $CHAIN -r "$RPC"
export ETHFS_ADDR=0xPASTE_THE_ADDRESS

# upload and set default
ethfs-cli upload  -f . -a $ETHFS_ADDR -p $PK -c $CHAIN -r "$RPC"
ethfs-cli default -a $ETHFS_ADDR -f index.html -p $PK -c $CHAIN -r "$RPC"

5) Open like a normal site (clearnet via gateway)

https://$ETHFS_ADDR.arb-nova.w3link.io/

(Native web3 URL: web3://$ETHFS_ADDR:42170/)

Makefile add-on (optional, so redeploys are one liners)

# --- On-chain (EthFS @ Arbitrum Nova) ---
PK ?=
RPC ?= https://nova.arbitrum.io/rpc
CHAIN ?= 42170
ETHFS_ADDR ?=

.PHONY: onchain-create onchain-upload

onchain-create:
	@[ -n "$(PK)" ] || { echo "Set PK=0x..."; exit 1; }
	ethfs-cli create -p $(PK) -c $(CHAIN) -r "$(RPC)"

onchain-upload:
	@[ -n "$(PK)" ] && [ -n "$(ETHFS_ADDR)" ] || { echo "Set PK and ETHFS_ADDR"; exit 1; }
	ethfs-cli upload  -f . -a $(ETHFS_ADDR) -p $(PK) -c $(CHAIN) -r "$(RPC)"
	ethfs-cli default -a $(ETHFS_ADDR) -f index.html -p $(PK) -c $(CHAIN) -r "$(RPC)"

Usage:

make onchain-create   # copy printed address → export ETHFS_ADDR=0x...
make onchain-upload   # for each update after you commit on iPhone


⸻

G) Tiny cheat-sheet you can paste into README.md

## Local preview (private repo)
PinePhone:
- make preview → open http://<IP>:3000 on iPhone
- After each commit on iPhone → make pull → refresh
- make stop to stop

## Publish on-chain (Arbitrum Nova)
- sudo npm -g i ethfs-cli
- Estimate: ethfs-cli upload -f . -a 0x0 -p 0xdead -c 42170 -r https://nova.arbitrum.io/rpc -e
- Fund ETH on Nova (Kraken → withdraw to MetaMask)
- Create: ethfs-cli create -p $PK -c 42170 -r https://nova.arbitrum.io/rpc
- Upload: ethfs-cli upload -f . -a $ETHFS_ADDR -p $PK -c 42170 -r https://nova.arbitrum.io/rpc
- Default: ethfs-cli default -a $ETHFS_ADDR -f index.html -p $PK -c 42170 -r https://nova.arbitrum.io/rpc
- Open: https://$ETHFS_ADDR.arb-nova.w3link.io/


⸻

If you want, tell me your GitHub username and whether your repo name is exactly abject-limousine. I’ll tailor the commands (and generate a one-shot script that prints your iPhone URL automatically and then your final w3link URL when you go live).
