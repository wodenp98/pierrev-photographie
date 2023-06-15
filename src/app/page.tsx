import Carousel from "../../components/Carousel/Carousel";
import PhotographComponent from "../../components/Photograph/PhotographComponent";

export default function Home() {
  return (
    <main className="container flex-grow">
      <Carousel />
      <PhotographComponent />
    </main>
  );
}
