
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="container px-6">
      <Outlet />
    </div>
  );
}

export default MainLayout;

