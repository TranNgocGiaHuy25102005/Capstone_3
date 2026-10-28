import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../../zustand/authStore.js";

export default function CustomerLayout() {
  const { userInfor, isCheckingAuth, logout } = useAuth();
  if (isCheckingAuth) {
    console.log("Is checking Authorize");
  } else {
    if (!userInfor) {
      return <Navigate to="/login"></Navigate>;
    }
    return (
      <div className="">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </div>
    );
  }
}
