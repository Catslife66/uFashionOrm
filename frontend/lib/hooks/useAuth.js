import { useAppDispatch, useAppSelector } from "lib/hooks";
import { useEffect, useState } from "react";
import cookie from "js-cookie";
import { useRouter } from "next/navigation";
import { fetchUserLoginStatus } from "lib/features/user/userSlice";

const useAuth = () => {
  const token = cookie.get("token");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const userStatus = useAppSelector((state) => state.user.status);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (token) {
      if (userStatus === "idle") {
        dispatch(fetchUserLoginStatus(token));
      } else if (userStatus === "succeeded") {
        setIsAuthenticated(true);
      } else if (userStatus === "failed") {
        setIsAuthenticated(false);
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [token, userStatus, dispatch, router]);

  return isAuthenticated;
};

export default useAuth;
