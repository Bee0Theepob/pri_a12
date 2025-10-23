export default async function getUserProfile(token: string) {
  const response = await fetch(
    "https://a08-venue-explorer-backend.vercel.app/api/v1/auth/me",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    let msg = `Failed to fetch profile, status ${response.status}`;
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
