import Banner from "./components/Banner";
import Discounted from "./components/Discounted";
import ForYou from "./components/ForYou";
import TopRated from "./components/TopRated";

const Home = () => {
  return (
    <div className="pt-5 flex flex-col gap-5">
      <Banner />
      <ForYou />
      <Discounted />
      <TopRated />
    </div>
  );
};

export default Home;
