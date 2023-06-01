// "use client";

// import { useGetCarouselItemsQuery } from "../../lib/redux/services/carouselApi";
// import Image from "next/image";

export default function Home() {
  // const { data, isLoading, isError } = useGetCarouselItemsQuery();
  // console.log(data);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error fetching boutique items.</div>;
  // }

  return (
    <main>
      {/* {data?.map((item: any) => (
        <div key={item.id}>
          <h1>{item.nom}</h1>
          <Image src={item.imageUrl} alt={item.nom} width={200} height={200} />
        </div>
      ))} */}
    </main>
  );
}
