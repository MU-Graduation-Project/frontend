import Navbar from "../components/common/Navbar"
import Budget from "../components/HomeSections/Budget";
import Business from "../components/HomeSections/Business";
import GoodTimes from "../components/HomeSections/GoodTimes";
import Hero from "../components/HomeSections/Hero";
import NextExperience from "../components/HomeSections/NextExperience";
import Questions from "../components/HomeSections/Questions";
import Statistics from "../components/HomeSections/Statistics";
import TendingEvents from "../components/HomeSections/TendingEvents";
import Testimonials from "../components/HomeSections/Testimonials";
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className=" container mx-auto px-3  xl:px-12">
        <Hero />
      </div>
      <div className="bg-[#D054000D] w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] my-8 py-6">
        <div className="container mx-auto px-3 xl:px-12">
          <Statistics />
        </div>
      </div>
      <div className=" container mx-auto px-3  xl:px-12">
        <NextExperience />
      </div>
      <div className="bg-[#D054000D] w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]  py-6">
        <div className="container mx-auto px-3 xl:px-12">
          <GoodTimes />
        </div>
      </div>
      <div className="bg-[#FFF3EB] w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]  py-6">
        <div className="container mx-auto px-3 xl:px-12">
          <Budget />
        </div>
      </div>
      <div className=" container mx-auto px-3  xl:px-12">
        <TendingEvents />
      </div>
      <div className="bg-[#FFF3EB] w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]  py-6">
        <div className="container mx-auto px-3 xl:px-12">
          <Business />
        </div>
      </div>
      <div className=" container mx-auto px-3  xl:px-12">
        <Testimonials />
      </div>
      <div className="bg-[#F8F2EE] w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw]  py-6">
        <div className="container mx-auto px-3 xl:px-12">
          <Questions />
        </div>
      </div>
    </div>
  );
}

export default Home
