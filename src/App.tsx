import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" lazy={() => import("./pages/Home")} />
      <Route path="/chat/:id_friend" lazy={() => import("./pages/ChatBox")} />
      <Route path="/add-friend" lazy={() => import('./pages/AddFriend')} />
      <Route path="/incoming-request" lazy={() => import("./pages/IncomingRequest")} />
      <Route path="/profile" lazy={() => import("./pages/Profile")} />
      <Route path="/login" lazy={() => import("./pages/Login")} />
      <Route path="/signup" lazy={() => import("./pages/Signup")} />
    </>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
