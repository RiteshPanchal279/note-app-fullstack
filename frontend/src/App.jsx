import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Login from "./auth/Login";
import Signp from "./auth/Signp";

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Home/>
  },
  {
    path:"/user/login",
    element:<Login/>
  },
  {
    path:"/user/register",
    element:<Signp/>
  },
  // {
  //   path:"/note/addnote",
  //   element:<Home/>
  // },
  // {
  //   path:"/note/getnote",
  //   element:<Home/>
  // },
  // {
  //   path:"/note/update/:id",
  //   element:<Home/>
  // },
  // {
  //   path:"/note/delete/:id",
  //   element:<Home/>
  // },

])

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
