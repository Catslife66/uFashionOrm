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

  return (
    <button
      onClick={handleClick}
      className="w-full text-start px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
    >
      Sign out
    </button>
  );
};

export default LogoutPage;
