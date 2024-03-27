import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAppSelector((state) => state.auth);
  console.log(user)
  if (!user) {
    return <Navigate to="/home" />;
  }
  return children;
};

export default ProtectedRoute;
