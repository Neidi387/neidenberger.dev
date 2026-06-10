#!/bin/sh
set -eu
if [ -d "$APACHE_WEB_ROOT/.git" ]; then
    echo "[redeploy-apache] Pulling latest changes..."
    git -C "$APACHE_WEB_ROOT" pull --ff-only
else
    echo "[redeploy-apache] Cloning repository..."
    git clone "$APACHE_REPO_URL" "$APACHE_WEB_ROOT"
fi
echo "[redeploy-apache] Done."
