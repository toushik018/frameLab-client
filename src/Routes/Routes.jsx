import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Home/Home/Home";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import Dashboard from "../Layout/Dashboard/Dashboard";
import AddClass from "../Pages/AddClass/AddClass";
import MyClasses from "../Pages/MyClasses/MyClasses";
import PrivateRoute from "./PrivateRoute";
import SelectedClasses from "../Pages/Dashboard/SelectedClasses/SelectedClasses";
import ManageUsers from "../Pages/Dashboard/ManageUsers/ManageUsers";
import AdminRoute from "./AdminRoute";
import ManageClasses from "../Pages/Dashboard/ManageClasses/ManageClasses";
import Payment from "../Pages/Dashboard/Payment/Payment";
import Feedback from "../Pages/FeedBack/Feedback";
import AllInstructors from "../Home/Home/AllInstructors/AllInstructors";
import NotFound from "../Pages/NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/register',
        element: <Registration></Registration>
      },
      {
        path: '/login',
        element: <Login></Login>
      },

      {
        path: '/instructors',
        element: <AllInstructors></AllInstructors>
      }
    ]
  },

  {
    path: "dashboard",
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [
      {
        path: 'addClass',
        element: <AddClass></AddClass>
      },
      {
        path: 'myClasses',
        element: <MyClasses></MyClasses>
      },
      {
        path: 'selectedClasses',
        element: <SelectedClasses></SelectedClasses>
      },
      {
        path: 'payment/:id',
        element: <Payment></Payment>,
        loader: ({ params }) => fetch(`http://localhost:5000/payment/${params.id}`)
      },
      {
        path: 'manageUsers',
        element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
      },
      {
        path: 'manageClasses',
        element: <AdminRoute><ManageClasses></ManageClasses> </AdminRoute>
      },
      {
        path: 'feedback/:id',
        element: <Feedback></Feedback>
      }
    ]
  }
]);

export default router;