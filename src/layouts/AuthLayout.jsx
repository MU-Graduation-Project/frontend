
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center  bg-[#f8f2ee] w-full relative p-10">
      <div className="absolute bg-[#FFA46D4D] rounded-full h-[414px] w-[414px] -top-40 -right-60 z-0 "></div>
      <div className="absolute bg-[#FFA46D4D] rounded-full h-[414px] w-[414px] -bottom-20 -left-40 z-0 "></div>
      <div className="absolute bg-[#FFA46D4D] rounded-full h-[164px] w-[164px] bottom-75 -left-20 z-0"></div>
      <div className="bg-[#FFFFFF] py-5 px-5 md:px-10 rounded-2xl z-1">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;

