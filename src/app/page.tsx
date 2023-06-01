// import { useGetBoutiqueItemsQuery } from "../../lib/redux/services/shopApi";
// import Image from "next/image";

export default function Home() {
  //   const { data, isLoading, isError } = useGetBoutiqueItemsQuery();

  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }

  //   if (isError) {
  //     return <div>Error fetching boutique items.</div>;
  //   }

  return (
    <main>
      {/* {data?.map((item: any) => (
        <div key={item.id}>
          <h2>{item.nom}</h2>
          <p>{item.description}</p>
          <Image src={item.imageUrl} alt={item.nom} width={200} height={200} />
        </div>
      ))} */}
    </main>
  );
}
