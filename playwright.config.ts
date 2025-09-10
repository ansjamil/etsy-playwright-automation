import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

const baseURL = process.env.ETSY_BASE_URL || 'https://www.etsy.com';

export default defineConfig({
  testDir: './fixtures/tests',
  timeout: 90_000,
  expect: { timeout: 10_000 },
  retries: 1,
  workers: 1,                // gentler, fewer anti-bot triggers
  reporter: [['list']],
  use: {
    baseURL,
    channel: 'chrome',       // looks more like a real browser
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1366, height: 768 }
  },
  projects: [
    // no stored state -> use this for real login tests (DDT + negative)
    { name: 'chromium', use: { ...devices['Desktop Chrome'], storageState: undefined } },

    // NEW: already-signed-in project using the session you save below
    { name: 'auth-email', use: { ...devices['Desktop Chrome'], storageState: 'storage/etsy-user.json' } },

    // (optional) your existing per-user states for other demos
    { name: 'user-one',   use: { storageState: 'storage/user-one.json',   ...devices['Desktop Chrome'] } },
    { name: 'user-two',   use: { storageState: 'storage/user-two.json',   ...devices['Desktop Chrome'] } },
    { name: 'user-three', use: { storageState: 'storage/user-three.json', ...devices['Desktop Chrome'] } },
  ],
});
