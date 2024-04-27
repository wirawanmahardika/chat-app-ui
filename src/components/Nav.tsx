import { NavLink } from "react-router-dom";
import AddUser from "../icons/AddUser";
import Chat from "../icons/Chat";
import Profile from "../icons/Profile";

export default function Nav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 min-h-10 bg-emerald-600 flex gap-2 justify-evenly items-center py-3">
      <NavLink to={"/"}>
        <Chat fillSvg={false} size="size-8" />
      </NavLink>
      <NavLink to={"/add-friend"}>
        <AddUser size="size-8" />
      </NavLink>
      <NavLink to={"/profile"}>
        <Profile size="size-8" />
      </NavLink>
    </div>
  );
}
