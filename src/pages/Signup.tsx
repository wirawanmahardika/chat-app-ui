import { Bounce, ToastContainer, toast } from "react-toastify";
import { MyAxios } from "../helper/axios-instances";
import Chat from "../icons/Chat";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";

export function Component() {
  const submitHandle = async (e: any) => {
    e.preventDefault();
    const idToast = toast.loading("Memproses permintaan...");

    const file = document.getElementById("photo_profile") as any;
    const formData = new FormData();
    formData.append("username", e.target.username.value);
    formData.append("password", e.target.password.value);
    formData.append("email", e.target.email.value);
    formData.append("fullname", e.target.fullname.value);
    formData.append("photo_profile", file.files[0]);

    try {
      const res = await MyAxios.post("/api/v1/users/signup", formData);
      toast.update(idToast, {
        render: res.data,
        type: "success",
        isLoading: false,
        ///////////////////////
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
    } catch (error: any) {
      if (error.response) {
        toast.update(idToast, {
          render: error.response.data,
          type: "error",
          isLoading: false,
          ///////////////////////
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
    }
  };

  return (
    <div className="bg-slate-950 py-6 font-quicksand text-slate-100 w-full min-h-screen gap-y-4 flex flex-col items-center justify-center">
      <div className="flex items-center gap-x-5">
        <Chat fillSvg={true} />
        <h2 className="font-bold text-xl md:text-2xl lg:text-xl">ChitChatAn</h2>
      </div>

      <h2 className="font-bold text-4xl md:text-5xl lg:text-3xl">Signup</h2>

      <form
        onSubmit={submitHandle}
        className="w-full flex flex-col gap-y-8 md:w-3/5"
      >
        <div className="flex flex-col gap-y-2 w-4/5 mx-auto">
          <label
            className="font-bold text-lg md:text-2xl lg:text-lg"
            htmlFor="fullname"
          >
            Fullname
          </label>
          <input
            required
            name="fullname"
            id="fullname"
            type="text"
            className="outline-none px-2 py-1 bg-slate-300 font-semibold rounded border-2 border-emerald-500 text-black lg:font-normal font-roboto focus-within:border-emerald-700 md:py-0.5 md:px-1 lg:focus-within:border-red-500"
          />
        </div>

        <div className="flex flex-col gap-y-2 w-4/5 mx-auto">
          <label
            className="font-bold text-lg md:text-2xl lg:text-lg"
            htmlFor="email"
          >
            Email
          </label>
          <input
            required
            type="email"
            name="email"
            id="email"
            className="outline-none px-2 py-1 bg-slate-300 font-semibold rounded border-2 border-emerald-500 text-black lg:font-normal font-roboto focus-within:border-emerald-700 md:py-0.5 md:px-1 lg:focus-within:border-red-500"
          />
        </div>

        <div className="flex flex-col gap-y-2 w-4/5 mx-auto">
          <label
            className="font-bold text-lg md:text-2xl lg:text-lg"
            htmlFor="photo_profile"
          >
            Photo Profile
          </label>
          <input
            required
            id="photo_profile"
            type="file"
            name="photo_profile"
            className="outline-none px-2 py-1 bg-slate-300 font-semibold rounded border-2 border-emerald-500 text-black lg:font-normal font-roboto focus-within:border-emerald-700 md:py-0.5 md:px-1 lg:focus-within:border-red-500"
          />
        </div>

        <div className="flex flex-col gap-y-2 w-4/5 mx-auto">
          <label
            className="font-bold text-lg md:text-2xl lg:text-lg"
            htmlFor="username"
          >
            Username
          </label>
          <input
            required
            type="text"
            name="username"
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
            required
            name="password"
            type="password"
            className="outline-none px-2 py-1 bg-slate-300 font-semibold rounded border-2 border-emerald-500 text-black lg:font-normal font-roboto focus-within:border-emerald-700 md:py-0.5 md:px-1 lg:focus-within:border-red-500"
          />
        </div>

        <button
          type="submit"
          className="mx-auto px-4 py-1 rounded bg-emerald-500 md:py-2 md:text-xl lg:py-0.5"
        >
          Signup
        </button>
      </form>

      <span className="text-center">
        Sudah memiliki akun?{" "}
        <NavLink className={"text-emerald-500"} to={"/login"}>
          Login
        </NavLink>
      </span>

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
