import { useAppDispatch } from "../app/hooks";
import { setCredential, logout } from "../features/auth/authSlice";
import Cookies from "js-cookie";
import api from "../services/api";

const useRefreshToken = () => {
  const user = localStorage.getItem("user");
  const dispatch = useAppDispatch();
  const refresh = async () => {
    try {
      const { data } = await api.get("/auth/refresh", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      console.log("Refresh token is valid");
      data.user = user ? JSON.parse(user) : null,
      console.log(data)
      dispatch(setCredential(data));
      return data.access_token;
    } catch (err: unknown) {
      console.log("! Refresh token is not valid");
      dispatch(logout());
      Cookies.remove("refresh_token");
    }
  };
  return refresh;
};

export default useRefreshToken;
