import { useState } from "react";
import time1 from "../../Images/time1.png"
import time2 from "../../Images/time2.png";
import time3 from "../../Images/time3.png";
import time4 from "../../Images/time4.png";
import time5 from "../../Images/time5.png";
import time6 from "../../Images/time6.png";
import { Reveal} from "react-awesome-reveal";
const GoodTimes = () => {
    const [tab1, setTab1] = useState(true);
      const [tab2, setTab2] = useState(false);
    return (
      <div className="bg-[#FCF4EF] p-5">
        <h2 className="font-bold text-4xl text-center text-secondary">
          Good Times Start Here
        </h2>
        <p className="text-lightbrown text-center my-3">
          Your world of exciting experiences, new connections, and unforgettable
          moments.
        </p>
        <div className="flex justify-center">
          <div className="bg-[#FFFCFA] text-secondary w-[350px] flex gap-5 p-2  justify-center rounded-4xl my-3 shadow-xl">
            <button
              className={`bg-secondary text-[#FFFCFA] py-2 px-3 rounded-4xl transition-all duration-300 ${
                tab1
                  ? "bg-secondary text-[#FFFCFA]"
                  : "bg-transparent text-secondary"
              }`}
              onClick={() => {
                (setTab1(true), setTab2(false));
              }}
            >
              I want to organize
            </button>
            <button
              className={`font-semibold py-1 px-3 rounded-4xl transition-all duration-300 ${
                tab2
                  ? "bg-secondary text-[#FFFCFA]"
                  : "bg-transparent text-secondary"
              }`}
              onClick={() => {
                (setTab2(true), setTab1(false));
              }}
            >
              I want to attend
            </button>
          </div>
        </div>

        {tab1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-5">
            <div className="flex flex-col gap-3 text-center items-center">
              <Reveal from="bottom" delay={0} duration={800} triggerOnce>
                <img src={time1} alt="photo1" className="w-[360px] h-[200px]" />
              </Reveal>

              <Reveal from="bottom" delay={900} duration={700} triggerOnce>
                <div className="flex flex-col gap-3 items-center">
                  <h3 className="text-secondary font-semibold text-2xl">
                    Describe Your Event
                  </h3>
                  <p className="text-lightbrown w-[250px]">
                    Tell us about your event, your vision, and your budget.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col gap-3 text-center items-center">
              <Reveal from="bottom" delay={1800} duration={800} triggerOnce>
                <img src={time2} alt="photo2" className="w-[360px] h-[200px]" />
              </Reveal>

              <Reveal from="bottom" delay={2700} duration={700} triggerOnce>
                <div className="flex flex-col gap-3 items-center">
                  <h3 className="text-secondary font-semibold text-2xl">
                    Get Matched with Providers
                  </h3>
                  <p className="text-lightbrown w-[270px]">
                    We’ll suggest the best service providers based on your needs
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col gap-3 text-center items-center">
              <Reveal from="bottom" delay={3600} duration={800} triggerOnce>
                <img src={time3} alt="photo3" className="w-[360px] h-[200px]" />
              </Reveal>

              <Reveal from="bottom" delay={4500} duration={700} triggerOnce>
                <div className="flex flex-col gap-3 items-center">
                  <h3 className="text-secondary font-semibold text-2xl">
                    Confirm & Enjoy
                  </h3>
                  <p className="text-lightbrown w-[270px]">
                    Everything is in place. Get ready to make your event
                    unforgettable!
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        )}
        {tab2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 my-5">
            <div className="flex flex-col gap-3 text-center items-center">
              <Reveal from="bottom" delay={0} duration={800} triggerOnce>
                <img src={time4} alt="photo1" className="w-[360px] h-[200px]" />
              </Reveal>

              <Reveal from="bottom" delay={900} duration={700} triggerOnce>
                <div className="flex flex-col gap-3 items-center">
                  <h3 className="text-secondary font-semibold text-2xl">
                    Discover events
                  </h3>
                  <p className="text-lightbrown w-[250px]">
                    Find experiences curated around your interests
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col gap-3 text-center items-center">
              <Reveal from="bottom" delay={1800} duration={800} triggerOnce>
                <img src={time5} alt="photo2" className="w-[360px] h-[200px]" />
              </Reveal>

              <Reveal from="bottom" delay={2700} duration={700} triggerOnce>
                <div className="flex flex-col gap-3 items-center">
                  <h3 className="text-secondary font-semibold text-2xl">
                    Book Your ticket
                  </h3>
                  <p className="text-lightbrown w-[270px]">
                    Reserve your spot in just a few taps
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="flex flex-col gap-3 text-center items-center">
              <Reveal from="bottom" delay={3600} duration={800} triggerOnce>
                <img src={time6} alt="photo3" className="w-[360px] h-[200px]" />
              </Reveal>

              <Reveal from="bottom" delay={4500} duration={700} triggerOnce>
                <div className="flex flex-col gap-3 items-center">
                  <h3 className="text-secondary font-semibold text-2xl">
                    Enjoy the event
                  </h3>
                  <p className="text-lightbrown w-[270px]">
                    Show your ticket and experience the moment
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        )}
      </div>
    );
}

export default GoodTimes
