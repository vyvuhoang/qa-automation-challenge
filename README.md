# QA Automation Challenge

This repository contains a Playwright + TypeScript end-to-end automation framework for the OrangeHRM demo site. It covers:

- Login feature (UI tests)  
- Side-panel Search feature (UI tests)  
- GitHub Actions CI/CD to run tests and publish HTML reports via GitHub Pages.

---

## Project Structure

```
qa-automation-challenge/
├── pages/                   
│   ├── loginPage.ts
│   └── searchPage.ts
├── tests/                   
│   ├── login.spec.ts        
│   ├── search.spec.ts       
├── playwright.config.ts     
├── tsconfig.json            
├── package.json
├── .github/
│   └── workflows/
│       └── e2e-workflows.yml 
└── README.md                
```

---

## Setup Locally
### Prerequisites

- **Node.js** v22.17.0 (Tested version)
- **npm** 10.9.2 (Tested version)
---
1. **Clone the repo**  
   ```bash
   git clone git@github.com:<your-username>/qa-automation-challenge.git
   cd qa-automation-challenge
   ```

2. **Install dependencies**  
   ```bash
   npm ci
   ```

3. **Install Playwright browsers**  
   ```bash
   npx playwright install --with-deps
   ```

---

## Configuration

All tests use the **`baseURL`** defined in `playwright.config.ts`:

```ts
use: {
  baseURL: 'https://opensource-demo.orangehrmlive.com',
},
```

---

## Running Tests

### UI Tests

- **Run all UI tests**  
  ```bash
  npx playwright test
  ```

- **Run only Login specs**  
  ```bash
  npx playwright test tests/login.spec.ts
  ```

- **Run only Search specs**  
  ```bash
  npx playwright test tests/search.spec.ts
  ```

- **Headed mode** (see browsers)  
  ```bash
  npx playwright test --headed
  ```

## Reports

- After each run, an **HTML report** is generated under `playwright-report/`.  

---

## CI/CD

`.github/workflows/e2e-workflows.yml` workflow:

1. Checks out code on `push` & `pull_request` to `main`.  
2. Caches `node_modules`, installs deps, and Playwright browsers.  
3. Runs Login tests first, then Search tests.  
4. Uploads HTML report as an artifact.  

---

## Test Case Documentation

Full test case matrix is available **[here](https://docs.google.com/spreadsheets/d/1rWwfsK6cUL69bBPq1Mo6bnAIGCJEbQMLT5gYKXXZcgY/edit?usp=sharing)**.

---
