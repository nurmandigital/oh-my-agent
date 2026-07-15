---
name: api-integration
description: Integrasi API pihak ketiga secara konsisten dengan retry, timeout, circuit breaker, dan error mapping. Gunakan saat menghubungkan aplikasi dengan payment gateway, SMS, email, AI API, atau layanan eksternal lainnya.
---

# API Integration

## Overview

Skill ini memandu integrasi API pihak ketiga yang andal: menyusun client HTTP, menangani timeout, retry, circuit breaker, dan memetakan error eksternal ke domain error internal aplikasi.

## When to Use

- Mengintegrasikan payment gateway (Stripe, Midtrans, Xendit).
- Menghubungkan ke API AI (OpenAI, Anthropic, OpenRouter).
- Menggunakan layanan email/SMS (SendGrid, Twilio).
- Membuat wrapper HTTP internal agar konsisten di seluruh aplikasi.

## Langkah-Langkah

### 1. Install Dependencies
Gunakan fetch native jika memungkinkan. Jika butuh fitur tambahan, gunakan `undici` atau `ky` (Node.js). Hindari `axios` kecuali ada alasan spesifik.

```bash
npm install zod
npm install -D nock  # untuk testing
```

### 2. Konfigurasi API Client
Buat file konfigurasi di `src/config/external.ts`:
```typescript
import { z } from "zod";

const envSchema = z.object({
  PAYMENT_API_KEY: z.string().min(1),
  PAYMENT_BASE_URL: z.string().url(),
  PAYMENT_TIMEOUT: z.string().default("10000"),
});

export const paymentConfig = envSchema.parse(process.env);
```

### 3. HTTP Client Wrapper
Buat `src/lib/http-client.ts`:
```typescript
import { z } from "zod";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface HttpClientOptions {
  baseURL: string;
  apiKey: string;
  timeout: number;
  retries?: number;
}

export class HttpClient {
  private baseURL: string;
  private apiKey: string;
  private timeout: number;
  private retries: number;

  constructor(opts: HttpClientOptions) {
    this.baseURL = opts.baseURL;
    this.apiKey = opts.apiKey;
    this.timeout = opts.timeout;
    this.retries = opts.retries ?? 3;
  }

  async request<T>(
    method: HttpMethod,
    path: string,
    body?: unknown,
    schema?: z.ZodType<T>
  ): Promise<T> {
    const url = `${this.baseURL}${path}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    let lastError: Error | undefined;

    for (let attempt = 1; attempt <= this.retries; attempt++) {
      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.apiKey}`,
          },
          body: body ? JSON.stringify(body) : undefined,
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        const responseBody = await this.parseResponse(response);

        if (!response.ok) {
          throw this.mapError(response.status, responseBody);
        }

        if (schema) {
          return schema.parse(responseBody);
        }

        return responseBody as T;
      } catch (err) {
        lastError = err as Error;
        const isRetryable = this.isRetryableError(err);
        if (!isRetryable || attempt === this.retries) throw err;
        await this.delay(attempt * 1000);
      }
    }

    throw lastError;
  }

  private async parseResponse(response: Response) {
    const text = await response.text();
    try {
      return text ? JSON.parse(text) : null;
    } catch {
      return text;
    }
  }

  private isRetryableError(err: unknown): boolean {
    if (err instanceof Error && err.name === "AbortError") return true;
    if (err instanceof ExternalApiError && err.status >= 500) return true;
    return false;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private mapError(status: number, body: unknown): ExternalApiError {
    const message = typeof body === "object" && body !== null
      ? (body as { message?: string }).message ?? "External API error"
      : "External API error";
    return new ExternalApiError(message, status);
  }
}

export class ExternalApiError extends Error {
  constructor(message: string, public readonly status: number) {
    super(message);
    this.name = "ExternalApiError";
  }
}
```

### 4. Service Layer untuk API Tertentu
```typescript
// src/services/payment.service.ts
import { HttpClient } from "../lib/http-client.js";
import { paymentConfig } from "../config/external.js";
import { z } from "zod";

const client = new HttpClient({
  baseURL: paymentConfig.PAYMENT_BASE_URL,
  apiKey: paymentConfig.PAYMENT_API_KEY,
  timeout: Number(paymentConfig.PAYMENT_TIMEOUT),
  retries: 3,
});

const paymentSchema = z.object({
  id: z.string(),
  status: z.enum(["pending", "paid", "failed"]),
  amount: z.number(),
});

export async function createPayment(orderId: string, amount: number) {
  return client.request(
    "POST",
    "/payments",
    { orderId, amount },
    paymentSchema
  );
}

export async function getPaymentStatus(paymentId: string) {
  return client.request("GET", `/payments/${paymentId}`, undefined, paymentSchema);
}
```

### 5. Error Mapping
Selalu petakan error eksternal ke error domain internal. Jangan biarkan raw error pihak ketiga meledak ke client.

```typescript
// src/services/payment.service.ts (cont'd)
export async function safeCreatePayment(orderId: string, amount: number) {
  try {
    return await createPayment(orderId, amount);
  } catch (err) {
    if (err instanceof ExternalApiError && err.status === 402) {
      throw new PaymentFailedError("Pembayaran ditolak oleh provider");
    }
    if (err instanceof Error && err.name === "AbortError") {
      throw new PaymentTimeoutError("Payment gateway tidak merespons, coba lagi");
    }
    throw new PaymentFailedError("Gagal memproses pembayaran");
  }
}

export class PaymentFailedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PaymentFailedError";
  }
}

export class PaymentTimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PaymentTimeoutError";
  }
}
```

### 6. Logging
Jangan log API key. Log hanya URL, status, dan response body (jika tidak mengandung data sensitif).

```typescript
console.log(`[Payment API] ${method} ${path} -> ${status}`);
```

### 7. Aturan Keamanan

| Aturan | Detail |
|---|---|
| API key di env | Jangan hardcode. Jangan log. |
| HTTPS only | Hanya panggil API via HTTPS di production. |
| Timeout | Selalu set timeout (default 10 detik). |
| Retry | Retry hanya untuk error retryable (timeout, 5xx). Jangan retry 4xx. |
| Zod validation | Validasi response body dari API pihak ketiga. Jangan percaya tanpa cek. |

## Common Rationalizations

| Alasan | Fakta |
|---|---|
| "Langsung fetch saja di controller" | Membuat kode duplikat dan sulit di-test. Pisahkan ke service layer. |
| "Response API pasti valid" | Pihak ketiga bisa berubah. Validasi response dengan Zod. |
| "Retry semua error, biar aman" | Retry 4xx = membuang resource. Hanya retry network error / 5xx. |

## Red Flags

- API key hardcode di source code.
- Response API dipakai tanpa validasi.
- Tidak ada timeout (request bisa hang selamanya).
- Error eksternal dikirim langsung ke client.

## Verification

- [ ] API key diambil dari env var, bukan hardcode.
- [ ] Response dari API divalidasi dengan Zod.
- [ ] Timeout dan retry berfungsi saat API lambat.
- [ ] Error 4xx tidak di-retry.
- [ ] Error dipetakan ke domain error internal sebelum dikirim ke client.
- [ ] Unit test menggunakan mock (nock) untuk mensimulasikan response sukses dan gagal.
