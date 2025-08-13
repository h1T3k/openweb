SHELL := /bin/bash
.ONESHELL:
PORT ?= 3000

# --- Preview (LAN) ---
.PHONY: ip pull preview stop status
ip:
	@ip -4 addr show | awk '/inet / && $$NF !~ /lo/ {print $$2}' | cut -d/ -f1

pull:
	@git pull --rebase

status:
	@if [ -f .serve.pid ] && kill -0 $$(cat .serve.pid) 2>/dev/null; then \
	  echo "Preview → http://$$(make -s ip | head -n1):$(PORT) (PID $$(cat .serve.pid))"; \
	else echo "No preview running."; fi

preview:
	@if [ -f .serve.pid ] && kill -0 $$(cat .serve.pid) 2>/dev/null; then \
	  echo "Already running → http://$$(make -s ip | head -n1):$(PORT)"; \
	else \
	  command -v serve >/dev/null 2>&1 || { echo "Install serve: npm i -g serve"; exit 1; }; \
	  echo "Starting preview on http://$$(make -s ip | head -n1):$(PORT)"; \
	  serve -l $(PORT) . >/dev/null 2>&1 & echo $$! > .serve.pid; \
	fi

stop:
	@if [ -f .serve.pid ]; then kill $$(cat .serve.pid) >/dev/null 2>&1 || true; rm -f .serve.pid; echo "Preview stopped."; \
	else echo "No preview to stop."; fi

# --- On-chain (EthFS @ Arbitrum Nova) ---
CHAIN ?= 42170
RPC ?= https://nova.arbitrum.io/rpc
ETHFS_ADDR ?=   # set after create

.PHONY: onchain-estimate onchain-create onchain-upload
onchain-estimate:
	ethfs-cli upload -f . -a 0x0000000000000000000000000000000000000000 -p 0xdead -c $(CHAIN) -r "$(RPC)" -e

onchain-create:
	read -rsp "Paste deployer private key (0x…): " PK; echo
	ethfs-cli create -p "$$PK" -c $(CHAIN) -r "$(RPC)"
	unset PK

onchain-upload:
	[ -n "$(ETHFS_ADDR)" ] || { echo "Set ETHFS_ADDR=0x..."; exit 1; }
	read -rsp "Paste deployer private key (0x…): " PK; echo
	ethfs-cli upload  -f . -a $(ETHFS_ADDR) -p "$$PK" -c $(CHAIN) -r "$(RPC)"
	ethfs-cli default -a $(ETHFS_ADDR) -f index.html -p "$$PK" -c $(CHAIN) -r "$(RPC)"
	unset PK
