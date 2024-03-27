import { useState } from "react";
import { useAppSelector } from "../app/hooks";
import { jwtDecode } from "jwt-decode";
import api from "../services/api";

async function useUserInfo() {
  const [userInfo, setUserInfo] = useState();
  const { token } = useAppSelector((state) => state.auth);

  const decoded:
    | { exp: number; iat: number; sub: string; username: string }
    | undefined = token ? jwtDecode(token) : undefined;

  const getUserInfo = async () => {
    try {
      const { data } = await api.get(`/info?id=${decoded?.sub}`);
      setUserInfo(data);
    } catch (err) {
      console.log(err);
      return;
    }
  };
  await getUserInfo();
  return { userInfo };
}

export default useUserInfo;
