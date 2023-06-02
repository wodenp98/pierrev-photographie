import Image from "next/image";
// import PhotoPierre from "/photo-pierre.jpg";

export default function PhotographComponent() {
  return (
    <section className="bg-lightBlue h-[800px]">
      <h1>Le photographe</h1>

      <div className="bg-white rounded-t-lg">
        <div className="relative w-28 h-28">
          <Image
            className="rounded-full"
            src="/photo-pierre.jpg"
            alt="Photo Pierre"
            fill={true}
            object-fit="cover"
          />
        </div>
      </div>
    </section>
  );
}
