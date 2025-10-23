import getVenues from "@/libs/getVenues";
import VenueCatalog from "@/components/VenueCatalog";

export default async function Venue() {
  const venuesPromise = getVenues();

  return (
    <main className="text-center p-5">
      <h1 className="text-xl font-medium">Select Your Room</h1>
      <VenueCatalog venuesJson={venuesPromise} />
    </main>
  );
}
