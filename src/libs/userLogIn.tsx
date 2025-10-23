export default async function userLogIn(email: string, password: string) {
  const response = await fetch(
    "https://a08-venue-explorer-backend.vercel.app/api/v1/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }
  );

  if (!response.ok) {
    let msg = `Failed to log in, status ${response.status}`;
    try {
      const j = await response.json();
      if (j && j.message) msg = j.message;
    } catch (e) {
      // ignore
    }
    throw new Error(msg);
  }

  return await response.json();
}
