SHELL := /bin/bash
PORT ?= 3000
.PHONY: pull preview stop status

pull:    ; @git pull --rebase
status:  ; @if [ -f .serve.pid ] && kill -0 $$(cat .serve.pid) 2>/dev/null; then echo "Preview running (PID $$(cat .serve.pid)) at http://localhost:$(PORT)"; else echo "No preview running."; fi
preview: ; @if [ -f .serve.pid ] && kill -0 $$(cat .serve.pid) 2>/dev/null; then echo "Preview already running at http://localhost:$(PORT) (PID $$(cat .serve.pid))"; else command -v serve >/dev/null 2>&1 || { echo "Install serve: npm i -g serve"; exit 1; }; echo "Starting preview on http://localhost:$(PORT)"; serve -l $(PORT) . >/dev/null 2>&1 & echo $$! > .serve.pid; fi
stop:    ; @if [ -f .serve.pid ]; then kill $$(cat .serve.pid) >/dev/null 2>&1 || true; rm -f .serve.pid; echo "Preview stopped."; else echo "No preview to stop."; fi
