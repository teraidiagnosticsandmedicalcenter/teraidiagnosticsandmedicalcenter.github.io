#!/usr/bin/env bash
set -e

echo "================================================="
echo "🚀 Starting Terai Diagnostic Production Deployment"
echo "🌐 Domain: https://teraidiagnosticsandmedicalcenter.com"
echo "================================================="

PROJECT_DIR="/opt/teraidiagnostics"
cd "$PROJECT_DIR"

# Ensure safe git directory & pull latest code from main
echo "📥 Syncing latest code from GitHub..."
git config --global --add safe.directory "$PROJECT_DIR"
git fetch origin main
git reset --hard origin/main

# Ensure shared external network exists
docker network create calldots_net || true

# Build and launch production Docker container
echo "📦 Building and updating Docker containers..."
docker compose -f docker-compose.prod.yml up -d --build --remove-orphans

# Verify container is running
echo "🩺 Verifying frontend container health..."
sleep 3
if docker ps | grep -q "teraidiagnostic-prod-frontend"; then
  echo "✅ Frontend container is running!"
else
  echo "❌ Frontend container failed to start"
  docker logs teraidiagnostic-prod-frontend
  exit 1
fi

# Reload main gateway Nginx if running
if docker ps | grep -q "calldots-prod-nginx"; then
  echo "🔒 Validating and reloading gateway Nginx reverse proxy..."
  docker exec calldots-prod-nginx nginx -t
  docker exec calldots-prod-nginx nginx -s reload
fi

echo "================================================="
echo "✅ Terai Diagnostic Production Deployment Succeeded!"
echo "🌐 Live at: https://teraidiagnosticsandmedicalcenter.com"
echo "================================================="
