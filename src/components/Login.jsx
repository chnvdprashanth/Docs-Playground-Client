import { GoogleLogin } from "@react-oauth/google";
import { createOrGetUser } from "../utils/client";
import { useNavigate } from "react-router-dom";
import { useGetUser } from "../contexts/User";
import webLogo from "../assets/webLogoWithText.webp"

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useGetUser();

  const responseGoogele = async (response) => {
    try {
      const userInfo = createOrGetUser(response);

      const res = await fetch("https://docs-playground.onrender.com/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const user = await res.json();
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center bg-zinc-800">
      <div className="flex flex-col items-center gap-y-8 bg-zinc-900 p-16 max-sm:p-8 rounded-3xl shadow-xl ">
        <div className="w-80 max-sm:w-64">
          <img src={webLogo} alt="website" />
        </div>
        <div className="">
        <GoogleLogin
          type="standard"
          theme="filled_black"
          shape="circle"
          size="large"
          onSuccess={responseGoogele}
          onError={responseGoogele}
          cookiePolicy="single_host_origin"
        />
        </div>
      </div>
    </div>
  );
};

export default Login;
