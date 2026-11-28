import Navbar from "../../components/common/Navbar";
import { useParams } from "react-router-dom";
import { useGetEventDetailsQuery } from "../../store/userApi";

const EventDetails = () => {
  const { id } = useParams();
console.log(id)
  const { data, isLoading, error } = useGetEventDetailsQuery(id);

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Something went wrong!</p>;


  if (!data) return <p>Event not found</p>;

  return (
    <div>
      <Navbar />

      <div className="container mx-auto px-3 xl:px-12 py-5">
        <h1 className="text-3xl font-bold">{data.title}</h1>

        <p>{data.description}</p>

        <div className="my-5">
          <p>Organizer: {data.owner?.organizationName}</p>

          <p>City: {data.city}</p>

          <p>Location: {data.location}</p>

          <p>Event Type: {data.type?.name}</p>

          <p>Start Date: {new Date(data.startDateTime).toLocaleString()}</p>

          <p>End Date: {new Date(data.endDateTime).toLocaleString()}</p>

          <p>Status: {data.status}</p>
        </div>

  
      </div>
    </div>
  );
};

export default EventDetails;
