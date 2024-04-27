import Chat from "../icons/Chat";
import { MyAxios } from "../helper/axios-instances";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const loginSubmitHandle = async (e: any) => {
    e.preventDefault();
    const data = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    const toastId = toast.loading("Memproses permintaan...");
    try {
      const res = await MyAxios.post("/api/v1/users/login", data);
      toast.update(toastId, {
        type: "success",
        isLoading: false,
        render: res.data + ", redirect ke homepage",
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });

      const redirectID = setInterval(() => {
        navigate("/", { state: { interval: redirectID } });
      }, 2000);
    } catch (error: any) {
      toast.update(toastId, {
        type: "error",
        isLoading: false,
        render: error.response ? error.response.data : "something went wrong",
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="bg-slate-950 font-quicksand text-slate-100 w-screen h-screen gap-y-4 flex flex-col items-center justify-center">
      <div className="flex items-center gap-x-5">
        <Chat fillSvg={true} />
        <h2 className="font-bold text-xl md:text-2xl lg:text-xl">ChitChatAn</h2>
      </div>
      <h2 className="font-bold text-4xl md:text-5xl lg:text-3xl">Login</h2>
      <form
        onSubmit={loginSubmitHandle}
        className="w-full flex flex-col gap-y-8 md:w-3/5"
      >
        <div className="flex flex-col gap-y-2 w-4/5 mx-auto">
          <label
            className="font-bold text-lg md:text-2xl lg:text-lg"
            htmlFor="username"
          >
            Username
          </label>
          <input
            name="username"
            type="text"
            required
            autoComplete="off"
            className="outline-none px-2 py-1 bg-slate-300 font-semibold rounded border-2 border-emerald-500 text-black lg:font-normal font-roboto focus-within:border-emerald-700 md:py-0.5 md:px-1 lg:focus-within:border-red-500"
          />
        </div>
        <div className="flex flex-col gap-y-2 w-4/5 mx-auto">
          <label
            className="font-bold text-lg md:text-2xl lg:text-lg"
            htmlFor="password"
          >
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            autoComplete="off"
            className="outline-none px-2 py-1 bg-slate-300 font-semibold rounded border-2 border-emerald-500 text-black lg:font-normal font-roboto focus-within:border-emerald-700 md:py-0.5 md:px-1 lg:focus-within:border-red-500"
          />
        </div>

        <button
          type="submit"
          className="mx-auto px-4 py-1 rounded bg-emerald-500 md:py-2 md:text-xl lg:py-0.5 "
        >
          Login
        </button>

        <span className="text-center">
          Belum memiliki akun?{" "}
          <NavLink className={"text-emerald-500"} to={"/signup"}>
            Signup
          </NavLink>
        </span>
      </form>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
}
