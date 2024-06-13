import cookie from "js-cookie";
import { useRouter } from "next/navigation";

const LogoutPage = () => {
  const token = cookie.get("token");
  const router = useRouter();

  const handleClick = () => {
    if (token) {
      cookie.remove("token");
      router.push("/login");
    } else {
      console.log("Something went wrong.");
    }
  };

  return <button onClick={handleClick}>Sign out</button>;
};

export default LogoutPage;
