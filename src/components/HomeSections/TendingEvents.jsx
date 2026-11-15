import { useState, useEffect } from "react";

import trend1 from "../../Images/trend1.jpg";
import trend2 from "../../Images/trend2.jpg";
import trend3 from "../../Images/trend3.jpg";

const events = [
  {
    image: trend1,
    title: "AI & Future Tech Summit",
    date: "29.11.2026",
    attendees: "8,000 attendees",
    description:
      "A technology summit exploring the latest advancements in artificial intelligence, emerging technologies, and their impact on the future of various industries."
  },
  {
    image: trend2,
    title: "Kazem Al Saher Live Concert",
    date: "29.11.2026",
    attendees: "10,000 attendees",
    description:
      "A live concert featuring Kazem Al Saher, bringing together his most popular songs and a rich selection of Arabic music in an unforgettable musical experience."
  },
  {
    image: trend3,
    title: "Cairo Literature & Arts Festival",
    date: "30.2.2027",
    attendees: "12,000 attendees",
    description:
      "A cultural festival celebrating literature and the arts through book discussions, poetry readings, creative workshops, and artistic exhibitions."
  }
];

const TrendingEvents = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full py-12 overflow-hidden ">
      <div>
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-secondary">Trending Events</h2>
          <p className="text-lg text-lightbrown my-3">
            Discover the events everyone's talking about!
          </p>
        </div>
        <div className=" flex flex-col items-center w-full my-5">
          <div className="relative w-full h-[400px] sm:h-[420px] my-7">
            {events.map((event, index) => {
              const position = (index - active + 3) % 3;

              const isCenter = position === 0;
              const isRight = position === 1;

              const x = isCenter ? 0 : isRight ? 108 : -108;
              const scale = isCenter ? 1.15 : 0.9;

              return (
                <div
                  key={index}
                  onClick={() => setActive(index)}
                  className="absolute top-1/2 left-1/2
                 w-[85%] sm:w-[45%] lg:w-[31%]
h-[350px] sm:h-[400px] lg:h-[450px]
                  rounded-2xl overflow-hidden
                  shadow-xl cursor-pointer
                  transition-all duration-1000
                  ease-in-out"
                  style={{
                    transform: `
                    translate(-50%, -50%)
                    translateX(${x}%)
                    scale(${scale})
                  `,
                    zIndex: isCenter ? 10 : 5
                  }}
                >
                  <img
                    src={event.image}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  <div
                    className="absolute inset-0 bg-gradient-to-t
                  from-black/90 via-black/40 to-transparent"
                  />

                  <div className="absolute bottom-0 left-0 w-full p-2 sm:p-4 text-white">
                    <p className="text-[9px] sm:text-xs text-gray-200 mb-2">
                      {event.date} / {event.attendees}
                    </p>

                    <h3 className="font-bold text-xs sm:text-lg mb-2">
                      {event.title}
                    </h3>

                    <p
                      className="text-[9px] sm:text-xs text-gray-200
                    line-clamp-3 mb-3"
                    >
                      {event.description}
                    </p>

                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="bg-white text-black rounded-full
                      px-4 py-2 text-[9px] sm:text-xs
                      font-semibold hover:bg-orange-100
                      transition"
                    >
                      Book now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

         
          <div className="flex justify-center gap-2 mt-15">
            {events.map((_, index) => (
              <button
                key={index}
                onClick={() => setActive(index)}
                className={`h-2 rounded-full transition-all duration-300
                ${
                  active === index ? "w-6 bg-orange-600" : "w-2 bg-orange-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrendingEvents;
