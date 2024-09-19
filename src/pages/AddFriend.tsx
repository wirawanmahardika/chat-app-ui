import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import { MyAxios } from "../helper/axios-instances";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetUser from "../hooks/useGetUser";

export function Component() {
  useGetUser(); // user authentication, will direct to login page if not authenticated
  const formSumbmitHandle = async (e: any) => {
    e.preventDefault();

    try {
      const res = await MyAxios.post("/api/v1/friend", {
        id_friend: e.target.id_friend.value,
      });

      toast.success(res.data, {
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
      toast.error(error?.response?.data, {
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
    e.target.id_friend.value = "";
  };

  return (
    <div className="bg-zinc-900 min-h-screen text-slate-200 flex flex-col">
      <div className="w-full bg-emerald-500 flex justify-evenly">
        <Link
          to={"/add-friend"}
          className="w-1/2 hover:bg-emerald-700 p-3 text-center"
        >
          Add Friend
        </Link>
        <Link
          to={"/incoming-request"}
          className="w-1/2 hover:bg-emerald-700 p-3 text-center"
        >
          Incoming Request
        </Link>
      </div>
      <form
        onSubmit={formSumbmitHandle}
        className="w-full m-auto flex flex-col gap-y-6 items-center justify-center "
      >
        <label htmlFor="id-user" className="font-bold text-3xl">
          Friend's ID
        </label>
        <input
          type="text"
          name="id_friend"
          className="w-4/5 rounded py-1 px-2 outline-none border-2 bg-zinc-600 border-zinc-500 text-zinc-950 focus-within:text-white focus-within:border-emerald-500 focus-within:bg-zinc-950 "
          placeholder="Type Your Friend's ID"
        />
        <button className="px-3 py-1 bg-emerald-500 rounded">
          Send Friendship Request
        </button>
      </form>
      <Nav />

      <ToastContainer />
    </div>
  );
}
