import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import Header from "./componentss/Header";
import Body from "./componentss/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import About from "./componentss/About";
import Contact from "./componentss/Contact";
import Error from "./componentss/Error";
import RestaurantMenu from "./componentss/RestaurantMenu";
import Footer from "./componentss/Footer";
// import Grocery from "./componentss/Grocery";
const Grocery = lazy(() => import("./componentss/Grocery"));

/**
 *
 * Header
 *  - Logo
 *  - NavItems
 * Body
 *  - Search
 *  - RestaurantContainer
 *    - RestaurantCard (Img, Name, Star rating, cuisine, Deleverytime)
 * Footer
 *  - Copyright
 *  - Links
 *  - Address
 *  - Contact
 */

const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading...</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
