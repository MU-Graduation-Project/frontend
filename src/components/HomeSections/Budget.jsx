import { FaCheck } from "react-icons/fa6";
import { BsStars } from "react-icons/bs";
import { Reveal } from "react-awesome-reveal";
import budget from "../../Images/budget.png"
const Budget = () => {
  return (
    <div className="flex lg:justify-between lg:flex-row flex-col lg:items-center py-20">
      <div className="flex flex-col flex-1">
        <p className="text-lightorange my-2">Meet your AI event planner</p>
        <h2 className="font-bold text-5xl text-secondary">
          Enter your budget.
        </h2>
        <h2 className="font-semibold my-2 text-5xl text-lightorange font-slant italic">
          Let AI plan the rest.
        </h2>
        <p className="text-lightbrown mt-2 mb-5">
          Skip weeks of searching and comparing. Our AI creates a complete,
          bookable plan tailored to your vision and budget in minutes.
        </p>
        <p className="flex gap-2 items-center my-2">
          <FaCheck className="bg-lightorange p-1 text-secondary rounded-full text-xl" />
          <span className="font-semibold text-secondary">
            Venue, food and photography matched to your budget
          </span>
        </p>
        <p className="flex gap-2 items-center my-2">
          <FaCheck className="bg-lightorange p-1 text-secondary rounded-full text-xl" />
          <span className="font-semibold text-secondary">
            Meetings with your top providers scheduled for you
          </span>
        </p>
        <p className="flex gap-2 items-center my-2">
          <FaCheck className="bg-lightorange p-1 text-secondary rounded-full text-xl" />
          <span className="font-semibold text-secondary">
            You review and approve every decision
          </span>
        </p>
        <button className="bg-primary text-background p-2  rounded-3xl flex gap-1 items-center w-[140px] my-4">
          <span> Try AI Planner </span>
          <BsStars className="shrink-0" />
        </button>
      </div>
      <div className="flex-1">
        {/* <img src={budget} alt="budgetphoto" className="w-full" /> */}
        <Reveal
          keyframes={[
            {
              opacity: 0,
              transform: "translateX(200px) rotate(12deg)",
              easing: "ease-out"
            },
            {
              opacity: 1,
              transform: "translateX(0px) rotate(0deg)"
            }
          ]}
          duration={1400}
        >
          <div className="w-full rotate-[5deg]">
            <img src={budget} alt="budgetphoto" className="w-full" />
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Budget;
