import { Link, useLoaderData, useLocation } from "react-router-dom";
import Nav from "../components/Nav";
import { MyAxios } from "../helper/axios-instances";
import useGetUser from "../hooks/useGetUser";
import { useEffect, useReducer } from "react";
import dayjs from "dayjs";
import { homeReducer } from "../reducers/home-reducer";
import lodash from "lodash";

export function Component() {
  useGetUser(); // user authentication, will direct to login page if not authenticated
  const initialData = useLoaderData() as [];
  const location = useLocation();
  const { state } = location
  const [chatLists, dispatch] = useReducer(homeReducer, initialData);

  const REFRESH_INTERVAL = 1000 * 60 * 10; // 10 menit (dalam milidetik)

  useEffect(() => {
    const refreshPage = () => { window.location.reload() };
    const intervalId = setInterval(refreshPage, REFRESH_INTERVAL);
    return () => clearInterval(intervalId);
  }, [location]);


  useEffect(() => {
    if (state?.interval) clearInterval(state.interval);

    const sse = new EventSource(import.meta.env.VITE_SSE_URL, { withCredentials: true });

    const messageListener = (e: MessageEvent<any>) => {
      const data = JSON.parse(e.data);

      const result = lodash.isEqual(data, chatLists);
      if (chatLists.length === 0 || !result) {
        dispatch({ type: "add", payload: data });
        return;
      }
    };

    const errorListener = () => console.log("Something went wrong");
    const openListener = () => console.log("Connected to the server");
    sse.addEventListener("open", openListener);
    sse.addEventListener("message", messageListener);
    sse.addEventListener("error", errorListener);

    return () => {
      sse.close();
      sse.removeEventListener("open", openListener);
      sse.removeEventListener("message", messageListener);
      sse.removeEventListener("error", errorListener);
    };
  }, [chatLists]);

  return (
    <div className="font-roboto bg-zinc-900 min-h-screen text-stone-300">
      {chatLists.map((cl: any) => {
        return <ChatList key={cl.id} userData={cl} />;
      })}
      <Nav />
    </div>
  );
}

function ChatList({
  userData,
}: {
  userData: {
    email: string;
    fullname: string;
    id: string;
    id_friendship: string;
    photo_profile: string;
    username: string;
    message?: string;
    from?: string; // FROM means the one who send the message
    created_at?: Date;
  };
}) {
  return (
    <Link
      to={"/chat/" + userData.id}
      state={userData}
      className="border-black min-h-10 p-3 flex items-center gap-x-3 hover:bg-emerald-500"
    >
      <img
        src={
          userData.photo_profile ? userData.photo_profile : "/img/hacker-1.jpg"
        }
        alt="fp-john-doe"
        className="rounded-full size-14"
      />
      <div className="flex flex-col gap-y-1 overflow-hidden w-full">
        <div className="flex justify-between items-center ">
          <span className="font-bold text-xl truncate capitalize">
            {userData.fullname}
          </span>
          <span className="text-emerald-500">
            {!userData.created_at
              ? ""
              : dayjs(userData.created_at).isAfter(dayjs().subtract(1, "day"))
                ? "Today"
                : dayjs(userData.created_at).isAfter(dayjs().subtract(2, "day"))
                  ? "Yesterday"
                  : dayjs(userData.created_at).format("DD/MM/YYYY")}
          </span>
        </div>
        <span
          className={`truncate ${!userData.message ? "italic text-red-300" : ""
            }`}
        >
          <span className="capitalize">
            {!userData.from
              ? ""
              : userData.from === userData.id
                ? userData.username + " : "
                : "you : "}
          </span>
          {!userData.message ? "No Messages Were Sent" : userData.message}
        </span>
      </div>
    </Link>
  );
}

export const loader = async () => {
  try {
    const res = await MyAxios.get("/api/v1/friend/get-all");
    return res.data;
  } catch (error) {
    return [];
  }
};
