export async function fetcher<T>(
  input: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(input, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
