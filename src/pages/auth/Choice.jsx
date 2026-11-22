import { NavLink } from "react-router-dom";
const Choice = () => {
  return (
    <div>
      <NavLink to="/auth/completeEventGoerProfile">
        Want to be an event goer?
      </NavLink>
      <br />
      <button>Want to be a service provider?</button>
    </div>
  );
}

export default Choice
