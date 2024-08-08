import cookie from "js-cookie";
import { useRouter } from "next/navigation";

const SignoutButton = ({ role }) => {
  const token = cookie.get("token");
  const router = useRouter();

  const handleClick = () => {
    if (token) {
      cookie.remove("token");
      if (role === "user") {
        router.push("/login");
      } else if (role === "admin") {
        router.push("/admin/login");
      }
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

export default SignoutButton;
