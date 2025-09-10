# Etsy Playwright Automation (POM + Fixtures)

End-to-end tests for **etsy.com** written with **Playwright + TypeScript** using the **Page Object Model (POM)** and fixtures.  
The suite covers account scenarios (register, login, negative login), cart flows, and includes a **session saver** to bypass Etsy’s anti-bot CAPTCHA after solving it once.

>  **Note**: Etsy uses **DataDome sliding puzzle CAPTCHA**. The project handles this by saving the session after manual login. A helper (`runMyScript`) and optional **2Captcha integration** are included for experimentation, but the stable approach is **manual solve + reuse session**.

---

## Project Structure

fixtures/
├─ tests/
│ ├─ setup/
│ │ ├─ save-storage-state.spec.ts # Save Etsy session after solving puzzle once
│ │ └─ create-storage-states.spec.ts # Save states for 3 users
│ ├─ auth/ # Auth-related tests
│ │ ├─ login.ddt.spec.ts # Data-driven login
│ │ └─ login.negative.spec.ts
│ └─ cart/cart.crud.spec.ts # Cart add/edit/delete
└─ utils/
├─ runMyScript.ts / runMyScript.js # Puzzle solving helper
└─ runMyScript.d.ts # TS declaration
src/pages/ # Page Object Model classes
storage/ # Saved sessions (gitignored)
users.json # Multiple user credentials
.env # Environment variables (gitignored)


---

##  Prerequisites

- Node.js 18+
- Git
- At least one real Etsy account
- Playwright browsers installed (`npx playwright install --with-deps`)

---

## Environment Variables

Create `.env` in project root:

```ini
ETSY_BASE_URL=https://www.etsy.com

USER_ONE_EMAIL=your.email@example.com
USER_ONE_PASSWORD=yourpassword
USER_TWO_EMAIL=...
USER_TWO_PASSWORD=...
USER_THREE_EMAIL=...
USER_THREE_PASSWORD=...

APIKEY=your_2captcha_api_key   # optional
npx playwright test fixtures/tests/setup/save-storage-state.spec.ts --headed
**Run all tests:**
npx playwright test
**Run specific file:
npx playwright test fixtures/tests/auth/login.ddt.spec.ts
**Multiple Users**
storage/user-one.json
storage/user-two.json
storage/user-three.json
**Optional: 2Captcha**
Added 2captcha-node library

runMyScript.ts is provided to try automated CAPTCHA solving

Disabled by default (commented in save-storage-state.spec.ts)

**Features
**
Playwright + TypeScript

Page Object Model

Fixture setup

Data-driven login

Session storage

Optional CAPTCHA helper


**
