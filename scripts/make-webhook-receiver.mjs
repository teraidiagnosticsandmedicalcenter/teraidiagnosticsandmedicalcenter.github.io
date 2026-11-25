#!/usr/bin/env node

/**
 * Make (Integromat) Webhook Receiver Server
 * 
 * Run with:
 *   PORT=3001 WEBHOOK_SECRET="your-secure-secret-token" node scripts/make-webhook-receiver.mjs
 * 
 * Features:
 * - Listens for incoming HTTP POST requests from Make scenarios
 * - Authenticates requests using secret token
 * - Appends or updates tests in `src/data/dynamicTests.json`
 * - Automatically regenerates `public/sitemap.xml` with fresh lastmod timestamps
 */

import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET || "terai-make-secret-2026";
const DYNAMIC_TESTS_FILE = path.resolve(__dirname, "../src/data/dynamicTests.json");

// Ensure dynamic tests JSON file exists
if (!fs.existsSync(DYNAMIC_TESTS_FILE)) {
  fs.writeFileSync(DYNAMIC_TESTS_FILE, JSON.stringify([], null, 2), "utf8");
}

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Webhook-Secret");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  // Health check endpoint
  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", service: "Make Webhook Receiver for Terai Diagnostic" }));
    return;
  }

  // Webhook ingestion endpoint
  if (req.method === "POST" && req.url === "/api/make-webhook") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const payload = JSON.parse(body);

        // Verify Secret
        const incomingSecret = payload.secret || req.headers["x-webhook-secret"];
        if (incomingSecret !== WEBHOOK_SECRET) {
          res.writeHead(401, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "Unauthorized: Invalid secret token" }));
          return;
        }

        if (payload.action === "upsert_test") {
          const testData = payload.data?.test;
          if (!testData || !testData.id || !testData.name) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Missing required test id or name" }));
            return;
          }

          // Read current dynamic tests
          let currentList = [];
          try {
            currentList = JSON.parse(fs.readFileSync(DYNAMIC_TESTS_FILE, "utf8"));
          } catch {
            currentList = [];
          }

          const existingIndex = currentList.findIndex((t) => t.id === testData.id);
          const nowISO = new Date().toISOString().split("T")[0];
          testData.lastUpdated = testData.lastUpdated || nowISO;

          if (existingIndex >= 0) {
            currentList[existingIndex] = { ...currentList[existingIndex], ...testData };
          } else {
            currentList.push(testData);
          }

          fs.writeFileSync(DYNAMIC_TESTS_FILE, JSON.stringify(currentList, null, 2), "utf8");

          // Regenerate sitemap.xml automatically
          try {
            execSync("node --experimental-strip-types scripts/generate-sitemap.mjs", {
              cwd: path.resolve(__dirname, ".."),
              stdio: "inherit"
            });
          } catch (sitemapErr) {
            console.error("Failed to automatically regenerate sitemap:", sitemapErr);
          }

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              success: true,
              message: `Test '${testData.name}' (${testData.id}) successfully ingested. Sitemap refreshed.`,
              totalDynamicTests: currentList.length
            })
          );
          return;
        }

        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: `Unsupported action: ${payload.action}` }));
      } catch (err) {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Internal server error parsing payload", details: String(err) }));
      }
    });
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Endpoint not found" }));
});

if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => {
    console.log(`[Make Webhook] Server listening on http://localhost:${PORT}/api/make-webhook`);
  });
}

export { server };
