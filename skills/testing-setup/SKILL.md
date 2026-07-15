---
name: testing-setup
description: Setup testing infrastructure yang konsisten (Jest atau Vitest) dengan unit test, integration test, mocking, dan coverage threshold. Gunakan saat menambahkan testing ke proyek yang belum punya atau menyusun standar testing untuk tim.
---

# Testing Setup

## Overview

Skill ini memandu konfigurasi testing yang andal: memilih runner (Vitest untuk TS/ESM, Jest untuk legacy), menulis unit test, integration test, mocking external dependencies, dan mengatur coverage threshold.

## When to Use

- Menambahkan testing ke proyek yang belum punya.
- Menulis unit test untuk fungsi murni / helper.
- Menulis integration test untuk API endpoint atau DB query.
- Menentukan target coverage untuk CI/CD.

## Prasyarat

- Node.js 18+.
- Proyek sudah menggunakan TypeScript (disarankan).

## Langkah-Langkah

### 1. Pilih Test Runner

| Kriteria | Pilihan |
|---|---|
| Proyek baru dengan ESM/TS | **Vitest** |
| Proyek React (Vite) | **Vitest** |
| Proyek legacy (CommonJS) | **Jest** |
| Perlu React Testing Library | Vitest + @testing-library/react |

### 2. Setup Vitest (Rekomendasi)
```bash
npm install -D vitest @vitest/coverage-v8 @testing-library/jest-dom
npm install -D @testing-library/react @testing-library/user-event
```

Buat `vitest.config.ts`:
```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "node", // ganti "jsdom" untuk testing komponen React
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70, // branch lebih rendah karena sulit 100%
        statements: 80,
      },
    },
  },
});
```

### 3. Setup Jest (Legacy)
```bash
npm install -D jest ts-jest @types/jest
npx ts-jest config:init
```

`jest.config.js`:
```javascript
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  collectCoverageFrom: ["src/**/*.ts", "!src/**/*.d.ts"],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
```

### 4. Struktur Test File
Letakkan test di samping kode yang diuji:
```text
src/
├── utils/
│   ├── format.ts
│   └── format.test.ts   # Unit test untuk format.ts
├── services/
│   ├── users.service.ts
│   └── users.service.test.ts
└── components/
    ├── Button.tsx
    └── Button.test.tsx
```

### 5. Unit Test Pattern (Arrange-Act-Assert)
```typescript
// src/utils/format.test.ts
import { describe, it, expect } from "vitest";
import { formatCurrency } from "./format.js";

describe("formatCurrency", () => {
  // Arrange: siapkan input
  const amount = 1234567;

  // Act: jalankan fungsi
  const result = formatCurrency(amount);

  // Assert: verifikasi output
  it("should format IDR currency", () => {
    expect(formatCurrency(1000)).toBe("Rp 1.000");
  });

  it("should return dash for negative input", () => {
    expect(formatCurrency(-1)).toBe("-");
  });
});
```

### 6. Mock External Dependencies
Gunakan `vi.mock` (Vitest) untuk mengisolasi unit test dari pihak ketiga:
```typescript
// src/services/users.service.test.ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getUserById } from "./users.service.js";
import { prisma } from "../lib/prisma.js";
import { NotFoundError } from "../errors/index.js";

// Mock prisma client
vi.mock("../lib/prisma.js", () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
  },
}));

describe("getUserById", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return user when found", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: "1",
      email: "test@example.com",
    });

    const user = await getUserById("1");
    expect(user.email).toBe("test@example.com");
  });

  it("should throw NotFoundError when user not found", async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null);

    await expect(getUserById("999")).rejects.toThrow(NotFoundError);
  });
});
```

### 7. Integration Test (API Endpoint)
Gunakan `supertest` untuk endpoint testing (atau framework test bawaan jika ada):
```bash
npm install -D supertest @types/supertest
```

```typescript
// src/routes/users.routes.test.ts
import { describe, it, expect, beforeAll } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("GET /users/:id", () => {
  it("should return 404 for non-existent user", async () => {
    const res = await request(app).get("/users/999");
    expect(res.status).toBe(404);
    expect(res.body.error.message).toBe("User tidak ditemukan");
  });

  it("should return 200 for valid user", async () => {
    const res = await request(app).get("/users/1");
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("id");
  });
});
```

### 8. Coverage Thresholds
Atur di config untuk mencegah coverage turun drastis:
```typescript
coverage: {
  thresholds: {
    lines: 80,
    functions: 80,
    branches: 70,
    statements: 80,
  },
}
```
Test akan gagal jika coverage di bawah threshold.

### 9. Scripts
```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ci": "vitest run --coverage --passWithNoTests"
  }
}
```

### 10. CI Integration
```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run test:ci
```

## Common Rationalizations

| Alasan | Fakta |
|---|---|
| "Tests terlalu lambat, skip integration" | Integration test menangkap bug yang unit test lewat. Gunakan mock DB untuk kecepatan. |
| "100% coverage target" | Unrealistic dan memicu test kosong. Target 80% untuk fungsionalitas inti. |
| "Tidak perlu test helper murni" | Helper murni adalah tempat bug logika bersembunyi. Wajib di-test. |

## Red Flags

- Test menulis ke database production nyata.
- Tidak ada mocking untuk external API.
- Coverage 0% tapi test "pass".
- Test bergantung pada urutan eksekusi (state sharing antar test).
- `expect(true).toBe(true)` sebagai placeholder test.

## Verification

- [ ] `npm run test` menghasilkan output dengan status PASS.
- [ ] Coverage report dihasilkan dengan threshold tercapai.
- [ ] Unit test memakai pattern Arrange-Act-Assert.
- [ ] External dependency di-mock, bukan dipanggil nyata.
- [ ] Integration test tidak memodifikasi database production.
- [ ] CI pipeline menjalankan test sebelum merge.
