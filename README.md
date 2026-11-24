# SauceDemo E2E Test Suite — Playwright + TypeScript

[![Playwright E2E Tests](https://github.com/rafaelsavietto/playwright-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/rafaelsavietto/playwright-portfolio/actions/workflows/playwright.yml)

**📊 Latest test report:** https://rafaelsavietto.github.io/playwright-portfolio/

End-to-end test suite for the public demo store [SauceDemo](https://www.saucedemo.com), built with **Playwright** and **TypeScript** using the **Page Object Model**, and run automatically in a **GitHub Actions** pipeline that publishes the HTML report to GitHub Pages.

## What this project demonstrates

- **Suite architecture:** Page Objects keep selectors and actions out of the tests; custom fixtures (e.g. an already-logged-in user) remove repeated setup.
- **Meaningful assertions:** the checkout test checks the order math (item total = sum of item prices, total = item total + tax), not just that a price is displayed.
- **Cross-browser and mobile:** every test runs in Chromium, Firefox, WebKit and an emulated Pixel 7.
- **CI/CD with quality gates:** a type-check step fails the build on broken code before any browser starts; tests run on every push and pull request and every Monday on a schedule; failed tests are retried in CI, with traces, screenshots and video kept for debugging.
- **Published results:** the HTML report from `main` is deployed to GitHub Pages, so anyone can see the latest run without cloning the repo.

## Test coverage

| Area | Scenarios |
|---|---|
| Login | valid user, wrong password, locked-out user, empty fields |
| Inventory | add and remove from cart, several items in cart, sort by price (both directions) |
| Checkout | full purchase with order-total math check, required-field validation |

## Stack

- [Playwright Test](https://playwright.dev/) + TypeScript
- Page Object Model with custom fixtures
- GitHub Actions + GitHub Pages

## Project structure

```
playwright-portfolio/
├── .github/workflows/
│   └── playwright.yml        # CI/CD pipeline
├── pages/                    # Page Objects
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/
│   ├── fixtures.ts           # Custom fixtures (e.g. logged-in user)
│   ├── login.spec.ts
│   ├── inventory.spec.ts
│   └── checkout.spec.ts
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

## Running locally

Requires Node.js 20 or later.

```bash
git clone https://github.com/rafaelsavietto/playwright-portfolio.git
cd playwright-portfolio

npm install
npm run install:browsers

npm test                  # all browsers, headless
npm run test:chromium     # Chromium only
npm run test:ui           # interactive UI mode for debugging
npm run report            # open the last HTML report
```

## CI/CD pipeline

The workflow in `.github/workflows/playwright.yml`:

1. Installs dependencies and **type-checks** the project (fast fail on broken code).
2. Runs the full suite on every push and pull request to `main`, every Monday at 06:00 UTC, and on demand.
3. Uploads the HTML report as a build artifact.
4. On `main`, **deploys the report to GitHub Pages**, even when tests fail, so the failure is visible.

## SauceDemo test users

| User | Behavior |
|---|---|
| `standard_user` | Normal flow |
| `locked_out_user` | Blocked at login |
| `problem_user` | Simulates UI bugs (wrong images) |
| `performance_glitch_user` | Simulates slow loading |

Password for all: `secret_sauce` (public demo credentials published by SauceDemo).

## Roadmap

- [ ] API tests with Playwright's `request` fixture against a public API
- [ ] AI-assisted test generation from user stories, with a write-up of the workflow
- [ ] Tests with `problem_user` and `performance_glitch_user`
- [ ] Accessibility checks with `axe-core`
- [ ] Allure report as an alternative to the built-in HTML report
- [ ] Companion repo: performance tests with k6

## Author

**Rafael Silva Savietto** — Senior QA Engineer
[LinkedIn](https://linkedin.com/in/rafael-silva-savietto-2b9b4559)
