import "@testing-library/jest-dom";
import "whatwg-fetch";
import type {
  Request as UndiciRequest,
  Response as UndiciResponse,
} from "undici";
import { TextEncoder, TextDecoder } from "util";

Object.defineProperties(globalThis, {
  TextEncoder: { value: TextEncoder },
  TextDecoder: { value: TextDecoder },
});

declare global {
  var __undiciRequest__: typeof UndiciRequest | undefined;
  var __undiciResponse__: typeof UndiciResponse | undefined;
}

const globalWithUndici = globalThis as typeof globalThis & {
  __undiciRequest__?: typeof UndiciRequest;
  __undiciResponse__?: typeof UndiciResponse;
};

if (
  typeof globalWithUndici.__undiciRequest__ === "undefined" ||
  typeof globalWithUndici.__undiciResponse__ === "undefined"
) {
  import("undici").then(({ Request, Response }) => {
    Object.defineProperty(globalWithUndici, "__undiciRequest__", {
      value: Request,
      writable: false,
      configurable: true,
    });
    Object.defineProperty(globalWithUndici, "__undiciResponse__", {
      value: Response,
      writable: false,
      configurable: true,
    });

    if (typeof globalThis.Request === "undefined") {
      Object.defineProperty(globalThis, "Request", {
        value: Request,
        writable: false,
        configurable: true,
      });
    }
    if (typeof globalThis.Response === "undefined") {
      Object.defineProperty(globalThis, "Response", {
        value: Response,
        writable: false,
        configurable: true,
      });
    }
  });
}

jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((body: unknown) => ({
      json: () => body,
      cookies: { set: jest.fn() },
      status: 200,
    })),
  },
}));
