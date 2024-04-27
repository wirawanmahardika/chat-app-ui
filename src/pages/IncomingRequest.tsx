import { Link, useLoaderData } from "react-router-dom";
import Nav from "../components/Nav";
import { MyAxios } from "../helper/axios-instances";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useReducer } from "react";
import {
  actionRequestState,
  incomingRequestReducer,
} from "../reducers/incoming-request-reducer";
import useGetUser from "../hooks/useGetUser";

export default function IncomingRequest() {
  useGetUser(); // user authentication, will direct to login page if not authenticated
  const requests = useLoaderData() as {
    id_friendship: string;
    photo_profile: string;
    fullname: string;
    created_at: Date;
    status: string;
  }[];

  const [requestsWithReducer, dispatch] = useReducer(
    incomingRequestReducer,
    requests
  );

  const displayRequests = requestsWithReducer.map((r: any) => {
    return (
      <Request
        key={r.id_friendship}
        id_friendship={r.id_friendship}
        src={r.photo_profile}
        name={r.fullname}
        dispatch={dispatch}
      />
    );
  });

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

      {displayRequests}

      <Nav />

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

function Request({
  src,
  name,
  id_friendship,
  dispatch,
}: {
  src?: string;
  name: string;
  id_friendship: string;
  dispatch: React.Dispatch<actionRequestState>;
}) {
  const acceptAction = async () => {
    const res = await MyAxios.patch("/api/v1/friend/response-to-request", {
      id_friendship,
      status: "friend",
    });

    dispatch({ type: "delete", payload: { id_friendship: id_friendship } });
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
  };

  const rejectAction = async () => {
    const res = await MyAxios.patch("/api/v1/friend/response-to-request", {
      id_friendship,
      rejection: true,
    });

    dispatch({ type: "delete", payload: { id_friendship: id_friendship } });

    toast.error(res.data, {
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
  };

  return (
    <div className=" min-h-10 p-3 flex items-center gap-x-3 border-b-2 border-white">
      <img
        src={src ? src : "/img/hacker-1.jpg"}
        alt="fp-john-doe"
        className="rounded-full size-14"
      />
      <div className="flex flex-col gap-y-1 justify-center items-center w-full">
        <span className="font-bold text-xl text-center  capitalize">
          {name}
        </span>

        <div className="flex gap-x-5">
          <button
            onClick={acceptAction}
            className="px-2 py-0.5 rounded bg-green-600"
          >
            Accept
          </button>
          <button
            onClick={rejectAction}
            className="px-2 py-0.5 rounded bg-red-600"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export const incomingRequestLoader = async () => {
  try {
    const res = await MyAxios.get("/api/v1/friend/relationship-requests");
    return res.data;
  } catch (error) {
    return [];
  }
};
