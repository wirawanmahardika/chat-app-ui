import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { MyAxios } from "../helper/axios-instances";
import useGetUser from "../hooks/useGetUser";

export default function Profile() {
  const navigate = useNavigate();
  const user = useGetUser();

  const logoutAction = (e: any) => {
    e.preventDefault();
    MyAxios.delete("/api/v1/user").then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="font-roboto bg-zinc-900 min-h-screen text-stone-300 p-5 flex flex-col gap-y-3">
      <img
        src={user.photo_profile}
        alt="photo-profile"
        className="rounded-full size-52 mx-auto"
      />
      <span className="font-bold text-3xl mx-auto">{user.fullname}</span>
      <span className=" mx-auto">ID : {user.id}</span>

      <ul className="mx-auto mt-5 text-lg">
        <li>Email : {user.email}</li>
        <li>Name : {user.fullname}</li>
        <li>Username : {user.username}</li>
      </ul>

      <button
        onClick={logoutAction}
        type="button"
        className="rounded px-4 py-2 bg-red-500 w-fit mx-auto mt-5"
      >
        Logout
      </button>
      <Nav />
    </div>
  );
}
