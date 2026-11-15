import { BsStars } from "react-icons/bs";
import main from "../../Images/main.png"
import person1 from "../../Images/person1.jpg"
import person2 from "../../Images/person2.jpg";
import person3 from "../../Images/person3.jpg";
import { FaCheck } from "react-icons/fa6";
import { CiCalendar } from "react-icons/ci";
import { Reveal } from "react-awesome-reveal";
const Hero = () => {
    return (
      <div className="flex flex-col lg:flex-row my-10 justify-between lg:items-center lg:justify-center">
        <div className="flex flex-col lg:text-left text-center lg:w-1/2 items-center lg:items-start  lg:justify-center lg:align-center h-full lg:p-0 p-5">
          <p className="flex items-center justify-center lg:justify-start gap-2 text-secondary font-[700] flex-wrap">
            <BsStars className="shrink-0" />
            <span>Your whole event, thoughtfully planned</span>
          </p>
          <h1 className="xl:text-7xl text-4xl md:text-5xl font-extrabold text-secondary w-64 md:w-96 my-5 md:leading-13 xl:leading-[70px]">
            Plan unforgettable events,
            <span className="text-lightorange italic font-semibold">
              without the hassle
            </span>
          </h1>
          <p className="text-secondary font-[400] text-md w-96 md:p-0 p-5">
            Discover extraordinary experiences or bring your own to life—with
            trusted local providers and an AI planner that makes every budget
            work harder.
          </p>
          <div className="flex gap-3 my-5">
            <button className="bg-primary text-background p-2 rounded-3xl ">
              Organize an event
            </button>
            <button className="border-1 border-secondary text-secondary p-2 rounded-3xl">
              Explore Event
            </button>
          </div>
          <div className="flex gap-20">
            <div className="flex relative">
              <img
                src={person1}
                alt="person1img"
                className="w-[50px] h-[50px] rounded-full border-4 border-background"
              />
              <img
                src={person2}
                alt="person1img"
                className="w-[50px] h-[50px] rounded-full border-4 border-background absolute left-8"
              />
              <img
                src={person3}
                alt="person1img"
                className="w-[50px] h-[50px] rounded-full border-4 border-background absolute left-16"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-secondary font-semibold">Loved by +10,000</p>
              <p className="text-[#7E5137]">people everywhere</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 flex justify-center relative">
          {/* Venue Booked */}
          <div className="absolute z-10 -top-5 -right-8">
            <Reveal from="right" triggerOnce delay={0}>
              <div className="flex items-center gap-2 text-secondary bg-[#FFFAF5] px-5 py-3 rounded-2xl shadow-sm rotate-[4deg] whitespace-nowrap">
                <FaCheck />
                Venue booked
              </div>
            </Reveal>
          </div>

          {/* Save the Date */}
          <div className="absolute z-10 -bottom-4 -left-8">
            <Reveal from="left" triggerOnce delay={0}>
              <div className="flex items-center gap-2 text-secondary bg-[#FFFAF5] px-5 py-3 rounded-2xl shadow-sm rotate-[-4deg] whitespace-nowrap">
                <CiCalendar />
                Save the date
              </div>
            </Reveal>
          </div>

          <img
            src={main}
            alt="MainImg"
            className="w-[520px] h-[540px]  rounded-tl-[200px] rounded-br-[200px]"
          />
        </div>
    
      </div>
    );
};

export default Hero;
