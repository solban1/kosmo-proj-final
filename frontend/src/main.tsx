import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./components/App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
//import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./components/MainPage.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import OmokBoard from "./components/OmokBoard.tsx";
import ButtonFriend from "./components/ButtonFriend.tsx";
import Clock from "./components/Clock.jsx";
import PinLayout from "./components/PinLayout.tsx";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "index",
      element: <MainPage />,
    },
    {
      path: "omok",
      element: <OmokBoard />,
    },
    {
      path: "clock",
      element: <Clock />,
    },
    {
      path: "button",
      element: <ButtonFriend />,
    },
    {
      path: "pin",
      element: <PinLayout />,
    },
  ],
  { basename: "/" },
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
