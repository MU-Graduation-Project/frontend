import Navbar from "../../components/common/Navbar"
import { useGetEventsRecommndationsQuery } from "../../store/userApi";
import { useNavigate } from "react-router-dom";
const Recommendations = () => {
    const { data: recommendations, isLoading } = useGetEventsRecommndationsQuery();
    const navigate = useNavigate();  
  if (isLoading) return <p>Loading...</p>;
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-3 xl:px-12">
        <h1>Recommnedations</h1>
        <div className="flex gap-5 my-5">
          {recommendations?.events?.map((rec) => (
            <div className="w-[300px] h-[200px] border-1 border-primary p-2 rounded-xl" key={rec.id}>
              <h3>{rec.title}</h3>
              <p>By:{rec.owner.organizationName}</p>
              <button
                onClick={() => navigate(`/user/event-details/${rec.id}`)}
                className="text-background bg-primary p-2 rounded-3xl"
              >
                See more Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Recommendations
