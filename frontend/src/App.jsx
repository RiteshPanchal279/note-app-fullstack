import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./auth/Login";
import Signp from "./auth/Signp";
import { Toaster } from "sonner";

const ProtectedRoute = ({ element }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user ? element : <Navigate to="/user/login" replace />;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={<Home />} />,
  },
  {
    path: "/user/login",
    element: <Login />,
  },
  {
    path: "/user/register",
    element: <Signp />,
  },
]);

function App() {
  return (
    <>
      <Toaster richColors position="top-right" />
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;
