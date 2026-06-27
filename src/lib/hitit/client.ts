interface HititOptions {
  endpoint: string;
  method?: "GET" | "POST" | "PUT";
  body?: any;
  params?: Record<string, string>;
}

export async function hititClient<T>({
  endpoint,
  method = "GET",
  body,
  params,
}: HititOptions): Promise<T> {
  const baseUrl = process.env.HITIT_API_URL!;
  const apiKey = process.env.HITIT_API_KEY!;
  const secret = process.env.HITIT_API_SECRET!;

  const url = new URL(`${baseUrl}${endpoint}`);
  if (params) {
    Object.keys(params).forEach((key) =>
      url.searchParams.append(key, params[key])
    );
  }

  // Example HMAC-style authentication. Adjust to your Hitit spec.
  const timestamp = Date.now().toString();
  const signature = Buffer.from(`${apiKey}:${timestamp}:${secret}`).toString("base64");

  const response = await fetch(url.toString(), {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
      "X-Timestamp": timestamp,
      "X-Signature": signature,
      Accept: "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Hitit Error (${response.status}): ${errorText}`);
  }

  return response.json();
}
