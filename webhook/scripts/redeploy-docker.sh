#!/bin/sh
set -eu
echo "[redeploy-docker] Pulling latest image..."
docker compose -f "$DOCKER_COMPOSE_FILE" pull
echo "[redeploy-docker] Restarting service..."
docker compose -f "$DOCKER_COMPOSE_FILE" up -d --remove-orphans
echo "[redeploy-docker] Done."
