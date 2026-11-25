import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/common/Navbar";
import { useGetMyServiceProviderProfileQuery } from "../../store/serviceProviderApi";
import { useLazyCheckAuthQuery } from "../../store/authApi";
import { setCredentials } from "../../store/authSlice";

const PartnerStatus = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const hasRefreshed = useRef(false);

  const {
    data: profile,
    isLoading,
    isError,
    refetch,
  } = useGetMyServiceProviderProfileQuery();

  const [triggerCheckAuth] = useLazyCheckAuthQuery();

  // If approved and user roles do not yet include SERVICE_PROVIDER, refresh token once
  useEffect(() => {
    if (
      profile?.status === "APPROVED" &&
      !user?.roles?.includes("SERVICE_PROVIDER") &&
      !hasRefreshed.current
    ) {
      hasRefreshed.current = true;
      triggerCheckAuth()
        .unwrap()
        .then((res) => {
          if (res?.user && res?.tokens?.accessToken) {
            dispatch(
              setCredentials({
                user: res.user,
                accessToken: res.tokens.accessToken,
                refreshToken: res.tokens.refreshToken,
              })
            );
          }
        })
        .catch(() => {
          // Token refresh failure will be handled on next explicit action/navigation
        });
    }
  }, [profile?.status, user?.roles, triggerCheckAuth, dispatch]);

  return (
    <div>
      <Navbar />

      <main className="max-w-2xl mx-auto my-8 p-6 border rounded-lg bg-white">
        <h1 className="text-2xl font-bold mb-4">
          Service Provider Application Status
        </h1>

        {isLoading && <p>Loading application status...</p>}

        {!isLoading && (isError || !profile) && (
          <div>
            <p className="mb-4">No active service provider application found.</p>
            <Link
              to="/user/become-partner"
              className="inline-block bg-primary text-white px-4 py-2 rounded"
            >
              Start Onboarding Application
            </Link>
          </div>
        )}

        {!isLoading && profile && (
          <div className="space-y-4">
            <div>
              <span className="font-semibold">Status: </span>
              <span
                className={`font-bold ${
                  profile.status === "APPROVED"
                    ? "text-green-600"
                    : profile.status === "REJECTED"
                    ? "text-red-600"
                    : "text-amber-600"
                }`}
              >
                {profile.status}
              </span>
            </div>

            {/* PENDING State */}
            {profile.status === "PENDING" && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded text-sm space-y-2">
                <p>
                  Your application for <strong>{profile.businessName}</strong> is
                  currently pending review by an administrator.
                </p>
                <p className="text-gray-600">
                  While your application is pending, you cannot access provider-only
                  features. Please check back later.
                </p>
                <button
                  type="button"
                  onClick={() => refetch()}
                  className="border border-gray-400 px-3 py-1 rounded text-xs hover:bg-gray-100"
                >
                  Refresh Status
                </button>
              </div>
            )}

            {/* REJECTED State */}
            {profile.status === "REJECTED" && (
              <div className="p-3 bg-red-50 border border-red-200 rounded text-sm space-y-2">
                <p className="font-semibold text-red-700">
                  Your application was rejected.
                </p>
                {profile.rejectionReason && (
                  <p>
                    <span className="font-medium">Rejection Reason: </span>
                    {profile.rejectionReason}
                  </p>
                )}
                <p className="text-xs text-gray-500">
                  Note: Applications cannot be resubmitted once rejected. Please contact
                  support if you believe this was an error.
                </p>
              </div>
            )}

            {/* APPROVED State */}
            {profile.status === "APPROVED" && (
              <div className="p-3 bg-green-50 border border-green-200 rounded text-sm space-y-3">
                <p className="text-green-800 font-semibold">
                  Congratulations! Your application has been approved.
                </p>
                <p>
                  You now have Service Provider access on EventFlow.
                </p>
                <div>
                  <Link
                    to="/partner/profile"
                    className="inline-block bg-primary text-white px-4 py-2 rounded text-sm font-medium"
                  >
                    Go to Service Provider Profile
                  </Link>
                </div>
              </div>
            )}

            {/* Application Overview */}
            <section className="border-t pt-4 text-sm space-y-2">
              <h2 className="font-semibold text-base mb-2">Application Details</h2>
              <p>
                <span className="font-medium">Business Name: </span>
                {profile.businessName}
              </p>
              <p>
                <span className="font-medium">Category: </span>
                {profile.category?.name || "N/A"}
              </p>
              <p>
                <span className="font-medium">Phone: </span>
                {profile.phone}
              </p>
              <p>
                <span className="font-medium">City: </span>
                {profile.city}
              </p>
              {profile.areasServed?.length > 0 && (
                <p>
                  <span className="font-medium">Areas Served: </span>
                  {profile.areasServed.join(", ")}
                </p>
              )}
              {profile.eventTypesServed?.length > 0 && (
                <p>
                  <span className="font-medium">Event Types: </span>
                  {profile.eventTypesServed.map((et) => et.name).join(", ")}
                </p>
              )}
              {profile.description && (
                <p>
                  <span className="font-medium">Description: </span>
                  {profile.description}
                </p>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  );
};

export default PartnerStatus;
