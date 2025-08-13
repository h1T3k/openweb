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
