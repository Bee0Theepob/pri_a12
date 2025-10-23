export default async function getVenue(vid: string) {
  const respone = await fetch(
    `https://a08-venue-explorer-backend.vercel.app/api/v1/venues/${vid}`
  );

  if (!respone.ok) {
    throw new Error("Failed to fetch venue by id");
  }
  return await respone.json();
}
