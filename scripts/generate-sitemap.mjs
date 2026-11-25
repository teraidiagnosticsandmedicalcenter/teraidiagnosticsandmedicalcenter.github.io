import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const BASE_URL = "https://teraidiagnosticsandmedicalcenter.com";
const ALT_URL = "https://trydiagnosticsandmedicalcenter.com";

// Load test data using Node's native strip-types or regex parse, plus dynamicTests.json
async function getTests() {
  let tests = [];
  try {
    // In Node 22+ with experimental-strip-types or direct import
    const { diagnosticTestsData } = await import("../src/data/tests.ts");
    tests = [...diagnosticTestsData];
  } catch (err) {
    console.warn("Direct import failed, parsing tests.ts via regex fallback...", err.message);
    const content = fs.readFileSync(path.join(rootDir, "src/data/tests.ts"), "utf-8");
    const matches = [...content.matchAll(/id:\s*"([^"]+)"/g)].map(m => ({ id: m[1], lastUpdated: new Date().toISOString().split("T")[0] }));
    tests = matches;
  }

  // Check if any dynamic tests from Make webhook receiver exist
  const dynamicTestsPath = path.join(rootDir, "src/data/dynamicTests.json");
  if (fs.existsSync(dynamicTestsPath)) {
    try {
      const dynamicList = JSON.parse(fs.readFileSync(dynamicTestsPath, "utf-8"));
      for (const dTest of dynamicList) {
        const idx = tests.findIndex(t => t.id === dTest.id);
        if (idx >= 0) {
          tests[idx] = { ...tests[idx], ...dTest };
        } else {
          tests.push(dTest);
        }
      }
    } catch {
      // Ignore json parse error if empty
    }
  }

  return tests;
}

async function generateSitemap() {
  const tests = await getTests();
  const today = new Date().toISOString().split("T")[0];

  const staticRoutes = [
    { loc: `${BASE_URL}/`, priority: "1.0", changefreq: "daily", lastmod: today },
    { loc: `${BASE_URL}/about`, priority: "0.9", changefreq: "monthly", lastmod: today },
    { loc: `${BASE_URL}/facilities`, priority: "0.9", changefreq: "weekly", lastmod: today },
    { loc: `${BASE_URL}/tests`, priority: "0.9", changefreq: "daily", lastmod: today },
    { loc: `${BASE_URL}/packages`, priority: "0.9", changefreq: "weekly", lastmod: today },
    { loc: `${BASE_URL}/departments`, priority: "0.8", changefreq: "monthly", lastmod: today },
    { loc: `${BASE_URL}/doctors`, priority: "0.9", changefreq: "weekly", lastmod: today },
    { loc: `${BASE_URL}/gallery`, priority: "0.7", changefreq: "monthly", lastmod: today },
    { loc: `${BASE_URL}/contact`, priority: "0.8", changefreq: "monthly", lastmod: today },
  ];

  const testRoutes = tests.map(test => ({
    loc: `${BASE_URL}/tests/${test.id}`,
    priority: "0.9",
    changefreq: "weekly",
    lastmod: test.lastUpdated || today,
  }));

  const allUrls = [...staticRoutes, ...testRoutes];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allUrls
  .map(
    item => `  <url>
    <loc>${item.loc}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  const outPath = path.join(rootDir, "public/sitemap.xml");
  fs.writeFileSync(outPath, sitemapXml.trim(), "utf-8");
  console.log(`✅ Successfully generated dynamic sitemap at ${outPath} with ${allUrls.length} indexed URLs!`);
}

generateSitemap().catch(console.error);
