import Navbar from "../../components/common/Navbar";
import { Link } from "react-router-dom";

const UserProfile = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-secondary mb-4">User Profile</h1>
        <div className="space-y-3">
          <div>
            <Link
              to="/user/change-password"
              className="text-primary hover:underline font-medium text-sm block"
            >
              → Change Password
            </Link>
          </div>
          <div>
            <Link
              to="/user/become-partner"
              className="text-primary hover:underline font-medium text-sm block"
            >
              → Become a Service Provider (Onboarding)
            </Link>
          </div>
          <div>
            <Link
              to="/user/partner-pending"
              className="text-primary hover:underline font-medium text-sm block"
            >
              → Service Provider Application Status
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
