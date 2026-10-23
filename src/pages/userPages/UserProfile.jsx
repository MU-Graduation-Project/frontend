import Navbar from "../../components/common/Navbar"
import { Link } from "react-router-dom"
const UserProfile = () => {
  return (
      <div>
          <Navbar/>
      User Profile
      <br />
      <Link to="/user/change-password">Change password</Link>
    </div>
  )
}

export default UserProfile
