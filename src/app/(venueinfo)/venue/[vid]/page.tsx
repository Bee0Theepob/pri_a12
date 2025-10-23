import Image from "next/image";
import getVenue from "@/libs/getVenue";

export default async function CardDetailPage(props: any) {
  let params = props?.params;
  if (params && typeof params.then === "function") {
    params = await params;
  }

  const vid = params?.vid as string;

  const venueJson: any = await getVenue(vid);
  const v = venueJson.data;

  return (
    <main className="text-center p-5">
      <h1 className="text-lg font-medium">{v.name}</h1>
      <div className="flex flex-row my-5 items-start gap-6">
        <Image
          src={v.picture}
          alt={v.name}
          width={600}
          height={400}
          className="rounded-lg w-[30%] object-cover"
        />
        <div className="text-left">
          <div className="text-md mb-2">{v.address}</div>
          <div className="text-sm">Province: {v.province}</div>
          <div className="text-sm">Postal Code: {v.postalcode}</div>
          <div className="text-sm">Daily Rate: {v.dailyrate}</div>
          <div className="text-sm">Tel: {v.tel}</div>
        </div>
      </div>
    </main>
  );
}
