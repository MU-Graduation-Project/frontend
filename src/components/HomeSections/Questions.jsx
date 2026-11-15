import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
const Questions = () => {
      const [activeIndex, setActiveIndex] = useState(1);

      const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
      };

      const answer =
        "We review business information, portfolios, references and customer feedback before a provider can receive bookings.";

  return (
    <div className=" flex lg:flex-row flex-col gap-2 p-6">
      <div className="flex flex-col gap-4 flex-1 lg:items-start items-center lg:text-start text-center">
        <p className="text-primary">Need to know</p>
        <h1 className="text-secondary font-bold text-4xl ">
          Frequently asked questions
        </h1>
        <p className="text-lightbrown">
          Can't find what you're looking for? Our friendly support team is here
          to help.
        </p>
        <button className="py-1 px-2 border-1 border-secondary text-secondary w-[150px] rounded-2xl my-2 font-[500]">
          Contact Support
        </button>
      </div>
      <div className="lg:flex-2 flex-1">
        <div className="border-b border-[#a58f82]">
          <button
            onClick={() => toggleFAQ(0)}
            className="flex w-full items-center justify-between py-6 text-left"
          >
            <span className="text-lg font-semibold text-[#503322]">
              How does booking work?
            </span>

            <IoIosArrowDown
              className={`h-6 w-6 text-[#503322] transition-transform duration-300 ${
                activeIndex === 0 ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`grid transition-all duration-300 ease-in-out ${
              activeIndex === 0
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="pb-8 text-base leading-relaxed text-[#87543c]">
                {answer}
              </p>
            </div>
          </div>
        </div>

     
        <div className="border-b border-[#a58f82]">
          <button
            onClick={() => toggleFAQ(1)}
            className="flex w-full items-center justify-between py-6 text-left"
          >
            <span className="text-lg font-semibold text-[#503322]">
              How are providers verified?
            </span>

            <IoIosArrowDown
              className={`h-6 w-6 text-[#503322] transition-transform duration-300 ${
                activeIndex === 1 ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`grid transition-all duration-300 ease-in-out ${
              activeIndex === 1
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="pb-8 text-base leading-relaxed text-[#87543c]">
                {answer}
              </p>
            </div>
          </div>
        </div>

   
        <div className="border-b border-[#a58f82]">
          <button
            onClick={() => toggleFAQ(2)}
            className="flex w-full items-center justify-between py-6 text-left"
          >
            <span className="text-lg font-semibold text-[#503322]">
              Is payment secure?
            </span>

            <IoIosArrowDown
              className={`h-6 w-6 text-[#503322] transition-transform duration-300 ${
                activeIndex === 2 ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`grid transition-all duration-300 ease-in-out ${
              activeIndex === 2
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="pb-8 text-base leading-relaxed text-[#87543c]">
                {answer}
              </p>
            </div>
          </div>
        </div>

      
        <div className="border-b border-[#a58f82]">
          <button
            onClick={() => toggleFAQ(3)}
            className="flex w-full items-center justify-between py-6 text-left"
          >
            <span className="text-lg font-semibold text-[#503322]">
              How does the AI planner work?
            </span>

            <IoIosArrowDown
              className={`h-6 w-6 text-[#503322] transition-transform duration-300 ${
                activeIndex === 3 ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`grid transition-all duration-300 ease-in-out ${
              activeIndex === 3
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="pb-8 text-base leading-relaxed text-[#87543c]">
                {answer}
              </p>
            </div>
          </div>
        </div>

        <div className="border-b border-[#a58f82]">
          <button
            onClick={() => toggleFAQ(4)}
            className="flex w-full items-center justify-between py-6 text-left"
          >
            <span className="text-lg font-semibold text-[#503322]">
              What if a provider cancels?
            </span>

            <IoIosArrowDown
              className={`h-6 w-6 text-[#503322] transition-transform duration-300 ${
                activeIndex === 4 ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`grid transition-all duration-300 ease-in-out ${
              activeIndex === 4
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="pb-8 text-base leading-relaxed text-[#87543c]">
                {answer}
              </p>
            </div>
          </div>
        </div>

       
        <div className="border-b border-[#a58f82]">
          <button
            onClick={() => toggleFAQ(5)}
            className="flex w-full items-center justify-between py-6 text-left"
          >
            <span className="text-lg font-semibold text-[#503322]">
              Can I join as both an attendee and a provider?
            </span>

            <IoIosArrowDown
              className={`h-6 w-6 text-[#503322] transition-transform duration-300 ${
                activeIndex === 5 ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`grid transition-all duration-300 ease-in-out ${
              activeIndex === 5
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <p className="pb-8 text-base leading-relaxed text-[#87543c]">
                {answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
