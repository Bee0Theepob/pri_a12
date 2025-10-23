export default async function getVenues() {
  const respone = await fetch(
    "https://a08-venue-explorer-backend.vercel.app/api/v1/venues"
  );

  if (!respone.ok) {
    throw new Error("Failed to fetch venues");
  }
  return await respone.json();
}
