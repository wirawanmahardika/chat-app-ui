import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Home, { homeLoader } from "./pages/Home";
import Login from "./pages/Login";
import ChatBox from "./pages/ChatBox";
import AddFriend from "./pages/AddFriend";
import IncomingRequest, {
  incomingRequestLoader,
} from "./pages/IncomingRequest";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />} loader={homeLoader} />
      <Route path="/chat/:id_friend" element={<ChatBox />} />
      <Route path="/add-friend" element={<AddFriend />} />
      <Route
        path="/incoming-request"
        element={<IncomingRequest />}
        loader={incomingRequestLoader}
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
