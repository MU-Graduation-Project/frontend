import { IoStarSharp } from "react-icons/io5";
const Statistics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      <div className="flex flex-col gap-2 p-5 text-center  md:border-e  border-lightbrown">
        <span className="font-bold text-3xl text-secondary ">+500</span>
        <span className=" text-lightbrown">Events hosted</span>
      </div>
      <div className="flex flex-col gap-2 p-5 text-center  lg:border-e  border-lightbrown">
        <span className="font-bold text-3xl text-secondary ">+200</span>
        <span className=" text-lightbrown">Service providers</span>
      </div>
      <div className="flex flex-col gap-2 p-5 text-center  md:border-e  border-lightbrown">
        <span className="font-bold text-3xl text-secondary ">+10k</span>
        <span className=" text-lightbrown">Happy attendees</span>
      </div>
      <div className="flex flex-col gap-2 p-5 text-center ">
        <p className="font-bold text-3xl text-secondary flex gap-1 justify-center">
          <IoStarSharp className="text-[#E3AE00]" />
          4.8
        </p>
        <span className=" text-lightbrown">Average rating</span>
      </div>
    </div>
  );
};

export default Statistics;
