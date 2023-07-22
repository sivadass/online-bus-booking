import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./components/layouts/root";
import FlashScreen from "./components/loader";
import ProtectedRoute from "./components/layouts/protected";
import "./index.css";

const ErrorPage = lazy(() => import("./pages/error"));
const LoginPage = lazy(() => import("./pages/login"));
const IndexPage = lazy(() => import("./pages/index"));
const SchedulesPage = lazy(() => import("./pages/schedules"));
const BookingPage = lazy(() => import("./pages/booking"));
const BookingResultPage = lazy(() => import("./pages/booking-result"));

const ROUTES_WITHOUT_HEADER_FOOTER = ["/login"];

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root routesWithoutHeaderFooter={ROUTES_WITHOUT_HEADER_FOOTER} />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <IndexPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/schedules",
        element: (
          <ProtectedRoute>
            <SchedulesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/booking",
        element: (
          <ProtectedRoute>
            <BookingPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/booking-result",
        element: (
          <ProtectedRoute>
            <BookingResultPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <LoginPage hideHeader={true} />,
      },
    ],
  },
]);

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Suspense fallback={<FlashScreen />}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>
);
