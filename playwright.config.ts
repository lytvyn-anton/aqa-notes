import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI
const externalBaseURL = process.env.BASE_URL
const baseURL = externalBaseURL ?? (isCI ? 'http://localhost:4173' : 'http://localhost:5173')

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: [
    isCI ? ['github'] : ['html'],
    ...(process.env.QASE_API_TOKEN && process.env.QASE_PLAN_ID ? [
      ['playwright-qase-reporter', {
        mode: 'testops',
        testops: {
          api: { token: process.env.QASE_API_TOKEN },
          project: 'PWA',
          plan: { id: Number(process.env.QASE_PLAN_ID) },
          run: {
              complete: true,
              title: process.env.BROWSER_NAME ? `${process.env.BROWSER_NAME} — Automated run` : undefined,
            },
        },
        framework: {
          playwright: {
            browser: { addAsParameter: true },
          },
        },
      }] as [string, object],
    ] : []),
  ],
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 10_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  webServer: externalBaseURL
    ? undefined
    : {
        command: isCI ? 'npm run preview' : 'npm run dev',
        url: baseURL,
        reuseExistingServer: !isCI,
      },
});
