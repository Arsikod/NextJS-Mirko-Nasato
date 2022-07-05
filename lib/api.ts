class ApiError extends Error {
  status: number;

  constructor(url: string, status: number) {
    super(`${url} returned ${status}`);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    this.name = "ApiError";
    this.status = status;
  }
}

export async function fetchJson<T>(url: string, options?: RequestInit) {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new ApiError(url, response.status);
  }

  return (await response.json()) as T;
}
