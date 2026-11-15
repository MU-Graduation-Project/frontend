import Event1 from "../../Images/event1.jpg";
import Event2 from "../../Images/event2.jpg";
import Event3 from "../../Images/event3.png";
import Event4 from "../../Images/event4.png";
import Event5 from "../../Images/event5.jpg";
import Event6 from "../../Images/event6.png";
const NextExperience = () => {
  return (
    <div>
      <h2 className="text-secondary font-bold text-3xl my-3">
        Find Your Next Experience
      </h2>
      <p className="font-semibold text-[#D05400] my-3">
        Discover events that match your interests
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="rounded-xl relative h-[300px] overflow-hidden group  ">
          <div className="absolute top-0 left-0 bg-black/20 w-full h-full rounded-xl inset-0 z-10"></div>
          <img
            className="w-full rounded-xl h-full transition-transform duration-500 group-hover:scale-110 "
            src={Event1}
          />
          <span className="text-[#FFFFFF] absolute left-5 bottom-5 text-3xl font-semibold ">
            Business events
          </span>
        </div>
        <div className="rounded-xl relative  h-[300px] overflow-hidden group">
          <div className="absolute top-0 left-0 bg-black/20 w-full h-full rounded-xl inset-0 z-10"></div>

          <img className="w-full rounded-xl h-full transition-transform duration-500 group-hover:scale-110" src={Event2} />
          <span className="text-[#FFFFFF] absolute left-5 bottom-5 text-3xl font-semibold ">
            Technical events
          </span>
        </div>
        <div className="rounded-xl relative  h-[300px] overflow-hidden group">
          <div className="absolute top-0 left-0 bg-black/20 w-full h-full rounded-xl inset-0 z-10"></div>

          <img className="w-full rounded-xl h-full transition-transform duration-500 group-hover:scale-110" src={Event3} />
          <span className="text-[#FFFFFF] absolute left-5 bottom-5 text-3xl font-semibold ">
            Art & Culture
          </span>
        </div>
        <div className="rounded-xl relative  h-[300px] overflow-hidden group">
          <div className="absolute top-0 left-0 bg-black/20 w-full h-full rounded-xl inset-0 z-10"></div>

          <img className="w-full rounded-xl h-full transition-transform duration-500 group-hover:scale-110" src={Event4} />
          <span className="text-[#FFFFFF] absolute left-5 bottom-5 text-3xl font-semibold ">
            Social gathering
          </span>
        </div>
        <div className="rounded-xl relative  h-[300px] overflow-hidden group">
          <div className="absolute top-0 left-0 bg-black/20 w-full h-full rounded-xl inset-0 z-10"></div>

          <img className="w-full rounded-xl h-full transition-transform duration-500 group-hover:scale-110" src={Event5} />
          <span className="text-[#FFFFFF] absolute left-5 bottom-5 text-3xl font-semibold ">
            Parties
          </span>
        </div>
        <div className="rounded-xl relative  h-[300px] overflow-hidden group">
          <div className="absolute top-0 left-0 bg-black/20 w-full h-full rounded-xl inset-0 z-10"></div>

          <img className="w-full rounded-xl h-full transition-transform duration-500 group-hover:scale-110" src={Event6} />
          <span className="text-[#FFFFFF] absolute left-5 bottom-5 text-3xl font-semibold ">
            Sports & Fitness
          </span>
        </div>
      </div>
    </div>
  );
};

export default NextExperience;
