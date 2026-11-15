import { BsBalloon } from "react-icons/bs";
import { FaCameraRetro } from "react-icons/fa";
import halls from "../../Images/halls.png"
import barista from "../../Images/barista.png";
import entertainment from "../../Images/entertainment.png";
import catering from "../../Images/catering.png"
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
const Business = () => {
    return (
      <div className="flex gap-1 p-10">
        <div className="p-5 hidden lg:flex flex-col gap-10 lg:flex-1">
          <p className="flex items-center gap-2 bg-[#F8D0DC] py-2 px-4 justify-center border-s-2 border-s-[#A84260] bs w-[150px]">
            <BsBalloon className="text-[#A84260] text-xl" />
            <span className="text-[#A84260] font-[600]">Decoration</span>
          </p>
          <p className="flex items-center gap-2 bg-[#e0e8d9] py-2 px-4 justify-center border-s-2 border-s-[#527A4B] bs w-[150px] -translate-x-8">
            <FaCameraRetro className="text-[#527A4B] rotate-[5deg]  text-xl" />
            <span className="text-[#527A4B] font-[600]">Photography</span>
          </p>
          <p className="flex items-center gap-2 bg-[#FFE2D0] py-2 px-4 justify-center border-s-2 border-s-[#A84260] bs w-[150px]">
            <img src={halls} alt="hallsphoto" className="w-[30px] h-[25px]" />
            <span className="text-[#963A00] font-[600]">Halls</span>
          </p>
        </div>
        <div className="flex flex-col lg:flex-2 flex-1 text-center gap-5 items-center justify-center align-center">
          <h1 className="text-#3B3029 text-4xl font-[700]">
            Grow your business with Us
          </h1>
          <p className="text-secondary font-[700]">
            Get discovered, attract clients, and grow your bookings.
          </p>
          <button className="flex gap-3 items-center bg-[#3B3029] text-[#FFFCFA] p-2 px-4 rounded-4xl w-[225px]">
            Become a provider
            <MdOutlineKeyboardArrowRight className="text-4xl text-[#FFFCFA]" />
          </button>
        </div>
        <div className="p-5 hidden lg:flex lg:flex-col gap-10 items-end lg:flex-1">
          <p className="flex items-center gap-2 bg-[#FDD8D5] py-2 px-4 justify-center border-s-2 border-s-[#A82018] bs w-[150px]">
            <img
              src={catering}
              alt="hallsphoto"
              className="w-[30px] h-[25px]"
            />

            <span className="text-[#A82018] font-[600]">Catering</span>
          </p>
          <p className="flex items-center gap-2 bg-[#EBE5FF] py-2 px-4 justify-center border-s-2 border-s-[#7554C8] bs w-[150px] translate-x-8">
            <img
              src={entertainment}
              alt="hallsphoto"
              className="w-[30px] h-[25px]"
            />

            <span className="text-[#7554C8] font-[600]">Entertainment</span>
          </p>
          <p className="flex items-center gap-2 bg-[#EDE0D7] py-2 px-4 justify-center border-s-2 border-s-[#4A2C1A] bs w-[150px]">
            <img src={barista} alt="hallsphoto" className="w-[30px] h-[25px]" />

            <span className="text-[#4A2C1A] font-[600]">Barista</span>
          </p>
        </div>
      </div>
    );
};

export default Business;
