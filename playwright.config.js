// Playwright runs the whole experiment in headless Chromium.
//   npm test          -> starts the Firestore/Auth emulators, then runs this
//   npx playwright test  (without emulators) -> runs the offline-mode checks only
const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "tests",
  timeout: 90000,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:8000",
    headless: true,
    // Optional: point at a system Chromium instead of the Playwright-managed one
    // (used in CI containers that ship their own browser).
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_PATH }
      : {},
  },
  webServer: {
    command: "node scripts/serve.js",
    port: 8000,
    reuseExistingServer: true,
    timeout: 20000,
  },
});
