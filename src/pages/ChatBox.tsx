import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import useGetUser from "../hooks/useGetUser";
import Out from "../icons/Out";
import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { chatReducer, chatState } from "../reducers/chat-reducer";
import { MyAxios } from "../helper/axios-instances";
import dayjs from "dayjs";

export function Component() {
  const user = useGetUser(); // user authentication, will direct to login page if not authenticated
  const { state } = useLocation();
  const navigate = useNavigate();
  const chatLoaderData = useLoaderData() as chatState;
  const [messages, dispatch] = useReducer(chatReducer, chatLoaderData);
  const scrollToBottom: any = useRef();
  const [friendStatus, setFriendStatus] = useState(false);

  useEffect(() => {
    MyAxios.get("/api/v1/chats/" + state?.id_friendship)
      .then((res) => {
        console.log(res.data);

        dispatch({ type: "add-all", payload: res.data });
        scrollToBottom?.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      })
      .catch(() => {
        navigate("/");
      });
  }, []);

  useEffect(() => {
    MyAxios.get("/api/v1/friend/status/" + state.id)
      .then((res) => setFriendStatus(res.data))
      .catch(() => navigate("/"));
  }, []);

  const wsInstance = () => new WebSocket(import.meta.env.VITE_WEB_SOCKET_URL);
  const socket = useMemo(wsInstance, []);
  useEffect(() => {
    if (!state || !state?.id_friendship) {
      navigate("/");
      return;
    }

    const openListener = () => {
      socket.send(
        JSON.stringify({
          type: "subscribe",
          data: { channel: state?.id_friendship, id_friend: state.id },
        })
      );
    };
    socket.addEventListener("open", openListener);

    const messageListener = (e: any) => {
      const ws = JSON.parse(e.data);

      switch (ws.type) {
        case "chat":
          dispatch({
            type: "add",
            payload: [
              {
                message: ws.data.message,
                to: user.username,
                created_at: dayjs().toString(),
                from: state.id,
                // photo: ws.data.photo,
              },
            ],
          });
          break;
        case "chat_with_photo":
          break;
        case "join":
          setFriendStatus(ws.status);
          break;
        case "leave":
          setFriendStatus(ws.status_friend);
          break;
        default:
          break;
      }
    };
    socket.addEventListener("message", messageListener);

    return () => {
      if (socket.readyState === socket.OPEN) {
        socket.send(
          JSON.stringify({
            type: "leave",
            data: { channel: state?.id_friendship },
          })
        );
      }
      socket.removeEventListener("open", openListener);
      socket.removeEventListener("message", messageListener);
    };
  }, []);

  const messageFormAction = async (e: any) => {
    e.preventDefault();

    socket.send(
      JSON.stringify({
        type: "chat",
        data: {
          channel: state?.id_friendship,
          message: e.target.message.value,
          to: state.id,
        },
      })
    );

    dispatch({
      type: "add",
      payload: [
        {
          message: e.target.message.value,
          to: state.id,
          created_at: dayjs().toString(),
          from: user.username,
        },
      ],
    });

    e.target.message.value = "";
  };

  return (
    <div
      ref={scrollToBottom}
      className="font-roboto bg-zinc-900 min-h-screen text-stone-300 pb-16"
    >
      <div className="sticky z-[100] top-0 left-0 right-0 min-h-10 bg-zinc-950 p-3 flex items-center gap-x-4">
        <img
          src={state?.photo_profile}
          alt="fp-john-doe"
          className="rounded-full size-14"
        />

        <div className="flex flex-col gap-y-2">
          <span className="font-bold text-xl capitalize">
            {state?.username}
          </span>
          <span className="">{friendStatus ? "Online" : "Offline"}</span>
        </div>

        <div
          className="rotate-180 ml-auto hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Out size="size-8" />
        </div>
      </div>

      {messages &&
        messages.map((m, i) => {
          if (m.from === state.id) {
            return (
              <FriendChat
                key={i}
                message={m.message}
                time={dayjs(m.created_at).format("H:mm")}
              />
            );
          } else {
            return (
              <SelfChat
                key={i}
                message={m.message}
                time={dayjs(m.created_at).format("H:mm")}
              />
            );
          }
        })}

      <form
        onSubmit={messageFormAction}
        className="fixed bottom-0 left-0 right-0 bg-zinc-950 "
      >
        <div className="min-h-10 flex gap-2 justify-evenly items-center py-3 px-2">
          <input
            type="text"
            name="message"
            className="w-3/4 rounded py-1 px-2 outline-none border-2 bg-zinc-600 border-zinc-500 text-zinc-950 focus-within:text-white focus-within:border-emerald-500 focus-within:bg-zinc-950 "
            placeholder="Type your message here..."
          />

          <button className="bg-emerald-600 px-2 py-1 rounded">Send</button>
        </div>
      </form>
    </div>
  );
}

function FriendChat({ message, time }: { message: string; time: string }) {
  return (
    <div className="p-2 bg-zinc-950 w-4/5 rounded my-3 flex pb-5 relative ml-2 flex-col gap-y-2 lg:w-1/2">
      <span>{message}</span>
      <span className="absolute bottom-0 right-1">{time}</span>
    </div>
  );
}

function SelfChat({ message, time }: { message: string; time: string }) {
  return (
    <div className="p-2 w-4/5 rounded my-3 flex flex-col pb-5 relative ml-auto mr-2 bg-emerald-600 lg:w-1/2 gap-y-2">
      <span className="break-words">{message}</span>
      <span className="absolute bottom-0 right-1">{time}</span>
    </div>
  );
}
