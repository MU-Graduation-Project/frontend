import { RiDoubleQuotesL } from "react-icons/ri";
import { Reveal} from "react-awesome-reveal";
const Testimonials = () => {
  return (
    <div className="p-10">
      <h2 className="text-[#26160F] text-4xl font-bold">
        What people say about us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
        <Reveal from="bottom" delay={0} duration={800} triggerOnce>
          <div className="bg-[#F8F2EE] p-5 rounded-xl border-1 border-[#DCC4B5]">
            <div className="flex justify-between">
              <span className="text-lightbrown">★★★★★</span>
              <span>
                <RiDoubleQuotesL className="text-[#FBD3B0] text-3xl" />
              </span>
            </div>
            <div className="font-slant italic text-xl text-[#7E5137] my-5">
              “The AI planner saved me days of research. Every provider felt
              handpicked, and the whole evening came in under budget.”
            </div>
            <div className="flex gap-2">
              <span className="bg-[#FFE2D0] rounded-full p-3 text-secondary">
                MR
              </span>
              <div className="flex flex-col">
                <p className="text-secondary font-[700]">Maya Rodriguez</p>
                <p className="text-lightbrown">Organizer</p>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal from="bottom" delay={850} duration={800} triggerOnce>
          <div className="bg-[#F8F2EE] p-5 rounded-xl border-1 border-[#DCC4B5]">
            <div className="flex justify-between">
              <span className="text-lightbrown">★★★★★</span>
              <span>
                <RiDoubleQuotesL className="text-[#FBD3B0] text-3xl" />
              </span>
            </div>
            <div className="font-slant italic text-xl text-[#7E5137] my-5">
              “I’ve discovered so many thoughtful local events here. Booking
              takes seconds and I always know exactly what to expect.”
            </div>
            <div className="flex gap-2">
              <span className="bg-[#FFE2D0] rounded-full p-3 text-secondary">
                DK
              </span>
              <div className="flex flex-col">
                <p className="text-secondary font-[700]">Daniel Kim</p>
                <p className="text-lightbrown">Attendee</p>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal from="bottom" delay={1650} duration={800} triggerOnce>
          <div className="bg-[#F8F2EE] p-5 rounded-xl border-1 border-[#DCC4B5]">
            <div className="flex justify-between">
              <span className="text-lightbrown">★★★★★</span>
              <span>
                <RiDoubleQuotesL className="text-[#FBD3B0] text-3xl" />
              </span>
            </div>
            <div className="font-slant italic text-xl text-[#7E5137] my-5">
              “The leads are genuinely relevant. I booked four amazing
              celebrations in my first month without spending anything on ads.”
            </div>
            <div className="flex gap-2">
              <span className="bg-[#FFE2D0] rounded-full p-3 text-secondary">
                EW
              </span>
              <div className="flex flex-col">
                <p className="text-secondary font-[700]">Elena Walsh</p>
                <p className="text-lightbrown">Photographer</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
};

export default Testimonials;
